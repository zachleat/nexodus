// Unique comments across every post in a cross-post group
export function getComments(posts) {
	let byId = new Map();
	for(let post of posts) {
		for(let comment of post.data.comments || []) {
			if(!byId.has(comment.id)) {
				byId.set(comment.id, comment);
			}
		}
	}
	return [...byId.values()];
}

// Native like, repost, and quote counts summed across a cross-post group
export function getCounts(posts) {
	let totals = { likes: 0, reposts: 0, quotes: 0 };
	for(let post of posts) {
		for(let key in totals) {
			totals[key] += post.data.counts?.[key] || 0;
		}
	}
	return totals;
}
