import dotenv from 'dotenv';
import setup from './modules/setup.js';
import { spawn } from 'child_process';
import { logInfo, logWarn } from './lib/logger.js';

dotenv.config();

if (process.env.DEV) {
	logWarn('Running in DEV mode');
}

logInfo(`[MAIN] .env existing ${process.env.DATABASE_URL ? '✅' : '❌'}`);

// Setup the server if it's not already setup
if (!process.env.DATABASE_URL) {
	setup().then(() => process.exit(0));
}

// Start the server
else if (process.env.DEV)
	spawn('npx tsx src/start.ts', {
		stdio: 'inherit',
		shell: true,
		cwd: process.cwd(),
		env: process.env,
	});
else if (process.argv.includes('--start-child')) {
	import('./start.js');
} else {
	const child = spawn(process.execPath, ['--start-child'], {
		stdio: 'inherit',
	});

	child.on('error', console.error);
	child.on('exit', code => {
		console.log('Child exited:', code);
	});
}
