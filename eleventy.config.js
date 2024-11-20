function cleanCustomEmoji(str) {
	return str.replaceAll(/\:[^:]*\:/g, "").trim();
}

function renderAuthors(authors) {
	return (authors || []).map(author => {
		return `<a href="${author.url}">${cleanCustomEmoji(author.name)}</a>`
	}).join(" ");
}

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");
	eleventyConfig.addFilter("renderAuthors", renderAuthors);
}

export const config = {
	dir: {
		input: "content"
	}
}