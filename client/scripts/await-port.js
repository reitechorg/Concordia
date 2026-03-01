const port = 1420;

async function checkPort(port) {
	try {
		const response = await fetch(`http://localhost:${port}/`, {
			method: 'GET',
		});

		return response.ok;
	} catch (error) {
		return false;
	}
}

async function delay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
	do {
		console.log(`Waiting for server to start on port ${port}...`);
		const isPortOpen = await checkPort(port);
		if (isPortOpen) {
			console.log(`Server detected on port ${port}`);
			break;
		}
		await delay(2000);
	} while (true);

	process.exit(0);
}

main();
