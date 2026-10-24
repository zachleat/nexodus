import { resolveAssetUrl } from "./_includes/replies.js";

export default {
	eleventyComputed: {
		metadata: {
			media: {
				featuredImage: data => resolveAssetUrl(data.metadata?.media?.featuredImage, data.page.url),
			},
		},
	},
};
