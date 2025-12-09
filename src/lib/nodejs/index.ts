import * as readline from 'readline';

if (process.platform === 'win32') {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	rl.on('SIGINT', function () {
		process.emit('SIGINT');
	});
}
