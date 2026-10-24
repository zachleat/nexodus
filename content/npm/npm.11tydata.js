export default {
	"tags": "npm",
	"layout": "postlayout.vue",
	"sectionTitle": "npm",
	// Search result heading, since the README already includes the title
	"eleventyComputed": {
		"searchTitle": data => data.metadata?.name,
	},
	"permalink": data => `/npm/${data.page.filePathStem.replace(/\/index$/, "").split("/").slice(2).join("/")}/`
}