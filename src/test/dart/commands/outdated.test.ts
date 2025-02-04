import { strict as assert } from "assert";
import * as vs from "vscode";
import { activate, captureOutput, getPackages } from "../../helpers";

describe("pub outdated", () => {
	before("get packages", () => getPackages());
	beforeEach("activate", () => activate());

	it("runs and prints output", async () => {
		const buffer = captureOutput("dart (hello_world)");
		const exitCode = await vs.commands.executeCommand("pub.outdated");
		assert.equal(exitCode, 0);

		const output = buffer.join("").trim();
		assert.equal(output.startsWith(`--\n\n[hello_world] dart pub outdated`), true);
		assert.equal(output.endsWith("exit code 0"), true);
	});
});
