export default {
	"tags": "letterboxd",
	"layout": "postlayout.vue",
	"sectionTitle": "Letterboxd",
	"showTitle": true,
	"permalink": data => `/letterboxd/${data.page.filePathStem.replace(/\/index$/, "").split("/").slice(4).join("/")}/`
}