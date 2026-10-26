import fs from "node:fs";
import path from "node:path";
import * as pagefind from "pagefind";
import { HtmlBasePlugin } from "@11ty/eleventy";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventySvelte from "@11ty/eleventy-plugin-svelte";
import fontAwesomePlugin from "@11ty/font-awesome";
import { getComments, getCounts, resolveAssetUrl } from "./content/_includes/replies.js";

function cleanCustomEmoji(str) {
	return str.replaceAll(/\:[^:]*\:/g, "").trim();
}

function renderAuthors(authors) {
	return (authors || []).map(author => {
		return `<a href="${author.url}">${cleanCustomEmoji(author.name)}</a>`
	}).join(" ");
}

const CROSSPOST_WINDOW = 24 * 60 * 60 * 1000;
// Share of words two posts need in common to count as a cross-post
const CROSSPOST_SIMILARITY = .8;
const CROSSPOST_MIN_WORDS = 5;
const SOURCE_PAGE_SIZE = 50;

// Post words without links, URLs, markup, or punctuation
function getCrosspostWords(rawInput = "") {
	return rawInput
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[([^\]]*)\]\([^)]*\)/g, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/\\(.)/g, "$1")
		.replace(/https?:\/\/\S+/g, " ")
		.replace(/\S+\.\S+\/\S*/g, " ")
		.toLowerCase()
		.split(/[^\p{L}\p{N}]+/u)
		.filter(Boolean);
}

// Dice coefficient of two word lists, counting repeated words
function getWordSimilarity(a, b) {
	let counts = new Map();
	for(let word of a) {
		counts.set(word, (counts.get(word) || 0) + 1);
	}
	let shared = 0;
	for(let word of b) {
		if(counts.get(word) > 0) {
			shared++;
			counts.set(word, counts.get(word) - 1);
		}
	}
	return 2 * shared / (a.length + b.length);
}

function isCrosspost(a, b) {
	if(a.key === b.key) {
		return a.key.length >= 20;
	}
	return Math.min(a.words.length, b.words.length) >= CROSSPOST_MIN_WORDS && getWordSimilarity(a.words, b.words) >= CROSSPOST_SIMILARITY;
}

