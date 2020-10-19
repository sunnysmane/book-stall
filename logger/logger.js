var loggingConfig = {
	name: 'BOOK_STALL_LOG',
	level: 'debug',
	path: '/tmp/node_debug.log'
};
var bunyan = require('bunyan'); // Bunyan dependency

var logger = bunyan.createLogger({
	name: loggingConfig.name,
	serializers: bunyan.stdSerializers,
	streams: [
		{
			level: loggingConfig.level,
			path: loggingConfig.path,
		},
		{
			level: bunyan.ERROR,
			stream: process.stdout,
		},
		{
			level: bunyan.DEBUG,
			stream: process.stdout,
		},
		{
			level: bunyan.INFO,
			stream: process.stdout,
		},
	],
});

module.exports = logger;
