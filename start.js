var { spawn } = require("child_process");
const chalk = require("chalk");
var cp = require("child_process");
var { promisify } = require("util");

var exec = promisify(cp.exec).bind(cp)

function start(cmd) {
	return spawn(cmd, [], {
		stdio: ['inherit', 'inherit', 'inherit', 'ipc']
	})
};
start('bash')

console.log("silahkan masukan perintah")