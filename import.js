import { Importer } from "@11ty/import";
import config from "./import.config.js";

// Optional source types to import, e.g. `npm run import -- github npm`
const sources = process.argv.slice(2).filter(arg => !arg.startsWith("--"));
// Only import recent entries, e.g. `npm run import -- --within=*` for everything
const within = process.argv.find(arg => arg.startsWith("--within="))?.slice("--within=".length) || "90d";

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
		within,
	});
	await importer.toFiles(entries);
	importer.logResults();
}

for(let { type, target, output } of config) {
	await runImport(type, target, output);
}
