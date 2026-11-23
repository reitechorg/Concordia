import chalk from 'chalk';

export function logInfo(text: string, ...rest: unknown[]) {
	console.log(
		chalk.gray(`[${new Date().toLocaleTimeString()}]`),
		chalk.green(`${chalk.bold('[INFO]')} ${text}`),
		...rest,
	);
}

export function logWarn(text: string, ...rest: unknown[]) {
	console.log(
		chalk.gray(`[${new Date().toLocaleTimeString()}]`),
		chalk.yellow(`${chalk.bold('[WARN]')} ${text}`),
		...rest,
	);
}

export function logError(text: string, ...rest: unknown[]) {
	console.error(
		chalk.gray(`[${new Date().toLocaleTimeString()}]`),
		chalk.red(`${chalk.bold('[ERROR]')} ${text}`),
		...rest,
	);
}
