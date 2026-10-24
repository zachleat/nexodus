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
