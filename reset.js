import fs from "node:fs";
import path from "node:path";

// Remove imported entries, keeping each source folder’s data file
for(let source of fs.readdirSync("content", { withFileTypes: true })) {
	if(!source.isDirectory() || source.name.startsWith("_") || source.name.startsWith(".")) {
		continue;
	}

	let dir = path.join("content", source.name);
	for(let entry of fs.readdirSync(dir)) {
		if(entry !== `${source.name}.11tydata.js`) {
			fs.rmSync(path.join(dir, entry), { recursive: true, force: true });
		}
	}
}

fs.rmSync(".cache", { recursive: true, force: true });
fs.rmSync("_site", { recursive: true, force: true });

fs.writeFileSync("import.config.js", `export default [
	// { type: "bluesky", target: "@example.com", output: "content/bluesky" },
	// { type: "fediverse", target: "user@mastodon.social", output: "content/fediverse" },
	// { type: "github", target: "username", output: "content/github" },
	// { type: "npm", target: "username", output: "content/npm" },
	// { type: "youtubeuser", target: "UC_CHANNEL_ID", output: "content/youtube" },
	// { type: "letterboxd", target: "username", output: "content/letterboxd" },
	// { type: "atom", target: "https://example.com/feed.xml", output: "content/blog" },
	// { type: "hackernews", target: "https://example.com", output: "content/hackernews" },
];
`);
