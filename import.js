import { Importer } from "@11ty/import";

async function runImport(type, target, output) {
	let importer = new Importer();
	importer.setOutputFolder(output);
	importer.setCacheDuration("4h");
	importer.setVerbose(true);
	importer.setSafeMode(!process.argv.includes("--overwrite"));
	importer.setDraftsFolder("drafts");
	importer.setAssetsFolder("assets");
	importer.setAssetReferenceType("absolute");
	importer.setOverwriteAllow();
	importer.addSource(type, target);

	// I’ve imported the last 3 years
	let entries = await importer.getEntries({ contentType: "markdown", target: "fs", within: "90d" });
	await importer.toFiles(entries);
	importer.logResults();
}

await runImport("bluesky", "@zachleat.com", "content/bluesky");
await runImport("fediverse", "zachleat@fediverse.zachleat.com", "content/fediverse");
