export default {
	"tags": "github",
	"layout": "postlayout.vue",
	"sectionTitle": "GitHub",
	// Search result heading, since the README already includes the title
	"eleventyComputed": {
		"searchTitle": data => data.metadata?.name,
	},
	"permalink": data => `/github/${data.page.filePathStem.replace(/\/index$/, "").split("/").slice(2).join("/")}/`
}