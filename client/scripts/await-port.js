const port = 1420;
const delayMs = 1000;

async function checkPort(port) {
	try {
		const response = await fetch(`http://localhost:${port}/`, {
			signal: AbortSignal.timeout(3000),
		});

		return response.ok;
	} catch (error) {
		return false;
	}
}

async function delay(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
	do {
		console.log(`Waiting for server to start on port ${port}...`);
		const isPortOpen = await checkPort(port);
		if (isPortOpen) {
			console.log(`Server detected on port ${port}`);
			break;
		}
		await delay(delayMs);
	} while (true);

	process.exit(0);
}

main();
