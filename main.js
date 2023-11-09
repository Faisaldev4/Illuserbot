let { spawn } = require("child_process");
let path = require("path");
let fs = require("fs");
const chalk = require("chalk");
const { say } = require("cfonts");
const { sleep } = require("./lib/myfunc");
let package = require("./package.json");

async function start() {
  console.log(
    chalk.yellowBright.bold("[SYSTEM]~"),
    chalk.blueBright.bold("[pterodactyl] starting")
  );
  await sleep(2000);
  await console.log(
    chalk.yellowBright.bold("[SYSTEM]~"),
    chalk.green.bold("[pterodactyl] running")
  );
  await say("Ardian_Dev", {
    font: "chrome",
    align: "left",
    colors: ["#00FFD9"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: "0",
    gradient: false,
    independentGradient: false,
    transitionGradient: false,
    env: "node",
  });
  await say(" ++++++++( ArdianVcJ Official )+++++++", {
    font: "console",
    gradient: ["red", "magenta"],
    align: "left",
  });

  let args = [path.join(__dirname, "index.js"), ...process.argv.slice(2)];
  let p = spawn(process.argv[0], args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  })
    .on("message", (data) => {
      if (data == "reset") {
        console.log(
          chalk.yellowBright.bold("[SYSTEM]~"),
          chalk.white.bold("[pterodactyl] restarting")
        );
        p.kill();
        start();
        delete p;
      }
    })
    .on("exit", (code) => {
      console.log(
        chalk.yellowBright.bold("[SYSTEM]~"),
        chalk.redBright.bold("Koneksi Error,, Dengan Kode: " + code)
      );
      console.log(
        chalk.yellowBright.bold("[SYSTEM]~"),
        chalk.white.bold("[pterodactyl] starting")
      );
      if (code == 1) start();
      if (code == null) start();
    });
}

start();