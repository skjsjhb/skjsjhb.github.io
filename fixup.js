const fs = require("fs/promises");

async function main() {
	const files = await fs.readdir("_posts");
	await Promise.all(files.map(async (f) => {
		if (f.endsWith(".md")) {
			const content = (await fs.readFile("_posts/" + f)).toString();
			const lines = content.split("\n");
			const output = [];
			for (let l of lines) {
				if (/^> \{/i.test(l)) {
					l = l.substring(2);
				}
				output.push(l);
			}
			await fs.writeFile("_posts/" + f, output.join("\n"))
		}
	}))
}


main();

