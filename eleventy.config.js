import path from "node:path";
import * as pagefind from "pagefind";
import { HtmlBasePlugin } from "@11ty/eleventy";
import eleventyVue from "@11ty/eleventy-plugin-vue";

function cleanCustomEmoji(str) {
	return str.replaceAll(/\:[^:]*\:/g, "").trim();
}

function renderAuthors(authors) {
	return (authors || []).map(author => {
		return `<a href="${author.url}">${cleanCustomEmoji(author.name)}</a>`
	}).join(" ");
}

const CROSSPOST_WINDOW = 24 * 60 * 60 * 1000;

// Post text without links, URLs, markup, or punctuation
function getCrosspostKey(rawInput = "") {
	return rawInput
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
		.replace(/\[([^\]]*)\]\([^)]*\)/g, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/\\(.)/g, "$1")
		.replace(/https?:\/\/\S+/g, " ")
		.replace(/\S+\.\S+\/\S*/g, " ")
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, "");
}

// Groups the same text posted to different networks within a day, newest first
function getPostGroups(items) {
	let groups = [];
	let byKey = new Map();
	for(let item of [...items].sort((a, b) => a.date - b.date)) {
		let key = getCrosspostKey(item.page.rawInput);
		let group = key.length >= 20 && byKey.get(key);
		if(group && item.date - group.posts[0].date < CROSSPOST_WINDOW && !group.posts.some(p => p.data.metadata.type === item.data.metadata.type)) {
			group.posts.push(item);
		} else {
			group = { posts: [item] };
			groups.push(group);
			byKey.set(key, group);
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
	let groupsByUrl = new WeakMap();
	eleventyConfig.addFilter("getPostGroup", (groups, url) => {
		if(!groupsByUrl.has(groups)) {
			groupsByUrl.set(groups, new Map(groups.flatMap(group => group.posts.map(post => [post.url, group]))));
		}
		return groupsByUrl.get(groups).get(url);
	});

	eleventyConfig.ignores.add("README.md");
	eleventyConfig.addPlugin(eleventyVue);
	eleventyConfig.addPlugin(HtmlBasePlugin);
	// Vue templates can’t output a doctype
	eleventyConfig.addTransform("doctype", function(content) {
		if(this.page.outputPath?.endsWith(".html") && content.startsWith("<html")) {
			return `<!doctype html>\n${content}`;
		}
		return content;
	});
	eleventyConfig.setServerOptions({ port: 8347 });
	eleventyConfig.addFilter("renderAuthors", renderAuthors);
	eleventyConfig.addFilter("readableDate", date => date.toLocaleString("en-US", {
		dateStyle: "medium",
		timeStyle: "short",
		timeZone: "UTC",
	}) + " UTC");

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

	eleventyConfig.addPassthroughCopy({
		"content/*/assets/*": "assets/"
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