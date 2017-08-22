const
	util = require('util'),
	spawn = require('child_process').spawn,
	logcat = spawn('adb', ['logcat']),
	check = require('./lib/check'),
	lines = require('./lib/lines'),
	web = require('./lib/web'),
	console = require('console-logger-api');

module.exports = () => {
	const
		server = web(),
		onError = (data) => {
			lines(data).forEach((line) => {
				console.error(line);
				server.error(line);
			});
		};

	logcat.stdout.on('data', (data) => {
		check(lines(data)).forEach((lineWithType) => {
			const
				line = lineWithType.line,
				type = lineWithType.type;

			console[type](line);
			server[type](line);
		});
	});

	logcat.stderr.on('data', onError);
	logcat.on('error', onError);
};
