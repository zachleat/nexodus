export default [
	{ type: "bluesky", target: "@zachleat.com", output: "content/bluesky" },
	{ type: "bluesky", target: "@11ty.dev", output: "content/bluesky" },
	{ type: "fediverse", target: "zachleat@fediverse.zachleat.com", output: "content/fediverse" },
	{ type: "fediverse", target: "11ty@neighborhood.11ty.dev", output: "content/fediverse" },
	{ type: "github", target: "zachleat", output: "content/github" },
	// Subfolder avoids repo name collisions with zachleat/*
	{ type: "github", target: "11ty", output: "content/github/11ty" },
	{ type: "npm", target: "zachleat", output: "content/npm" },
	{ type: "youtubeuser", target: "UCMlSs0Ltg57qpYdFwUVLR2A", output: "content/youtube" },
	{ type: "youtubeuser", target: "UCskGTioqrMBcw8pd14_334A", output: "content/youtube/11ty" },
	{ type: "letterboxd", target: "zachleat", output: "content/letterboxd" },
	{ type: "atom", target: "https://www.zachleat.com/web/feed/", output: "content/blog" },
	{ type: "atom", target: "https://www.11ty.dev/blog/feed.xml", output: "content/blog/11ty" },
	{ type: "hackernews", target: "https://www.zachleat.com", output: "content/hackernews" },
	{ type: "hackernews", target: "https://www.11ty.dev", output: "content/hackernews/11ty" },
];
