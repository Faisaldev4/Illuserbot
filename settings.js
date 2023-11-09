const fs = require("fs");
const chalk = require("chalk");
//api

lolapi = "https://api.lolhuman.xyz";
lolkey = "vcjteam";

global.domain = ""; // Isi Domain Lu
global.apikey = ""; // Isi Apikey Plta Lu
global.capikey = ""; // Isi Apikey Pltc Lu

global.yt = "https://youtube.com/@ardiantdrofficial";
global.ig = "https://instagram.com/ardianpermana93?igshid=ZDdkNTZiNTM=";
global.web = "https://ardiantdr.online";
global.region = "Indonesia";
global.email = "support@ardiantdr.online";
global.owner = ["6287845032372"];
global.ownernomer = ["6287845032372"];
global.premium = ["6287845032372"];
global.ownerNumber = ["6287845032372"];
global.botNumber = ["6281337073968"];
global.packname = "Ardian";
global.author = "TDR";
global.credits = "© ArdianTdR Official";
global.ownerName = "ArdianTdR";
global.botName = "Dizafa";
global.sessionName = "session";
global.wm = "Ardian."; //ur watermar
global.prefa = [",", "!", ".", "#", "&", "/"];
global.sp = "";
global.mess = {
  success: "✓",
  admin: "Khusus Admin Grup!",
  botAdmin: "Gua Bukan Admin",
  premime: "Fitur Khusus Premium Kalo Mau Daftar Ketik Sewa",
  owner: "Fitur Khusus Saya",
  group: "Hanya Bisa Di Grup!",
  private: "Hanya Bisa di Chat Pribadi Cuyy",
  eror: "Eror 404.!",
  bot: "Husus Pengguna Bot",
  OnlyUser:
    "*Maaf, kamu belum terdaftar di database,*\n*ketik #Daftar Untuk memverifikasi.*",
  wait: "Wait A minute...",
  prem: "*Anda Belum Premium, Silahkan Beli*\n*murah kok. 5k permanent :v*",
};
global.limitawal = {
  prem: "Unlimited",
  free: 5,
};

//read gambar
global.ppm1 = fs.readFileSync("./image/ppm1.jpg");
global.yts = fs.readFileSync("./image/yts.jpg");
global.ytmp4 = fs.readFileSync("./image/ytmp4.jpg");
global.ytmp3 = fs.readFileSync("./image/ytmp3.jpg");
global.potjam = fs.readFileSync("./image/waktu.jpg");
global.hack = fs.readFileSync("./image/hack.jpg");
global.regist = fs.readFileSync("./image/regist.jpg");
global.thumb = fs.readFileSync("./image/thumbnail.jpg");
global.thumb1 = fs.readFileSync("./image/thumb1.jpg");
global.tamnel = fs.readFileSync("./image/tamnel.jpg");
global.potoo = fs.readFileSync("./image/dian.jpg");
global.wlcm = fs.readFileSync("./image/wlcm.jpg");
global.lft = fs.readFileSync("./image/lft.jpg");
global.ttmp4 = fs.readFileSync("./image/ttmp4.jpg");
global.ttmp3 = fs.readFileSync("./image/ttmp3.jpg");
global.dana = { url: "https://telegra.ph/file/9ab4022c7e0f8d28317b0.png" };
global.gopay = { url: "https://telegra.ph/file/66b53c3fba14c132f037b.png" };
global.qris = { url: "https://telegra.ph/file/51016633c67997eacff6b.jpg" };

//read fake document
global.doc1 =
  "application/vnd.openxmlformats-officedocument.presentationml.presentation";
global.doc2 =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
global.doc3 =
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
global.doc4 = "application/zip";
global.doc5 = "application/pdf";
global.doc6 = "application/vnd.android.package-archive";

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
