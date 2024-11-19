function cleanCustomEmoji(str) {
	return str.replaceAll(/\:[^:]*\:/g, "").trim();
}

function renderAuthors(authors) {
	return (authors || []).map(author => {
		return `<a href="${author.url}">${cleanCustomEmoji(author.name)}</a>`
	}).join(" ");
}

export default function(eleventyConfig) {
	eleventyConfig.ignores.add("README.md");
	eleventyConfig.addFilter("renderAuthors", renderAuthors);
}