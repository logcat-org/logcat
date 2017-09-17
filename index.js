const
	util = require('util'),
	spawn = require('child_process').spawn,
	check = require('./lib/check'),
	lines = require('./lib/lines');

module.exports = (command, plugins) => {
	const
		onError = data =>
			lines(data).forEach(line =>
				plugins.forEach(plugin => plugin.error(line))),
		args = command.split(' '),
		logcat = spawn(args.shift(), args);

	logcat.stdout.on('data', data =>
		check(lines(data)).forEach(lineWithType =>
			plugins.forEach(plugin =>
				plugin[lineWithType.type](lineWithType.line))));

	logcat.stderr.on('data', onError);
	logcat.on('error', onError);
};
