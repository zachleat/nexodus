export default {
	"tags": "letterboxd",
	"layout": "postlayout.svelte",
	"sectionTitle": "Letterboxd",
	"showTitle": true,
	"permalink": data => `/letterboxd/${data.page.filePathStem.replace(/\/index$/, "").split("/").slice(4).join("/")}/`
}