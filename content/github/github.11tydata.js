export default {
	"tags": "github",
	"layout": "postlayout.vue",
	"sectionTitle": "GitHub",
	"permalink": data => `/github/${data.page.filePathStem.replace(/\/index$/, "").split("/").slice(2).join("/")}/`
}