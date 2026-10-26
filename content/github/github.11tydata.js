export default {
	"tags": "github",
	"layout": "postlayout.svelte",
	"sectionTitle": "GitHub",
	// Search result heading, since the README already includes the title
	"eleventyComputed": {
		"searchTitle": data => data.metadata?.name,
	}
}