import { Importer } from "@11ty/import";

// Optional source types to import, e.g. `npm run import -- github npm`
const sources = process.argv.slice(2).filter(arg => !arg.startsWith("--"));

async function runImport(type, target, output) {
	if(sources.length && !sources.includes(type)) {
		return;
	}

	let importer = new Importer();
	importer.setOutputFolder(output);
	importer.setCacheDuration("4h");
	importer.setVerbose(true);
	importer.setSafeMode(!process.argv.includes("--overwrite"));
	importer.setDraftsFolder("drafts");
	importer.setAssetReferenceType("colocate");
	importer.setAvatarReferenceType("colocate");
	importer.setOverwriteAllow();
	importer.addSource(type, target);

	let entries = await importer.getEntries({
		contentType: "markdown",
		target: "fs",
	});
	await importer.toFiles(entries);
	importer.logResults();
}

await runImport("bluesky", "@zachleat.com", "content/bluesky");
await runImport("fediverse", "zachleat@fediverse.zachleat.com", "content/fediverse");
await runImport("github", "zachleat", "content/github");
// Subfolder avoids repo name collisions with zachleat/*
await runImport("github", "11ty", "content/github/11ty");
await runImport("npm", "zachleat", "content/npm");
await runImport("youtubeuser", "UCMlSs0Ltg57qpYdFwUVLR2A", "content/youtube");
await runImport("youtubeuser", "UCskGTioqrMBcw8pd14_334A", "content/youtube/11ty");
await runImport("letterboxd", "zachleat", "content/letterboxd");

if(process.env.CODEPEN_API_KEY) {
	await runImport("codepen", "zachleat", "content/codepen");
}
