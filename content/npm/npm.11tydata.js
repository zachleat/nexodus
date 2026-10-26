export default {
	"tags": "npm",
	"layout": "postlayout.svelte",
	"sectionTitle": "npm",
	"showTitle": true,
	"permalink": data => `/npm/${data.page.filePathStem.replace(/\/index$/, "").split("/").slice(2).join("/")}/`
}