// Groups the same (or nearly the same) text posted to different networks within a day, newest first
function getPostGroups(items) {
	let groups = [];
	let recent = [];
	for(let item of [...items].sort((a, b) => a.date - b.date)) {
		let words = getCrosspostWords(item.page.rawInput);
		let text = { words, key: words.join("") };
		recent = recent.filter(group => item.date - group.posts[0].date < CROSSPOST_WINDOW);
		let group = recent.find(group => !group.posts.some(p => p.data.metadata.type === item.data.metadata.type) && isCrosspost(group.text, text));
		if(group) {
			group.posts.push(item);
		} else {
			group = { posts: [item], text };
			groups.push(group);
			recent.push(group);
		}
	}
	for(let group of groups) {
		// Show the longest version (fediverse posts allow more text and images)
		group.primary = group.posts.reduce((a, b) => (b.page.rawInput?.length > a.page.rawInput?.length ? b : a));
		group.date = group.posts[0].date;
	}
	return groups.reverse();
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.addCollection("postGroups", collectionApi => getPostGroups(collectionApi.getAll().filter(item => item.data.metadata?.type)));
	// Pages of posts for each source, newest first
	eleventyConfig.addCollection("sourcePages", collectionApi => {
		let postsByType = Map.groupBy(collectionApi.getAll().filter(item => item.data.metadata?.type).sort((a, b) => b.date - a.date), item => item.data.metadata.type);
		let getUrl = (type, pageIndex) => pageIndex > 0 ? `/${type}/page/${pageIndex + 1}/` : `/${type}/`;
		return [...postsByType].flatMap(([type, posts]) => {
			let pageCount = Math.ceil(posts.length / SOURCE_PAGE_SIZE);
			return Array.from({ length: pageCount }, (_, pageIndex) => ({
				type,
				title: posts[0].data.sectionTitle,
				posts: posts.slice(pageIndex * SOURCE_PAGE_SIZE, (pageIndex + 1) * SOURCE_PAGE_SIZE),
				pageNumber: pageIndex + 1,
				pageCount,
				url: getUrl(type, pageIndex),
				previousUrl: pageIndex > 0 ? getUrl(type, pageIndex - 1) : undefined,
				nextUrl: pageIndex < pageCount - 1 ? getUrl(type, pageIndex + 1) : undefined,
			}));
		});
	});
	let groupsByUrl = new WeakMap();
	eleventyConfig.addFilter("getPostGroup", (groups, url) => {
		if(!groupsByUrl.has(groups)) {
			groupsByUrl.set(groups, new Map(groups.flatMap(group => group.posts.map(post => [post.url, group]))));
		}
		return groupsByUrl.get(groups).get(url);
	});
	// Site-wide totals across every post group, plus per-source totals
	let statsByGroups = new WeakMap();
	eleventyConfig.addFilter("getSiteStats", groups => {
		if(!statsByGroups.has(groups)) {
			let empty = () => ({ posts: 0, replies: 0, likes: 0, reposts: 0, quotes: 0, views: 0, issues: 0, pullRequests: 0 });
			let stats = { total: empty() };
			let add = (target, posts) => {
				target.replies += getComments(posts).length;
				for(let post of posts) {
					if(!target.oldest || post.date < target.oldest) {
						target.oldest = post.date;
					}
				}
				let counts = getCounts(posts);
				// GitHub stars and Hacker News points count as likes, forks as reposts, and Hacker News comments as replies
				let aliases = { stars: "likes", forks: "reposts", points: "likes", comments: "replies" };
				for(let key in counts) {
					target[aliases[key] || key] += counts[key];
				}
			};
			for(let group of groups) {
				stats.total.posts++;
				add(stats.total, group.posts);
				for(let post of group.posts) {
					let source = stats[post.data.metadata.type] ??= empty();
					source.posts++;
					if(post.data.metadata.type === "npm") {
						(source.packageNames ??= new Set()).add(post.data.metadata.name);
						source.packages = source.packageNames.size;
					}
					add(source, [post]);
				}
			}
			statsByGroups.set(groups, stats);
		}
		return statsByGroups.get(groups);
	});
	// Post groups per UTC year, including years without posts
	let activityByGroups = new WeakMap();
	eleventyConfig.addFilter("getActivity", groups => {
		if(!activityByGroups.has(groups)) {
			let counts = Map.groupBy(groups, group => group.date.getUTCFullYear());
			let first = Math.min(...counts.keys());
			let last = Math.max(...counts.keys());
			let years = Array.from({ length: last - first + 1 }, (_, index) => ({ year: first + index, count: counts.get(first + index)?.length || 0 }));
			activityByGroups.set(groups, { years, max: Math.max(...years.map(({ count }) => count)), total: groups.length });
		}
		return activityByGroups.get(groups);
	});
	// Groups with the most likes, reposts, quotes, and replies
	eleventyConfig.addFilter("getPopularGroups", (groups, limit) => {
		let score = group => {
			let { likes, reposts, quotes } = getCounts(group.posts);
			return likes + reposts + quotes + getComments(group.posts).length;
		};
		return groups.map(group => ({ group, score: score(group) })).sort((a, b) => b.score - a.score).slice(0, limit).map(({ group }) => group);
	});
	// Archived posts that are top-level comments on another archived post (e.g. self-reply threads)
	let parentsByUrl = new WeakMap();
	eleventyConfig.addFilter("getReplyParent", (items, url) => {
		if(!parentsByUrl.has(items)) {
			parentsByUrl.set(items, new Map(items.flatMap(item => (item.data.comments || []).filter(comment => !comment.parentId).map(comment => [comment.url, item]))));
		}
		return parentsByUrl.get(items).get(url);
	});
	// Post authors have no avatar, so use the one from their own replies
	let avatarsByUrl = new WeakMap();
	eleventyConfig.addFilter("getAvatarUrl", (items, url) => {
		if(!avatarsByUrl.has(items)) {
			avatarsByUrl.set(items, new Map(items.flatMap(item => (item.data.comments || []).filter(comment => comment.author?.avatarUrl).map(comment => [comment.author.url, resolveAssetUrl(comment.author.avatarUrl, item.url)]))));
		}
		return avatarsByUrl.get(items).get(url);
	});

	eleventyConfig.ignores.add("README.md");
	// Watching thousands of imported post files exhausts file handles (restart after `npm run import`)
	eleventyConfig.watchIgnores.add("content/*/*/**");
	eleventyConfig.addPlugin(eleventySvelte);
	eleventyConfig.addPlugin(fontAwesomePlugin);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	eleventyConfig.setServerOptions({ port: 8347 });
	eleventyConfig.addGlobalData("buildTime", () => new Date());
	eleventyConfig.addFilter("renderAuthors", renderAuthors);
	eleventyConfig.addFilter("readableDate", date => date.toLocaleString("en-US", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "UTC",
	}) + " UTC");
	eleventyConfig.addFilter("shortDate", date => date.toLocaleString("en-US", {
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	}));
	eleventyConfig.addFilter("friendlyDate", date => date.toLocaleString("en-US", {
		dateStyle: "long",
		timeZone: "UTC",
	}));
	// Reply time relative to the post, e.g. “5 min later”
	eleventyConfig.addFilter("timeAfter", (date, start) => {
		let minutes = Math.floor((date - start) / 60000);
		if(minutes < 1) {
			return "moments later";
		}
		if(minutes < 60) {
			return `${minutes} min later`;
		}
		let hours = Math.floor(minutes / 60);
		if(hours < 24) {
			return `${hours} hr later`;
		}
		let days = Math.floor(hours / 24);
		if(days < 30) {
			return `${days} ${days === 1 ? "day" : "days"} later`;
		}
		return date.toLocaleString("en-US", { dateStyle: "long", timeZone: "UTC" });
	});

	eleventyConfig.on("eleventy.after", async ({ directories }) => {
		let { index } = await pagefind.createIndex();
		await index.addDirectory({ path: directories.output });
		await index.writeFiles({ outputPath: path.join(directories.output, "pagefind") });
		await pagefind.close();
	});

	// Some fediverse imports store the post HTML as escaped Markdown text
	eleventyConfig.addPreprocessor("fediverse-html", "md", (data, content) => {
		if(data.metadata?.type !== "fediverse" || !content.trimStart().startsWith("\\<p>")) {
			return;
		}
		return content
			.replaceAll(/\\([!-\/:-@\[-`{-~])/g, "$1")
			// End the HTML block so trailing Markdown images still render
			.replaceAll(/(<\/p>)\s*(?=!\[)/g, "$1\n\n");
	});

	// Imported assets live next to each post’s index.md
	let colocatedAssets = new Map();
	let getColocatedAssets = inputPath => {
		let dir = path.dirname(inputPath);
		if(!colocatedAssets.has(dir)) {
			colocatedAssets.set(dir, fs.readdirSync(dir).filter(name => !/\.(md|json)$/.test(name) && !name.startsWith(".")));
		}
		return colocatedAssets.get(dir);
	};
	eleventyConfig.on("eleventy.beforeWatch", () => colocatedAssets.clear());

	// Post HTML is also shown on listing pages, so relative asset URLs need the post URL
	eleventyConfig.addFilter("resolveAssets", (html, post) => {
		let names = new Set(getColocatedAssets(post.inputPath));
		return html?.replace(/(\s(?:src|href|poster)=")([^"/:#]+)"/g, (match, attr, name) => names.has(name) ? `${attr}${resolveAssetUrl(name, post.url)}"` : match);
	});

	// Skip remote images (mostly reply avatars) so builds don’t fetch them
	eleventyConfig.htmlTransformer.addPosthtmlPlugin("html", () => tree => {
		tree.match({ tag: "img", attrs: { src: /^[a-z]+:/i } }, node => {
			node.attrs["eleventy:ignore"] = "";
			return node;
		});
		return tree;
	});
	eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
		formats: ["passthrough"],
		urlPath: "/img/",
	});

	eleventyConfig.on("eleventy.after", async ({ results }) => {
		for(let { inputPath, outputPath } of results) {
			if(path.basename(inputPath) !== "index.md" || !outputPath) {
				continue;
			}
			for(let name of getColocatedAssets(inputPath)) {
				await fs.promises.cp(path.join(path.dirname(inputPath), name), path.join(path.dirname(outputPath), name), { recursive: true });
			}
		}
	});

}

export const config = {
	// Set by the GitHub Pages workflow for project sites, e.g. /nexodus/
	pathPrefix: process.env.PATH_PREFIX || "/",
	// Imported posts may contain template syntax
	markdownTemplateEngine: false,
	dir: {
		input: "content"
	}
}