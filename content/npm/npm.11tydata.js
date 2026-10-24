export default {
	"tags": "npm",
	"layout": "postlayout.vue",
	"sectionTitle": "npm",
	"permalink": data => `/npm/${data.page.filePathStem.replace(/\/index$/, "").split("/").slice(2).join("/")}/`
}