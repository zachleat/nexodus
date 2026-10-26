// Colocated assets are relative to the post they were imported with
export function resolveAssetUrl(src, baseUrl) {
	if(!src || /^([a-z]+:|\/|#)/i.test(src)) {
		return src;
	}
	return baseUrl + src;
}

// Unique comments across every post in a cross-post group
export function getComments(posts) {
	let byId = new Map();
	for(let post of posts) {
		for(let comment of post.data.comments || []) {
			if(!byId.has(comment.id)) {
				let avatarUrl = resolveAssetUrl(comment.author?.avatarUrl, post.url);
				byId.set(comment.id, avatarUrl === comment.author?.avatarUrl ? comment : { ...comment, author: { ...comment.author, avatarUrl } });
			}
		}
	}
	return [...byId.values()];
}

// Native like, repost, quote, star, fork, view, issue, and pull request counts summed across a cross-post group
export function getCounts(posts) {
	let totals = { likes: 0, reposts: 0, quotes: 0, stars: 0, forks: 0, views: 0, issues: 0, pullRequests: 0, points: 0, comments: 0 };
	for(let post of posts) {
		for(let key in totals) {
			totals[key] += post.data.counts?.[key] || 0;
		}
	}
	return totals;
}
