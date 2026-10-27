export default {
	"tags": "github",
	"layout": "postlayout.svelte",
	"sectionTitle": "GitHub",
	"showTitle": true,
	"eleventyComputed": {
		// Repository name with owner
		"title": data => data.metadata?.name || data.title,
	}
}
