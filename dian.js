/*
   ≽Thank To Creator This Bot
   ≽Base: Src = Github: Wa Open Ai
   ≽Author: ArdianTdR
   ≽Partner: ZassTdR,ChaikalTdR,BayuAmore,SyeifSultan
   ≽Develop: ArdianTdr,SyeifSultan
*/

require("./settings");
const {
   BufferJSON,
   WA_DEFAULT_EPHEMERAL,
   generateWAMessageFromContent,
   proto,
   generateWAMessageContent,
   generateWAMessage,
   downloadContentFromMessage,
   prepareWAMessageMedia,
   areJidsSameUser,
   getContentType,
   delay,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const axios = require("axios");
const cheerio = require("cheerio");
const os = require("os");
const speed = require("performance-now");
const FormData = require("form-data");
const ffmpeg = require("fluent-ffmpeg");
const { createWorker } = require("tesseract.js");
const { exec, spawn, execSync } = require("child_process");
const { UploadFileUgu, webp2mp4File, TelegraPh } = require("./lib/uploader");
const { toPTT, toAudio } = require("./lib/converter");
const ai = require("./lib/openAI.js");
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const path = require("path");
const moment = require("moment-timezone");
const crypto = require("crypto");
const {
   smsg,
   formatp,
   tanggal,
   formatDate,
   getTime,
   isUrl,
   sleep,
   clockString,
   runtime,
   reSize,
   fetchJson,
   getBuffer,
   jsonformat,
   format,
   parseMention,
   getRandom,
   getCase,
   makeId,
} = require("./lib/myfunc");

const { mediafireDl } = require("./lib/mediafire.js");
//openai
const { Configuration, OpenAIApi } = require("openai");
const keyy = require("./key.json");
const key1 = require("./key.json");
const setting = require("./key.json");
const ini_mark = `0@s.whatsapp.net`;
const ownernya = ownernomer + "@s.whatsapp.net";
const time2 = moment().tz("Asia/Makassar").format("HH:mm:ss");
if (time2 < "19:00:00") {
   var ucapanWaktu = "Selamat Malam";
}
if (time2 < "18:00:00") {
   var ucapanWaktu = "Selamat Sore";
}
if (time2 < "15:00:00") {
   var ucapanWaktu = "Selamat Siang";
}
if (time2 < "11:00:00") {
   var ucapanWaktu = "Selamat Pagi";
}
if (time2 < "06:00:00") {
   var ucapanWaktu = "Selamat malam menjelang pagi";
}

module.exports = dian = async (dian, m, chatUpdate, store) => {
   try {
      const body =
         m.mtype === "conversation"
            ? m.message.conversation
            : m.mtype == "imageMessage"
            ? m.message.imageMessage.caption
            : m.mtype == "videoMessage"
            ? m.message.videoMessage.caption
            : m.mtype == "extendedTextMessage"
            ? m.message.extendedTextMessage.text
            : m.mtype == "buttonsResponseMessage"
            ? m.message.buttonsResponseMessage.selectedButtonId
            : m.mtype == "listResponseMessage"
            ? m.message.listResponseMessage.singleSelectReply.selectedRowId
            : m.mtype == "templateButtonReplyMessage"
            ? m.message.templateButtonReplyMessage.selectedId
            : m.mtype === "messageContextInfo"
            ? m.message.buttonsResponseMessage?.selectedButtonId ||
              m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
              m.text
            : "";
      var budy = typeof m.text == "string" ? m.text : "";
      const prefix = prefa
         ? /^[°•π÷×¶∆£¢€¥®⪼?+✓_=|~!?@#$%^&.©^]/gi.test(body)
            ? body.match(/^[°•π÷×¶∆£¢€¥®⪼?+✓_=|~!?@#$%^&.©^]/gi)[0]
            : ""
         : prefa ?? global.prefix;
      const isCmd = body.startsWith(prefix);
      const command = body
         .replace(prefix, "")
         .trim()
         .split(/ +/)
         .shift()
         .toLowerCase();
      const content = JSON.stringify(m.message);
      const { type, quotedMsg, mentioned, now, fromMe } = m;
      const from = m.key.remoteJid;
      const args = body.trim().split(/ +/).slice(1);
      const pushname = m.pushName || "No Name";
      const me = m.sender;
      const botNumber = await dian.decodeJid(dian.user.id);
      const groupMetadata = m.isGroup
         ? await dian.groupMetadata(m.chat).catch((e) => {})
         : "";
      const groupName = m.isGroup && groupMetadata ? groupMetadata.subject : "";
      const participants = m.isGroup ? await groupMetadata.participants : "";
      const groupAdmins = m.isGroup
         ? await participants.filter((v) => v.admin !== null).map((v) => v.id)
         : "";
      const groupOwner = m.isGroup ? groupMetadata.owner : "";
      const groupMembers = m.isGroup ? groupMetadata.participants : "";
      const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
      const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
      const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
      const itsMe = m.sender == botNumber ? true : false;
      const text = (q = args.join(" "));
      const quoted = m.quoted ? m.quoted : m;
      const mime = (quoted.msg || quoted).mimetype || "";
      const qmsg = quoted.msg || quoted;
      const jam = moment.tz("asia/Makassar").format("HH:mm:ss");
      const tanggal = moment().tz("Asia/Makassar").format("ll");
      const dt = moment(Date.now())
         .tz("Asia/Makassar")
         .locale("id")
         .format("a");
      const ucapanWaktu = "Selamat " + dt.charAt(0).toUpperCase() + dt.slice(1);

      const isMedia = /image|video|sticker|audio/.test(mime);
      const isImage = type == "imageMessage";
      const isVideo = type == "videoMessage";
      const isAudio = type == "audioMessage";
      const isSticker = type == "stickerMessage";

      const isQuotedText = type === "extendedTextMessage";
      const isQuotedImage =
         type === "extendedTextMessage" && content.includes("imageMessage");
      const isQuotedLocation =
         type === "extendedTextMessage" && content.includes("locationMessage");
      const isQuotedVideo =
         type === "extendedTextMessage" && content.includes("videoMessage");
      const isQuotedSticker =
         type === "extendedTextMessage" && content.includes("stickerMessage");
      const isQuotedAudio =
         type === "extendedTextMessage" && content.includes("audioMessage");
      const isQuotedContact =
         type === "extendedTextMessage" && content.includes("contactMessage");
      const isQuotedDocument =
         type === "extendedTextMessage" && content.includes("documentMessage");

      const sender = m.isGroup
         ? m.key.participant
            ? m.key.participant
            : m.participant
         : m.key.remoteJid;
      const isCreator = [botNumber, ...global.owner]
         .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
         .includes(m.sender);
      const senderNumber = sender.split("@")[0];
      const nyoutube = "® Ardiannn";
      const mentionUser = [
         ...new Set([
            ...(m.mentionedJid || []),
            ...(m.quoted ? [m.quoted.sender] : []),
         ]),
      ];
      const mentionByTag =
         type == "extendedTextMessage" &&
         m.message.extendedTextMessage.contextInfo != null
            ? m.message.extendedTextMessage.contextInfo.mentionedJid
            : [];

      const mentionByReply =
         type == "extendedTextMessage" &&
         m.message.extendedTextMessage.contextInfo != null
            ? m.message.extendedTextMessage.contextInfo.participant || ""
            : "";

      const numberQuery =
         q.replace(new RegExp("[()+-/ +/]", "gi"), "") + "@s.whatsapp.net";
      const usernya = mentionByReply ? mentionByReply : mentionByTag[0];
      const Input = mentionByTag[0]
         ? mentionByTag[0]
         : mentionByReply
         ? mentionByReply
         : q
         ? numberQuery
         : false;

      //=====//Function//=====//
      async function processing(urlPath, method) {
         return new Promise(async (resolve, reject) => {
            let Methods = ["enhance", "recolor", "dehaze"];
            Methods.includes(method)
               ? (method = method)
               : (method = Methods[0]);
            let buffer,
               Form = new FormData(),
               scheme =
                  "https" +
                  "://" +
                  "inferenceengine" +
                  ".vyro" +
                  ".ai/" +
                  method;
            Form.append("model_version", 1, {
               "Content-Transfer-Encoding": "binary",
               contentType: "multipart/form-data; charset=uttf-8",
            });
            Form.append("image", Buffer.from(urlPath), {
               filename: "enhance_image_body.jpg",
               contentType: "image/jpeg",
            });
            Form.submit(
               {
                  url: scheme,
                  host: "inferenceengine" + ".vyro" + ".ai",
                  path: "/" + method,
                  protocol: "https:",
                  headers: {
                     "User-Agent": "okhttp/4.9.3",
                     Connection: "Keep-Alive",
                     "Accept-Encoding": "gzip",
                  },
               },
               function (err, res) {
                  if (err) reject();
                  let data = [];
                  res.on("data", function (chunk, resp) {
                     data.push(chunk);
                  }).on("end", () => {
                     resolve(Buffer.concat(data));
                  });
                  res.on("error", (e) => {
                     reject();
                  });
               }
            );
         });
      }

      async function loading() {
         let loadText = [
            "Lo",
            "Loa",
            "Load",
            "Loadi",
            "Loadin",
            "Loading",
            "Loading.",
            "Loading..",
            "Loading...",
            "Loading....",
         ];
         let { key } = await dian.sendMessage(
            m.chat,
            { text: "L" },
            { quoted: m }
         );
         for (let i = 0; i < loadText.length; i++) {
            await dian.sendMessage(
               m.chat,
               { text: loadText[i], edit: key },
               { quoted: m }
            );
         }
      }

      async function cerpen(category) {
         return new Promise(async (resolve, reject) => {
            let title = category.toLowerCase().replace(/[()*]/g, "");
            let judul = title.replace(/\s/g, "-");
            let page = Math.floor(Math.random() * 5);
            axios
               .get(
                  "http://cerpenmu.com/category/cerpen-" +
                     judul +
                     "/page/" +
                     page
               )
               .then((get) => {
                  let $ = cheerio.load(get.data);
                  let link = [];
                  $("article.post").each(function (a, b) {
                     link.push($(b).find("a").attr("href"));
                  });
                  let random = link[Math.floor(Math.random() * link.length)];
                  axios.get(random).then((res) => {
                     let $$ = cheerio.load(res.data);
                     let hasil = {
                        title: $$("#content > article > h1").text(),
                        author: $$("#content > article")
                           .text()
                           .split("Cerpen Karangan: ")[1]
                           .split("Kategori: ")[0],
                        kategori: $$("#content > article")
                           .text()
                           .split("Kategori: ")[1]
                           .split("\n")[0],
                        lolos: $$("#content > article")
                           .text()
                           .split("Lolos moderasi pada: ")[1]
                           .split("\n")[0],
                        cerita: $$("#content > article > p").text(),
                     };
                     resolve(hasil);
                  });
               });
         });
      }
      function getFunc(string) {
         return "" + string + "";
      }

      function kyun(seconds) {
         function pad(s) {
            return (s < 10 ? "0" : "") + s;
         }
         var days = Math.floor(seconds / (3600 * 24));
         var hours = Math.floor((seconds % (3600 * 24)) / 3600);
         var minutes = Math.floor((seconds % 3600) / 60);
         return `${pad(days)}Hari:${pad(hours)}Jam:${pad(minutes)}Menit`;
      }

      const ff = {
         key: {
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
         },
         message: {
            audioMessage: {
               mimetype: "audio/ogg; codecs=opus",
               seconds: 999999999,
               ptt: "true",
            },
         },
      };

      const downloadMp3 = async (Link) => {
         try {
            await ytdl.getInfo(Link);
            let nok = await yts(`${text}`);
            let lot = nok;
            let kem = await getBuffer(lot.all[0].thumbnail);
            let mp3File = getRandom(".mp3");
            ytdl(Link, { filter: "audioonly" })
               .pipe(fs.createWriteStream(mp3File))
               .on("finish", async () => {
                  await dian.sendMessage(
                     from,
                     {
                        document: fs.readFileSync(mp3File),
                        jpegThumbnail: ytmp3,
                        mimetype: "audio/mp3",
                        fileName: `${lot.all[0].title}.mp3`,
                        caption: `Download With Ardiannn`,
                        contextInfo: {
                           externalAdReply: {
                              showAdAttribution: true,
                              renderLargerThumbnail: true,
                              title: `${lot.all[0].title}`,
                              body: `${lot.all[0].author.name}`,
                              previewType: `PHOTO`,
                              containsAutoReply: true,
                              mediaType: 2,
                              thumbnail: kem,
                              mediaUrl: `${lot.videos[0].url}`,
                              sourceUrl: `${lot.videos[0].url}`,
                           },
                        },
                     },
                     { quoted: ff }
                  );
                  fs.unlinkSync(mp3File);
               });
         } catch (err) {
            m.reply(`${err}`);
         }
      };
      const downloadMp4 = async (Link) => {
         try {
            await ytdl.getInfo(Link);
            let mp4File = getRandom(".mp4");
            let nok = await yts(`${text}`);
            let lott = nok;
            let tum = await getBuffer(lott.all[0].thumbnail);
            let nana = ytdl(Link)
               .pipe(fs.createWriteStream(mp4File))
               .on("finish", async () => {
                  await dian.sendMessage(
                     m.chat,
                     {
                        document: fs.readFileSync(mp4File),
                        jpegThumbnail: ytmp4,
                        fileName: `${lott.all[0].title}.mp4`,
                        mimetype: "video/mp4",
                        caption: "Video Berhasil Di Download",
                        gifPlayback: false,
                        contextInfo: {
                           externalAdReply: {
                              showAdAttribution: true,
                              title: `YouTube Video Download`,
                              body: `YouTube Downloader Result`,
                              previewType: `PHOTO`,
                              renderLargerThumbnail: true,
                              thumbnail: tum,
                              sourceUrl: `${Link}`,
                           },
                        },
                     },
                     { quoted: ff }
                  );
                  fs.unlinkSync(`./${mp4File}`);
               });
         } catch (err) {
            m.reply(`${err}`);
         }
      };

      const playMp3 = async (text) => {
         let search = await yts(`${text}`);
         let res = search;
         let todd = await getBuffer(res.all[0].thumbnail);
         try {
            await ytdl.getInfo(res.all[0].url);
            let mp3File = getRandom(".mp3");
            ytdl(res.all[0].url, { filter: "audioonly" })
               .pipe(fs.createWriteStream(mp3File))
               .on("finish", async () => {
                  dian.sendMessage(
                     from,
                     {
                        audio: fs.readFileSync(mp3File),
                        mimetype: "audio/mp4",
                        ptt: true,
                        contextInfo: {
                           externalAdReply: {
                              showAdAttribution: true,
                              renderLargerThumbnail: true,
                              title: `${res.all[0].title}`,
                              body: `${res.all[0].author.name}`,
                              previewType: `PHOTO`,
                              containsAutoReply: true,
                              mediaType: 2,
                              thumbnail: todd,
                              mediaUrl: `${res.videos[0].url}`,
                              sourceUrl: `${res.videos[0].url}`,
                           },
                        },
                     },
                     { quoted: ff }
                  );
                  await fs.unlinkSync(mp3File);
               });
         } catch (err) {
            m.reply(mess.error);
         }
      };

      const downloadMp3v2 = async (Link) => {
         try {
            await ytdl.getInfo(Link);
            let nok = await yts(`${text}`);
            let lot = nok;
            let kem = await getBuffer(lot.all[0].thumbnail);
            let mp3File = getRandom(".mp3");
            ytdl(Link, { filter: "audioonly" })
               .pipe(fs.createWriteStream(mp3File))
               .on("finish", async () => {
                  await dian.sendMessage(
                     from,
                     {
                        audio: fs.readFileSync(mp3File),
                        mimetype: "audio/mp3",
                        caption: `Download With Ardiannn`,
                        contextInfo: {
                           externalAdReply: {
                              showAdAttribution: true,
                              renderLargerThumbnail: true,
                              title: `${lot.all[0].title}`,
                              body: `${lot.all[0].author.name}`,
                              previewType: `PHOTO`,
                              containsAutoReply: true,
                              mediaType: 2,
                              thumbnail: kem,
                              mediaUrl: `${lot.videos[0].url}`,
                              sourceUrl: `${lot.videos[0].url}`,
                           },
                        },
                     },
                     { quoted: ff }
                  );
                  fs.unlinkSync(mp3File);
               });
         } catch (err) {
            m.reply(`${err}`);
         }
      };
      const downloadMp4v2 = async (Link) => {
         try {
            await ytdl.getInfo(Link);
            let mp4File = getRandom(".mp4");
            let nok = await yts(`${text}`);
            let lott = nok;
            let tum = await getBuffer(lott.all[0].thumbnail);
            let nana = ytdl(Link)
               .pipe(fs.createWriteStream(mp4File))
               .on("finish", async () => {
                  await dian.sendMessage(
                     m.chat,
                     {
                        video: fs.readFileSync(mp4File),
                        mimetype: "video/mp4",
                        caption: "Video Berhasil Di Download",
                        contextInfo: {
                           externalAdReply: {
                              showAdAttribution: true,
                              title: `YouTube Video Download`,
                              body: `YouTube Downloader Result`,
                              previewType: `PHOTO`,
                              renderLargerThumbnail: true,
                              thumbnail: tum,
                              sourceUrl: `${Link}`,
                           },
                        },
                     },
                     { quoted: ff }
                  );
                  fs.unlinkSync(`./${mp4File}`);
               });
         } catch (err) {
            m.reply(`${err}`);
         }
      };

      //db User
      const db_user = JSON.parse(fs.readFileSync("./database/user.json"));
      let cekUser = (satu, dua) => {
         let x1 = false;
         Object.keys(db_user).forEach((i) => {
            if (db_user[i].id == dua) {
               x1 = i;
            }
         });
         if (x1 !== false) {
            if (satu == "id") {
               return db_user[x1].id;
            }
            if (satu == "name") {
               return db_user[x1].name;
            }
            if (satu == "seri") {
               return db_user[x1].seri;
            }
            if (satu == "premium") {
               return db_user[x1].premium;
            }
         }
         if (x1 == false) {
            return null;
         }
      };

      let setUser = (satu, dua, tiga) => {
         Object.keys(db_user).forEach((i) => {
            if (db_user[i].id == dua) {
               if (satu == "±id") {
                  db_user[i].id = tiga;
                  fs.writeFileSync(
                     "./database/user.json",
                     JSON.stringify(db_user)
                  );
               }
               if (satu == "±name") {
                  db_user[i].name = tiga;
                  fs.writeFileSync(
                     "./database/user.json",
                     JSON.stringify(db_user)
                  );
               }
               if (satu == "±seri") {
                  db_user[i].seri = tiga;
                  fs.writeFileSync(
                     "./database/user.json",
                     JSON.stringify(db_user)
                  );
               }
               if (satu == "±premium") {
                  db_user[i].premium = tiga;
                  fs.writeFileSync(
                     "./database/user.json",
                     JSON.stringify(db_user)
                  );
               }
            }
         });
      };
      //DB premium
      let premium = JSON.parse(fs.readFileSync("./database/premium.json"));
      let siswa = JSON.parse(fs.readFileSync("./database/sekolah/siswa.json"));
      const isSiswa = siswa.includes(m.sender);
      const isPremium = premium.includes(m.sender);
      try {
         let isNumber = (x) => typeof x === "number" && !isNaN(x);
         let limitUser = isPremium
            ? global.limitawal.premium
            : global.limitawal.free;
         let user = global.db.data.users[m.sender];
         if (typeof user !== "object") global.db.data.users[m.sender] = {};
         if (user) {
            if (!isNumber(user.limit)) user.limit = limitUser;
         } else
            global.db.data.users[m.sender] = {
               limit: limitUser,
            };
      } catch (err) {}
      //db setting
      try {
         let isNumber = (x) => typeof x === "number" && !isNaN(x);
         let setting = global.db.data.settings[botNumber];
         if (typeof setting !== "object")
            global.db.data.settings[botNumber] = {};
         if (setting) {
            if (!isNumber(setting.status)) setting.status = 0;
            if (!("autobio" in setting)) setting.autobio = true;
            if (!("autosw" in setting)) setting.autosw = true;
            if (!("chatgpt" in setting)) setting.chatgpt = false;
            if (!("viewonce" in setting)) setting.viewonce = true;
         } else
            global.db.data.settings[botNumber] = {
               status: 0,
               autobio: true,
               autosw: true,
               chatgpt: false,
               viewonce: true,
            };
      } catch (err) {
         console.error(err);
      }

      const react = (teks) => {
         dian.sendMessage(m.chat, {
            react: { text: [teks], key: m.key },
         });
      };
      const saying = (text) => {
         let teks = text;
         let gtts = require("./lib/gtts")(`id`, teks);
         let ranm = getRandom(".mp3");
         let rano = getRandom(".ogg");
         gtts.save(ranm, teks, function () {
            exec(
               `ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`,
               (err) => {
                  fs.unlinkSync(ranm);
                  let buff = fs.readFileSync(rano);
                  if (err) return m.reply(mess.error);
                  dian.sendMessage(
                     m.chat,
                     {
                        audio: buff,
                        mimetype: "audio/mp4",
                        ptt: true,
                     },
                     { quoted: m }
                  );
                  fs.unlinkSync(rano);
               }
            );
         });
      };

      function pickRandom(list) {
         return list[Math.floor(Math.random() * list.length)];
      }
      const doneLoad = async (m) => {
         return react(pickRandom(["✅", "👍", "👌", "🆗"]));
      };
      const waitLoad = async (m) => {
         return react(pickRandom(["⏳", "🕓", "⏱️", "⏰"]));
      };

      const fetchUserData = async (username) => {
         try {
            const response = await fetch(
               `https://api.github.com/users/${username}`
            );
            if (!response.ok) {
               m.reply("User tidak ditemukan!");
            }
            const userData = await response.json();
            return userData;
         } catch (error) {
            m.reply(`Terjadi kesalahan: ${error.message}`);
         }
      };

      let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
      let docs = pickRandom(documents);

      try {
      } catch (err) {
         console.error(err);
      }
      if (!dian.public) {
         if (!m.key.fromMe) return;
      }

      var mdu = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
      var halalu = mdu[Math.floor(Math.random() * mdu.length)];
      var mdo = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
      var halalo = mdo[Math.floor(Math.random() * mdo.length)];
      var mdi = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
      var halali = mdi[Math.floor(Math.random() * mdi.length)];
      var mda = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
      var halala = mda[Math.floor(Math.random() * mda.length)];
      var mde = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];
      var halale = mde[Math.floor(Math.random() * mde.length)];

      async function senddianMessage(chatId, message, options = {}) {
         let generate = await generateWAMessage(chatId, message, options);
         let type2 = getContentType(generate.message);
         if ("contextInfo" in options)
            generate.message[type2].contextInfo = options?.contextInfo;
         if ("contextInfo" in message)
            generate.message[type2].contextInfo = message?.contextInfo;
         return await dian.relayMessage(chatId, generate.message, {
            messageId: generate.key.id,
         });
      }

      let rn = ["recording", "composing"];
      let jd = rn[Math.floor(Math.random() * rn.length)];
      // Push Message To Console
      let argsLog = budy.length > 100 ? `${q.substring(0, 100)}...` : budy;
      if (isCmd && !m.isGroup) {
         console.log(
            chalk.black(chalk.yellow(`[CHAT]: ${jam} WITA : ${tanggal}`)),
            chalk.cyan("\n✉️ : "),
            chalk.cyan(argsLog),
            chalk.magenta("\n👤 : "),
            chalk.green(pushname),
            chalk.red(`\n🪪 : ${me.split("@")[0]}@s.whatsapp.net\n`)
         );
      } else if (m.isGroup) {
         console.log(
            chalk.black(chalk.yellow(`[CHAT]: ${jam} WITA : ${tanggal}`)),
            chalk.cyan("\n✉️ : "),
            chalk.cyan(argsLog),
            chalk.red("\n👤 : "),
            chalk.yellow(pushname),
            chalk.green(`\n🪪 : ${me.split("@")[0]}@s.whatsapp.net`),
            chalk.blue("\n👥 : "),
            chalk.magenta(groupName + "\n")
         );
      }
      //database
      let chats = global.db.data.chats[m.chat];
      if (typeof chats !== "object") global.db.data.chats[m.chat] = {};
      if (chats) {
         if (!("antilink" in chats)) chats.antilink = false;
         if (!("antilink2" in chats)) chats.antilink2 = false;
         if (!("wellcome" in chats)) chats.wellcome = false;
      } else
         global.db.data.chats[m.chat] = {
            antilink: false,
            antilink2: false,
            wellcome: false,
         };
      //pertahanan
      const sendOwn = `${owner}@s.whatsapp.net`;

      if (m.mtype == "viewOnceMessageV2") {
         //if (!db.data.settings[botNumber].viewonce) return;
         try {
            let msg = m.message.viewOnceMessageV2.message;
            console.log(msg);
            let type = Object.keys(msg)[0];
            let media = await downloadContentFromMessage(
               msg[type],
               type == "imageMessage" ? "image" : "video"
            );
            let buffer = Buffer.from([]);
            for await (const chunk of media) {
               buffer = Buffer.concat([buffer, chunk]);
            }
            if (/video/.test(type)) {
               await dian.sendMessage(
                  sendOwn,
                  { video: buffer, caption: "tidak ada kata sekali lihat" },
                  { quoted: m }
               );
            } else if (/image/.test(type)) {
               await dian.sendMessage(
                  sendOwn,
                  { image: buffer, caption: "tidak ada kata sekali lihat" },
                  { quoted: m }
               );
            }
         } catch (e) {
            console.log(e);
         }
      }

      if (db.data.chats[m.chat].antilink2) {
         if (budy.match(`http`)) {
            if (!isBotAdmins) return;
            if (isCreator) return;
            await dian.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.sender,
               },
            });
            await sleep(1000);
            dian.groupParticipantsUpdate(m.chat, [m.sender], "remove");
         }
      }

      if (db.data.chats[m.chat].antilink) {
         if (budy.match(`http`)) {
            if (!isBotAdmins) return;
            if (isCreator) return;
            await dian.sendMessage(m.chat, {
               delete: {
                  remoteJid: m.chat,
                  fromMe: false,
                  id: m.key.id,
                  participant: m.sender,
               },
            });
         }
      }

      //get pp user
      try {
         ppuser = await dian.profilePictureUrl(num, "image");
      } catch {
         ppuser = "https://i.ibb.co/sbqvDMw/avatar-contact-large-v2.png";
      }

      /*=========================*/
      //fake Reply

      const ftoko = {
         key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
         },
         message: {
            productMessage: {
               product: {
                  title: `ArdianTdR Store`,
                  description: `Jangan Lupa Belanja Di ArdianTdR Store`,
                  curryCode: "USD",
                  priceAmount1000: "999999999",
                  retailerId: `ArdianTdR Store`,
                  productImageCount: 1,
               },
               businessOwnerJid: `0@s.whatsapp.net`,
            },
         },
      };

      const ftroli = {
         key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
         },
         message: {
            orderMessage: {
               itemCount: 2022,
               status: 200,
               thumbnail: thumb,
               surface: 200,
               message: "ArdianTdR",
               orderTitle: "Sepakat Bakso",
               sellerJid: "0@s.whatsapp.net",
            },
         },
         contextInfo: { forwardingScore: 999, isForwarded: true },
         sendEphemeral: true,
      };

      const fdoc = {
         key: {
            participant: "0@s.whatsapp.net",
            ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
         },
         message: {
            documentMessage: {
               title: "ArdianTdR",
               jpegThumbnail: thumb,
            },
         },
      };

      const fvn = {
         key: {
            participant: `0@s.whatsapp.net`,
            ...(from ? { remoteJid: "status@broadcast" } : {}),
         },
         message: {
            audioMessage: {
               mimetype: "audio/ogg; codecs=opus",
               seconds: 99999999999999,
               ptt: "true",
            },
         },
      };

      const fgif = {
         key: {
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
         },
         message: {
            videoMessage: {
               title: "Jangan Lupa Subscribe",
               h: `Hmm`,
               seconds: "359996400",
               gifPlayback: "true",
               caption: "ArdianTdR",
               jpegThumbnail: thumb,
            },
         },
      };
      const fgclink = {
         key: {
            participant: "0@s.whatsapp.net",
            remoteJid: "0@s.whatsapp.net",
         },
         message: {
            groupInviteMessage: {
               groupJid: "6288213840883-1616169743@g.us",
               inviteCode: "m",
               groupName: "ig : @ardianpermana93",
               caption: "®ArdianTdR",
               jpegThumbnail: thumb,
            },
         },
      };
      const fvideo = {
         key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
         },
         message: {
            videoMessage: {
               title: `${pushname}`,
               h: `Hmm`,
               seconds: "359996400",
               caption: `${pushname}`,
               jpegThumbnail: thumb,
            },
         },
      };

      const floc = {
         key: {
            participant: "0@s.whatsapp.net",
            ...(m.chat ? { remoteJid: `status@broadcast` } : {}),
         },
         message: {
            locationMessage: {
               name: "ArdianTdR",
               jpegThumbnail: thumb,
            },
         },
      };

      const fkontak = {
         key: {
            fromMe: false,
            participant: `1@s.whatsapp.net`,
            ...(from ? { remoteJid: "status@broadcast" } : {}),
         },
         message: {
            contactMessage: {
               displayName: `ArdianTdR\n`,
               vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XLArdianPermana,;;;\nFN:${pushname},\nitem1.TEL;waid=${
                  sender.split("@")[0]
               }:${sender.split("@")[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
               jpegThumbnail: ppuser,
            },
         },
      };

      const fsw = {
         key: {
            fromMe: false,
            participant: `0@s.whatsapp.net`,
            ...(m.chat ? { remoteJid: "status@broadcast" } : {}),
         },
         message: {
            imageMessage: {
               url: "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.",
               mimetype: "image/jpeg",
               caption: "ArdianTdR",
               fileSha256: "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
               fileLength: "28777",
               height: 1080,
               width: 1079,
               mediaKey: "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
               fileSha256: "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
               directPath:
                  "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
               mediaKeyTimestamp: "1610993486",
               jpegThumbnail: fs.readFileSync("./image/thumbnail.jpg"),
               scansSidecar:
                  "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==",
            },
         },
      };

      const unicorn = {
         key: {
            fromMe: false,
            participant: "0@s.whatsapp.net",
            remoteJid: "916909137213-1604595598@g.us",
         },
         message: {
            orderMessage: {
               itemCount: 9999999,
               status: 200,
               thumbnail: potoo,
               surface: 200,
               message: `ArdianTdR Official`,
               orderTitle: "dian",
               sellerJid: "0@s.whatsapp.net",
            },
         },
         contextInfo: { forwardingScore: 999, isForwarded: true },
         sendEphemeral: true,
      };

      const setReply = async (teks) => {
         dian.sendMessage(
            m.chat,
            {
               contextInfo: {
                  mentionedJid: teks
                     ? [...teks.matchAll(/@(\d{0,16})/g)].map(
                          (v) => v[1] + "@s.whatsapp.net"
                       )
                     : [],
                  externalAdReply: {
                     showAdAttribution: true,
                     title: "ardianpermana93",
                     body: "Follow My Instagram",
                     previewType: "PHOTO",
                     thumbnail: potoo,
                     sourceUrl: `${ig}`,
                  },
               },
               text: teks,
            },
            { quoted: m }
         );
      };

      if (isCmd) {
         if (dian.read) {
            if (m.isGroup) return;
            m.reply(
               `Hai? Saya Bot Ardian,, Maaf Dia Sedang Tidak Online,, Jangan Chat/Telpon Sementara Waktu, Saya Akan Segera Kembali`
            );
         }

         //+++++++++++++//

         //Auto Block Nomor Luar Negeri
         if (sender.startsWith("212")) {
            return dian.updateBlockStatus(sender, "block");
         }
         //========// Response Gpt //=========//
         //+++++++++ CODE BY ARDIAN ++++++++++//
         if (db.data.settings[botNumber].chatgpt && !m.isGroup) {
            dian.readMessages([m.key]);
            const aiResponse = await ai(body);
            if (aiResponse) {
               saying(aiResponse);
            }
         }
         //+++++++++/
         if (dian.autoread) {
            dian.readMessages([m.key]);
            dian.sendPreseUpdate("composing", from);
         }
         //====// Experimental Feature //====//
         const { cmdAllMenu, cmdMenu } = require("./message");

         // test feature
         if (command == "confes") {
            if (args < 0)
               return m.reply("Contoh Perintah\n.confes pesan 62xxx");
            let txt = text.split(",");
            let msg = txt[0];
            let numb = txt[1];
            let nbUsr = numb + "@s.whatsapp.net";
            let pesan = `*Pesan Dari Seseorang*\n\n• Nama: ${pushname}\n• Nomer: ${
               me.split("@")[0]
            }@s.whatsapp.net\n• Pesan: ${msg}`;
            await dian.sendMessage(nbUsr, {
               text: pesan,
            });
            doneLoad();
         } else if (command == "sendimg") {
            let msg = args[0];
            let nusr = msg + "@s.whatsapp.net";
            let caption = `Nih Pesan Dari ${pushname}`;
            let file = await quoted.download();
            await dian.sendMessage(
               nusr,
               {
                  image: file,
                  caption: caption,
               },
               { quoted: m }
            );
            fs.unlinkSync(file);
         } else if (command == "sendvid") {
            let msg = args[0];
            let nusr = msg + "@s.whatsapp.net";
            let caption = `Nih Pesan Dari ${pushname}`;
            let file2 = await quoted.download();
            await dian.sendMessage(
               nusr,
               {
                  video: file2,
                  caption: caption,
               },
               { quoted: m }
            );
            fs.unlinkSync(file2);
         } else if (command == "senddoc") {
            let msg = args[0];
            let nusr = msg + "@s.whatsapp.net";
            let caption = `Nih Pesan Dari ${pushname}`;
            let file3 = await quoted.download();
            await dian.sendMessage(
               nusr,
               {
                  video: file2,
                  caption: caption,
               },
               { quoted: m }
            );
            fs.unlinkSync(file3);
         } else if (command == "gitcek") {
            const username = args[0];
            fetchUserData(username)
               .then((userData) => {
                  m.reply(`
    Info Github ${username}
    
    UserName: ${userData.login},
    Nama: ${userData.name},
    Jumlah Repositori: ${userData.public_repos}
    `);
               })
               .catch((error) => console.error(error.message));
         } else
            switch (command) {
               case "add":
                  {
                     if (!isBotAdmins) return;
                     let users = m.quoted
                        ? m.quoted.sender
                        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                     await dian.groupParticipantsUpdate(m.chat, [users], "add");
                     await m.reply(`${users} di tambahkan`);
                  }
                  break;
               case "totext":
                  {
                     await waitLoad(m);
                     let medI = await dian.downloadAndSaveMediaMessage(quoted);
                     let res = await TelegraPh(medI);
                     let worker = await createWorker({
                        logger: (m) => console.log(m),
                     });
                     (async () => {
                        await worker.loadLanguage("eng");
                        await worker.initialize("eng");
                        const {
                           data: { text },
                        } = await worker.recognize(`${res}`);
                        m.reply(text);
                        await doneLoad(m);
                     })();
                  }
                  break;
               //
               case "userver":
                  {
                     if (!isCreator) return;
                     if (!text)
                        return m.reply(
                           "Format Salah!\nusername,nomer,jumlahMemory,Jumlah"
                        );
                     let t = text.split(",");
                     let username = t[0];
                     let passlog = username;
                     let mailnya = username + "@gmail.com";
                     let nomU = t[1].replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                     let memo_disk = t[2] + "000";
                     let cpu = t[3];
                     let name = username;
                     let desc = tanggal;
                     let egg = "15";
                     let loc = "1";
                     let fU = await fetch(domain + "/api/application/users", {
                        method: "POST",
                        headers: {
                           Accept: "application/json",
                           "Content-Type": "application/json",
                           Authorization: "Bearer " + apikey,
                        },
                        body: JSON.stringify({
                           email: mailnya,
                           username: username,
                           first_name: username,
                           last_name: "MEMBER",
                           language: "en",
                           password: passlog,
                        }),
                     });
                     let dataU = await fU.json();
                     if (dataU.errors)
                        return m.reply(
                           JSON.stringify(dataU.errors[0], null, 2)
                        );
                     let user = dataU.attributes;
                     await m.reply("User Sedang Di Buat");
                     await dian.sendMessage(m.chat, {
                        text: `*Akun Sudah Di Buat*\n
ID: ${user.id}
EMAIL : ${mailnya}
USERNAME: ${username}
PASSWORD: Telah Di Kirim

CREATED AT: ${user.created_at}`,
                     });
                     await dian.sendMessage(nomU, {
                        text: `*DETAIL AKUN!*\n
ID: ${user.id}
EMAIL : ${mailnya}
USERNAME: ${username}
PASSWORD: ${passlog}
LOGIN: ${domain}`,
                     });
                     await sleep(500);
                     await m.reply("Sedang Membuat Server");
                     await sleep(5000);
                     //addsrv
                     let f1 = await fetch(
                        domain + "/api/application/nests/5/eggs/" + egg,
                        {
                           method: "GET",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let dataS = await f1.json();
                     let startup_cmd = dataS.attributes.startup;
                     let f2 = await fetch(domain + "/api/application/servers", {
                        method: "POST",
                        headers: {
                           Accept: "application/json",
                           "Content-Type": "application/json",
                           Authorization: "Bearer " + apikey,
                        },
                        body: JSON.stringify({
                           name: name,
                           description: desc,
                           user: user.id,
                           egg: parseInt(egg),
                           docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                           startup: startup_cmd,
                           environment: {
                              INST: "npm",
                              USER_UPLOAD: "0",
                              AUTO_UPDATE: "0",
                              CMD_RUN: "npm start",
                           },
                           limits: {
                              memory: memo_disk,
                              swap: 0,
                              disk: memo_disk,
                              io: 500,
                              cpu: cpu,
                           },
                           feature_limits: {
                              databases: 5,
                              backups: 5,
                              allocations: 5,
                           },
                           deploy: {
                              locations: [parseInt(loc)],
                              dedicated_ip: false,
                              port_range: [],
                           },
                        }),
                     });
                     let res = await f2.json();
                     if (res.errors)
                        return m.reply(JSON.stringify(res.errors[0], null, 2));
                     let server = res.attributes;
                     m.reply(`*Server Telah Di Buat*
   
TYPE: ${res.object}
ID: ${server.id}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`);
                  }
                  break;

               case "allmenu":
                  {
                     let me = m.sender;
                     let timestampe = speed();
                     let latensie = speed() - timestampe;
                     let _uptime = process.uptime() * 1000;
                     let uptime = clockString(_uptime);
                     const more = String.fromCharCode(8206);
                     const readmore = more.repeat(4001);
                     react("⏳");
                     await sleep(1000);
                     let msg = `*Halo ${pushname} ${ucapanWaktu}*

*Nama* : ${pushname}
*Premium* : ${isPremium ? "x" : "✓"}
*Nomer* : ${me.split("@")[0]}
*Status* :  ${isCreator ? "Owner" : "User"}

💻 *INFO SERVER*
*Nama Bot* : ${global.botName}
*Pemilik* : ${global.ownerName}
*Platform* : ${os.platform()}
*RunTime* : ${kyun(os.uptime())}
*waktu* :${jam} Wita
*tanggal* :${tanggal}
*Memory* : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
*UptimeBot* : ${uptime}
*speed* : ${latensie.toFixed(4)} ms
*Library* : Baileys ^6.3.0
${readmore}

${cmdAllMenu}
Aktif Selama:${runtime(process.uptime())}

*_Bot ini Sedang tahap Pembaruan_* \n*_Jadi Maklum Kalo Ada Yang eror_*`;
                     dian.sendMessage(
                        m.chat,
                        {
                           document: fs.readFileSync("./src/doc.xlsx"),
                           jpegThumbnail: thumb1,
                           fileName: `AllMenu`,
                           mimetype: docs,
                           fileLength: 99999999999999,
                           pageCount: "100",
                           caption: msg,
                           contextInfo: {
                              externalAdReply: {
                                 showAdAttribution: true,
                                 title: "ArdianTdR Official",
                                 body: "𝙹𝚊𝚗𝚐𝚊𝚗 𝙻𝚞𝚙𝚊 𝚂𝚞𝚋𝚜𝚌𝚛𝚒𝚋𝚎",
                                 previewType: "PHOTO",
                                 mediaType: 1,
                                 thumbnail: potoo,
                                 sourceUrl: global.yt,
                              },
                           },
                        },
                        { quoted: fkontak }
                     );
                  }
                  break;

               case "totalcase":
                  {
                     if (!isCreator) return mess.owner;
                     fs.readFile("./dian.js", "utf8", (err, data) => {
                        if (err) throw err;
                        let regex = /case\s"(\w+)"/g;
                        let match,
                           caseNames = [];
                        while ((match = regex.exec(data)) !== null) {
                           caseNames.push(match[1]);
                        }
                        let output = "• " + caseNames.join("\n• ");
                        m.reply(
                           output + `\n\nTotal case : ${caseNames.length}`
                        );
                     });
                  }
                  break;

               case "gcaddpriv":
                  {
                     if (!text)
                        return m.reply(
                           "contoh\nhanya kontak = contacts\nKontak Tertentu = contact_blacklist\nTidak Ada = none"
                        );
                     const value = text; // 'contacts' | 'contact_blacklist' | 'none'
                     try {
                        await dian.updateGroupsAddPrivacy(value);
                        await m.reply(mess.success);
                     } catch (err) {
                        console.error(err);
                        m.reply("Terjadi kesalahan pada" + err);
                     }
                  }
                  break;
               case "list":
                  {
                     let me = m.sender;
                     let timestampe = speed();
                     let latensie = speed() - timestampe;
                     let _uptime = process.uptime() * 1000;
                     let uptime = clockString(_uptime);
                     const more = String.fromCharCode(8206);
                     const readmore = more.repeat(4001);
                     const menuCmd = [
                        "main",
                        "allmenu",
                        "funn",
                        "image",
                        "tools",
                        "downloader",
                        "maker",
                        "shortlink",
                        "soundmenu",
                        "groupmenu",
                        "texttospeech",
                        "ownermenu",
                     ];
                     let tekss = `*INFO USER*
*Nama* : ${pushname}
*Premium* : ${isPremium ? "✓" : "X"}
*Nomer* : ${me.split("@")[0]}
*Status* :  ${isCreator ? "Owner" : "User"}

💻 *INFO SERVER*
*Nama Bot* : ${global.botName}
*Pemilik* : ${global.ownerName}
*Platform* : ${os.platform()}
*RunTime* : ${kyun(os.uptime())}
*waktu* :${jam} Wita
*tanggal* :${tanggal}
*Memory* : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
*Uptime Bot* : ${uptime}
*speed* : ${latensie.toFixed(4)} ms
*Library* : Baileys ^6.3.0`;
                     dian.sendPoll(m.chat, tekss, menuCmd, {
                        quoted: unicorn,
                     });
                  }
                  break;
               case "test":
                  {
                     saying("Halo Ada Apa");
                  }
                  break;

               case "brainly":
                  {
                     if (!text) return m.reply("Mau Cari Jawaban Apa?");
                     try {
                        let teks = args[0];
                        await react(`⏳`);
                        brainly(`${teks}`).then((res) => {
                           m.reply(res);
                        });
                        await react(`✅`);
                     } catch (err) {
                        console.error(err);
                        m.reply(
                           "Terjadi kesalahan saat mari jawaban, silahkan coba lagi!"
                        );
                     }
                  }
                  break;

               case "cerpen_anak":
                  {
                     m.reply(mess.wait);
                     let cerpe = await cerpen(`anak`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerpe.title}\n⭔ _*Author :*_ ${cerpe.author}\n⭔ _*Category :*_ ${cerpe.kategori}\n⭔ _*Pass Moderation :*_ ${cerpe.lolos}\n⭔ _*Story :*_\n${cerpe.cerita}`
                     );
                  }
                  break;
               case "cerpen_bahasadaerah":
                  {
                     m.reply(mess.wait);
                     let cerpet = await cerpen(`bahasa daerah`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerpet.title}\n⭔ _*Author :*_ ${cerpet.author}\n⭔ _*Category :*_ ${cerpet.kategori}\n⭔ _*Pass Moderation :*_ ${cerpet.lolos}\n⭔ _*Story :*_\n${cerpet.cerita}`
                     );
                  }
                  break;
               case "cerpen_bahasainggris":
                  {
                     m.reply(mess.wait);
                     let cerpez = await cerpen(`bahasa Inggris`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerpez.title}\n⭔ _*Author :*_ ${cerpez.author}\n⭔ _*Category :*_ ${cerpez.kategori}\n⭔ _*Pass Moderation :*_ ${cerpez.lolos}\n⭔ _*Story :*_\n${cerpez.cerita}`
                     );
                  }
                  break;
               case "cerpen_bahasajawa":
                  {
                     m.reply(mess.wait);
                     let cerpep = await cerpen(`bahasa jawa`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerpep.title}\n⭔ _*Author :*_ ${cerpep.author}\n⭔ _*Category :*_ ${cerpep.kategori}\n⭔ _*Pass Moderation :*_ ${cerpep.lolos}\n⭔ _*Story :*_\n${cerpep.cerita}`
                     );
                  }
                  break;
               case "cerpen_bahasasunda":
                  {
                     m.reply(mess.wait);
                     let cerped = await cerpen(`bahasa sunda`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerped.title}\n⭔ _*Author :*_ ${cerped.author}\n⭔ _*Category :*_ ${cerped.kategori}\n⭔ _*Pass Moderation :*_ ${cerped.lolos}\n⭔ _*Story :*_\n${cerped.cerita}`
                     );
                  }
                  break;
               case "cerpen_budaya":
                  {
                     m.reply(mess.wait);
                     let cerper = await cerpen(`budaya`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerper.title}\n⭔ _*Author :*_ ${cerper.author}\n⭔ _*Category :*_ ${cerper.kategori}\n⭔ _*Pass Moderation :*_ ${cerper.lolos}\n⭔ _*Story :*_\n${cerper.cerita}`
                     );
                  }
                  break;
               case "cerpen_cinta":
                  {
                     m.reply(mess.wait);
                     let cerpem = await cerpen(`cinta`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerpem.title}\n⭔ _*Author :*_ ${cerpem.author}\n⭔ _*Category :*_ ${cerpem.kategori}\n⭔ _*Pass Moderation :*_ ${cerpem.lolos}\n⭔ _*Story :*_\n${cerpem.cerita}`
                     );
                  }
                  break;
               case "cerpen_cintaislami":
                  {
                     m.reply(mess.wait);
                     let cerpel = await cerpen(`cinta islami`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerpel.title}\n⭔ _*Author :*_ ${cerpel.author}\n⭔ _*Category :*_ ${cerpel.kategori}\n⭔ _*Pass Moderation :*_ ${cerpel.lolos}\n⭔ _*Story :*_\n${cerpel.cerita}`
                     );
                  }
                  break;
               case "cerpen_cintapertama":
                  {
                     m.reply(mess.wait);
                     let cerpes = await cerpen(`cinta pertama`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerpes.title}\n⭔ _*Author :*_ ${cerpes.author}\n⭔ _*Category :*_ ${cerpes.kategori}\n⭔ _*Pass Moderation :*_ ${cerpes.lolos}\n⭔ _*Story :*_\n${cerpes.cerita}`
                     );
                  }
                  break;
               case "cerpen_cintaromantis":
                  {
                     m.reply(mess.wait);
                     let cerpde = await cerpen(`cinta romantis`);
                     m.reply(
                        `⭔ _*Title :*_ ${cerpde.title}\n⭔ _*Author :*_ ${cerpde.author}\n⭔ _*Category :*_ ${cerpde.kategori}\n⭔ _*Pass Moderation :*_ ${cerpde.lolos}\n⭔ _*Story :*_\n${cerpde.cerita}`
                     );
                  }
                  break;
               case "cerpen_cintasedih":
                  {
                     m.reply(mess.wait);
                     let fejdj = await cerpen(`cinta sedih`);
                     m.reply(
                        `⭔ _*Title :*_ ${fejdj.title}\n⭔ _*Author :*_ ${fejdj.author}\n⭔ _*Category :*_ ${fejdj.kategori}\n⭔ _*Pass Moderation :*_ ${fejdj.lolos}\n⭔ _*Story :*_\n${fejdj.cerita}`
                     );
                  }
                  break;
               case "cerpen_cintasegitiga":
                  {
                     m.reply(mess.wait);
                     let frofk = await cerpen(`Cinta segitiga`);
                     m.reply(
                        `⭔ _*Title :*_ ${frofk.title}\n⭔ _*Author :*_ ${frofk.author}\n⭔ _*Category :*_ ${frofk.kategori}\n⭔ _*Pass Moderation :*_ ${frofk.lolos}\n⭔ _*Story :*_\n${frofk.cerita}`
                     );
                  }
                  break;
               case "cerpen_cintasejati":
                  {
                     m.reply(mess.wait);
                     let frljkek = await cerpen(`cinta sejati`);
                     m.reply(
                        `⭔ _*Title :*_ ${frljkek.title}\n⭔ _*Author :*_ ${frljkek.author}\n⭔ _*Category :*_ ${frljkek.kategori}\n⭔ _*Pass Moderation :*_ ${frljkek.lolos}\n⭔ _*Story :*_\n${frljkek.cerita}`
                     );
                  }
                  break;
               case "cerpen_galau":
                  {
                     m.reply(mess.wait);
                     let cdjfj = await cerpen(`galau`);
                     m.reply(
                        `⭔ _*Title :*_ ${cdjfj.title}\n⭔ _*Author :*_ ${cdjfj.author}\n⭔ _*Category :*_ ${cdjfj.kategori}\n⭔ _*Pass Moderation :*_ ${cdjfj.lolos}\n⭔ _*Story :*_\n${cdjfj.cerita}`
                     );
                  }
                  break;
               case "cerpen_gokil":
                  {
                     m.reply(mess.wait);
                     let vrkfjf = await cerpen(`gokil`);
                     m.reply(
                        `⭔ _*Title :*_ ${vrkfjf.title}\n⭔ _*Author :*_ ${vrkfjf.author}\n⭔ _*Category :*_ ${vrkfjf.kategori}\n⭔ _*Pass Moderation :*_ ${vrkfjf.lolos}\n⭔ _*Story :*_\n${vrkfjf.cerita}`
                     );
                  }
                  break;
               case "cerpen_inspiratif":
                  {
                     m.reply(mess.wait);
                     let ngkgk = await cerpen(`inspiratif`);
                     m.reply(
                        `⭔ _*Title :*_ ${ngkgk.title}\n⭔ _*Author :*_ ${ngkgk.author}\n⭔ _*Category :*_ ${ngkgk.kategori}\n⭔ _*Pass Moderation :*_ ${ngkgk.lolos}\n⭔ _*Story :*_\n${ngkgk.cerita}`
                     );
                  }
                  break;
               case "cerpen_jepang":
                  {
                     m.reply(mess.wait);
                     let vrlgk = await cerpen(`jepang`);
                     m.reply(
                        `⭔ _*Title :*_ ${vrlgk.title}\n⭔ _*Author :*_ ${vrlgk.author}\n⭔ _*Category :*_ ${vrlgk.kategori}\n⭔ _*Pass Moderation :*_ ${vrlgk.lolos}\n⭔ _*Story :*_\n${vrlgk.cerita}`
                     );
                  }
                  break;
               case "cerpen_kehidupan":
                  {
                     m.reply(mess.wait);
                     let ntlgkt = await cerpen(`kehidupan`);
                     m.reply(
                        `⭔ _*Title :*_ ${ntlgkt.title}\n⭔ _*Author :*_ ${ntlgkt.author}\n⭔ _*Category :*_ ${ntlgkt.kategori}\n⭔ _*Pass Moderation :*_ ${ntlgkt.lolos}\n⭔ _*Story :*_\n${ntlgkt.cerita}`
                     );
                  }
                  break;
               case "cerpen_keluarga":
                  {
                     m.reply(mess.wait);
                     let bmflg = await cerpen(`keluarga`);
                     m.reply(
                        `⭔ _*Title :*_ ${bmflg.title}\n⭔ _*Author :*_ ${bmflg.author}\n⭔ _*Category :*_ ${bmflg.kategori}\n⭔ _*Pass Moderation :*_ ${bmflg.lolos}\n⭔ _*Story :*_\n${bmflg.cerita}`
                     );
                  }
                  break;
               case "cerpen_kisahnyata":
                  {
                     m.reply(mess.wait);
                     let yptoo = await cerpen(`kisah nyata`);
                     m.reply(
                        `⭔ _*Title :*_ ${yptoo.title}\n⭔ _*Author :*_ ${yptoo.author}\n⭔ _*Category :*_ ${yptoo.kategori}\n⭔ _*Pass Moderation :*_ ${yptoo.lolos}\n⭔ _*Story :*_\n${yptoo.cerita}`
                     );
                  }
                  break;
               case "cerpen_korea":
                  {
                     m.reply(mess.wait);
                     let jptpgr = await cerpen(`korea`);
                     m.reply(
                        `⭔ _*Title :*_ ${jptpgr.title}\n⭔ _*Author :*_ ${jptpgr.author}\n⭔ _*Category :*_ ${jptpgr.kategori}\n⭔ _*Pass Moderation :*_ ${jptpgr.lolos}\n⭔ _*Story :*_\n${jptpgr.cerita}`
                     );
                  }
                  break;
               case "cerpen_kristen":
                  {
                     m.reply(mess.wait);
                     let yesusanjing = await cerpen(`kristen`);
                     m.reply(
                        `⭔ _*Title :*_ ${yesusanjing.title}\n⭔ _*Author :*_ ${yesusanjing.author}\n⭔ _*Category :*_ ${yesusanjing.kategori}\n⭔ _*Pass Moderation :*_ ${yesusanjing.lolos}\n⭔ _*Story :*_\n${yesusanjing.cerita}`
                     );
                  }
                  break;
               case "cerpen_liburan":
                  {
                     m.reply(mess.wait);
                     let frkfkrk = await cerpen(`liburan`);
                     m.reply(
                        `⭔ _*Title :*_ ${frkfkrk.title}\n⭔ _*Author :*_ ${frkfkrk.author}\n⭔ _*Category :*_ ${frkfkrk.kategori}\n⭔ _*Pass Moderation :*_ ${frkfkrk.lolos}\n⭔ _*Story :*_\n${frkfkrk.cerita}`
                     );
                  }
                  break;
               case "cerpen_malaysia":
                  {
                     m.reply(mess.wait);
                     let mzbdjd = await cerpen(`malaysia`);
                     m.reply(
                        `⭔ _*Title :*_ ${mzbdjd.title}\n⭔ _*Author :*_ ${mzbdjd.author}\n⭔ _*Category :*_ ${mzbdjd.kategori}\n⭔ _*Pass Moderation :*_ ${mzbdjd.lolos}\n⭔ _*Story :*_\n${mzbdjd.cerita}`
                     );
                  }
                  break;
               case "cerpen_mengharukan":
                  {
                     m.reply(mess.wait);
                     let bgfngk = await cerpen(`mengharukan`);
                     m.reply(
                        `⭔ _*Title :*_ ${bgfngk.title}\n⭔ _*Author :*_ ${bgfngk.author}\n⭔ _*Category :*_ ${bgfngk.kategori}\n⭔ _*Pass Moderation :*_ ${bgfngk.lolos}\n⭔ _*Story :*_\n${bgfngk.cerita}`
                     );
                  }
                  break;
               case "cerpen_misteri":
                  {
                     m.reply(mess.wait);
                     let lapdoek = await cerpen(`misteri`);
                     m.reply(
                        `⭔ _*Title :*_ ${lapdoek.title}\n⭔ _*Author :*_ ${lapdoek.author}\n⭔ _*Category :*_ ${lapdoek.kategori}\n⭔ _*Pass Moderation :*_ ${lapdoek.lolos}\n⭔ _*Story :*_\n${lapdoek.cerita}`
                     );
                  }
                  break;
               case "cerpen_motivasi":
                  {
                     m.reply(mess.wait);
                     let bltkyj = await cerpen(`motivasi`);
                     m.reply(
                        `⭔ _*Title :*_ ${bltkyj.title}\n⭔ _*Author :*_ ${bltkyj.author}\n⭔ _*Category :*_ ${bltkyj.kategori}\n⭔ _*Pass Moderation :*_ ${bltkyj.lolos}\n⭔ _*Story :*_\n${bltkyj.cerita}`
                     );
                  }
                  break;
               case "cerpen_nasihat":
                  {
                     m.reply(mess.wait);
                     let qpeidek = await cerpen(`nasihat`);
                     m.reply(
                        `⭔ _*Title :*_ ${qpeidek.title}\n⭔ _*Author :*_ ${qpeidek.author}\n⭔ _*Category :*_ ${qpeidek.kategori}\n⭔ _*Pass Moderation :*_ ${qpeidek.lolos}\n⭔ _*Story :*_\n${qpeidek.cerita}`
                     );
                  }
                  break;
               case "cerpen_nasionalisme":
                  {
                     m.reply(mess.wait);
                     let cdmrgo = await cerpen(`nasionalisme`);
                     m.reply(
                        `⭔ _*Title :*_ ${cdmrgo.title}\n⭔ _*Author :*_ ${cdmrgo.author}\n⭔ _*Category :*_ ${cdmrgo.kategori}\n⭔ _*Pass Moderation :*_ ${cdmrgo.lolos}\n⭔ _*Story :*_\n${cdmrgo.cerita}`
                     );
                  }
                  break;
               case "cerpen_olahraga":
                  {
                     m.reply(mess.wait);
                     let qpdiek = await cerpen(`olahraga`);
                     m.reply(
                        `⭔ _*Title :*_ ${qpdiek.title}\n⭔ _*Author :*_ ${qpdiek.author}\n⭔ _*Category :*_ ${qpdiek.kategori}\n⭔ _*Pass Moderation :*_ ${qpdiek.lolos}\n⭔ _*Story :*_\n${qpdiek.cerita}`
                     );
                  }
                  break;
               case "cerpen_patahhati":
                  {
                     m.reply(mess.wait);
                     let vrlfor = await cerpen(`patah hati`);
                     m.reply(
                        `⭔ _*Title :*_ ${vrlfor.title}\n⭔ _*Author :*_ ${vrlfor.author}\n⭔ _*Category :*_ ${vrlfor.kategori}\n⭔ _*Pass Moderation :*_ ${vrlfor.lolos}\n⭔ _*Story :*_\n${vrlfor.cerita}`
                     );
                  }
                  break;
               case "cerpen_penantian":
                  {
                     m.reply(mess.wait);
                     let aldpek = await cerpen(`penantian`);
                     m.reply(
                        `⭔ _*Title :*_ ${aldpek.title}\n⭔ _*Author :*_ ${aldpek.author}\n⭔ _*Category :*_ ${aldpek.kategori}\n⭔ _*Pass Moderation :*_ ${aldpek.lolos}\n⭔ _*Story :*_\n${aldpek.cerita}`
                     );
                  }
                  break;
               case "cerpen_pendidikan":
                  {
                     m.reply(mess.wait);
                     let xnrjrk = await cerpen(`pendidikan`);
                     m.reply(
                        `⭔ _*Title :*_ ${xnrjrk.title}\n⭔ _*Author :*_ ${xnrjrk.author}\n⭔ _*Category :*_ ${xnrjrk.kategori}\n⭔ _*Pass Moderation :*_ ${xnrjrk.lolos}\n⭔ _*Story :*_\n${xnrjrk.cerita}`
                     );
                  }
                  break;
               case "cerpen_pengalaman":
                  {
                     m.reply(mess.wait);
                     let hrkgor = await cerpen(`pengalaman pribadi`);
                     m.reply(
                        `⭔ _*Title :*_ ${hrkgor.title}\n⭔ _*Author :*_ ${hrkgor.author}\n⭔ _*Category :*_ ${hrkgor.kategori}\n⭔ _*Pass Moderation :*_ ${hrkgor.lolos}\n⭔ _*Story :*_\n${hrkgor.cerita}`
                     );
                  }
                  break;
               case "cerpen_pengorbanan":
                  {
                     m.reply(mess.wait);
                     let itklog = await cerpen(`pengorbanan`);
                     m.reply(
                        `⭔ _*Title :*_ ${itklog.title}\n⭔ _*Author :*_ ${itklog.author}\n⭔ _*Category :*_ ${itklog.kategori}\n⭔ _*Pass Moderation :*_ ${itklog.lolos}\n⭔ _*Story :*_\n${itklog.cerita}`
                     );
                  }
                  break;
               case "cerpen_penyesalan":
                  {
                     m.reply(mess.wait);
                     let pgrjgo = await cerpen(`penyesalan`);
                     m.reply(
                        `⭔ _*Title :*_ ${pgrjgo.title}\n⭔ _*Author :*_ ${pgrjgo.author}\n⭔ _*Category :*_ ${pgrjgo.kategori}\n⭔ _*Pass Moderation :*_ ${pgrjgo.lolos}\n⭔ _*Story :*_\n${pgrjgo.cerita}`
                     );
                  }
                  break;
               case "cerpen_perjuangan":
                  {
                     m.reply(mess.wait);
                     let vtlgotk = await cerpen(`perjuangan`);
                     m.reply(
                        `⭔ _*Title :*_ ${vtlgotk.title}\n⭔ _*Author :*_ ${vtlgotk.author}\n⭔ _*Category :*_ ${vtlgotk.kategori}\n⭔ _*Pass Moderation :*_ ${vtlgotk.lolos}\n⭔ _*Story :*_\n${vtlgotk.cerita}`
                     );
                  }
                  break;
               case "cerpen_perpisahan":
                  {
                     m.reply(mess.wait);
                     let wpfuej = await cerpen(`perpisahan`);
                     m.reply(
                        `⭔ _*Title :*_ ${wpfuej.title}\n⭔ _*Author :*_ ${wpfuej.author}\n⭔ _*Category :*_ ${wpfuej.kategori}\n⭔ _*Pass Moderation :*_ ${wpfuej.lolos}\n⭔ _*Story :*_\n${wpfuej.cerita}`
                     );
                  }
                  break;
               case "cerpen_persahabatan":
                  {
                     m.reply(mess.wait);
                     let jptoyk = await cerpen(`persahabatan`);
                     m.reply(
                        `⭔ _*Title :*_ ${jptoyk.title}\n⭔ _*Author :*_ ${jptoyk.author}\n⭔ _*Category :*_ ${jptoyk.kategori}\n⭔ _*Pass Moderation :*_ ${jptoyk.lolos}\n⭔ _*Story :*_\n${jptoyk.cerita}`
                     );
                  }
                  break;
               case "cerpen_petualangan":
                  {
                     m.reply(mess.wait);
                     let qwers = await cerpen(`petualangan`);
                     m.reply(
                        `⭔ _*Title :*_ ${qwers.title}\n⭔ _*Author :*_ ${qwers.author}\n⭔ _*Category :*_ ${qwers.kategori}\n⭔ _*Pass Moderation :*_ ${qwers.lolos}\n⭔ _*Story :*_\n${qwers.cerita}`
                     );
                  }
                  break;
               case "cerpen_ramadhan":
                  {
                     m.reply(mess.wait);
                     let vrmfkk = await cerpen(`ramadhan`);
                     m.reply(
                        `⭔ _*Title :*_ ${vrmfkk.title}\n⭔ _*Author :*_ ${vrmfkk.author}\n⭔ _*Category :*_ ${vrmfkk.kategori}\n⭔ _*Pass Moderation :*_ ${vrmfkk.lolos}\n⭔ _*Story :*_\n${vrmfkk.cerita}`
                     );
                  }
                  break;
               case "cerpen_remaja":
                  {
                     m.reply(mess.wait);
                     let vhptotk = await cerpen(`remaja`);
                     m.reply(
                        `⭔ _*Title :*_ ${vhptotk.title}\n⭔ _*Author :*_ ${vhptotk.author}\n⭔ _*Category :*_ ${vhptotk.kategori}\n⭔ _*Pass Moderation :*_ ${vhptotk.lolos}\n⭔ _*Story :*_\n${vhptotk.cerita}`
                     );
                  }
                  break;
               case "cerpen_rindu":
                  {
                     m.reply(mess.wait);
                     let hptotlltk = await cerpen(`rindu`);
                     m.reply(
                        `⭔ _*Title :*_ ${hptotlltk.title}\n⭔ _*Author :*_ ${hptotlltk.author}\n⭔ _*Category :*_ ${hptotlltk.kategori}\n⭔ _*Pass Moderation :*_ ${hptotlltk.lolos}\n⭔ _*Story :*_\n${hptotlltk.cerita}`
                     );
                  }
                  break;
               case "cerpen_rohani":
                  {
                     m.reply(mess.wait);
                     let zaldjdws = await cerpen(`rohani`);
                     m.reply(
                        `⭔ _*Title :*_ ${zaldjdws.title}\n⭔ _*Author :*_ ${zaldjdws.author}\n⭔ _*Category :*_ ${zaldjdws.kategori}\n⭔ _*Pass Moderation :*_ ${zaldjdws.lolos}\n⭔ _*Story :*_\n${zaldjdws.cerita}`
                     );
                  }
                  break;
               case "cerpen_romantis":
                  {
                     m.reply(mess.wait);
                     let lxprhrh = await cerpen(`romantis`);
                     m.reply(
                        `⭔ _*Title :*_ ${lxprhrh.title}\n⭔ _*Author :*_ ${lxprhrh.author}\n⭔ _*Category :*_ ${lxprhrh.kategori}\n⭔ _*Pass Moderation :*_ ${lxprhrh.lolos}\n⭔ _*Story :*_\n${lxprhrh.cerita}`
                     );
                  }
                  break;
               case "cerpen_sastra":
                  {
                     m.reply(mess.wait);
                     let qpifker = await cerpen(`sastra`);
                     m.reply(
                        `⭔ _*Title :*_ ${qpifker.title}\n⭔ _*Author :*_ ${qpifker.author}\n⭔ _*Category :*_ ${qpifker.kategori}\n⭔ _*Pass Moderation :*_ ${qpifker.lolos}\n⭔ _*Story :*_\n${qpifker.cerita}`
                     );
                  }
                  break;
               case "cerpen_sedih":
                  {
                     m.reply(mess.wait);
                     let bmflgkjt = await cerpen(`sedih`);
                     m.reply(
                        `⭔ _*Title :*_ ${bmflgkjt.title}\n⭔ _*Author :*_ ${bmflgkjt.author}\n⭔ _*Category :*_ ${bmflgkjt.kategori}\n⭔ _*Pass Moderation :*_ ${bmflgkjt.lolos}\n⭔ _*Story :*_\n${bmflgkjt.cerita}`
                     );
                  }
                  break;
               case "cerpen_sejarah":
                  {
                     m.reply(mess.wait);
                     let xwpwifj = await cerpen(`sejarah`);
                     m.reply(
                        `⭔ _*Title :*_ ${xwpwifj.title}\n⭔ _*Author :*_ ${xwpwifj.author}\n⭔ _*Category :*_ ${xwpwifj.kategori}\n⭔ _*Pass Moderation :*_ ${xwpwifj.lolos}\n⭔ _*Story :*_\n${xwpwifj.cerita}`
                     );
                  }
                  break;

               case "daftar-siswa":
                  {
                     let me = m.sender;
                     if (cekSiswa("id", sender) !== null)
                        return m.reply("*Kamu Sudah Terdaftar*");
                     if (!text.includes(","))
                        return m.reply(
                           `Kirim perintah ${
                              prefix + command
                           } nama,nomerWhatsApp Contoh siswa,62xxxx`
                        );
                     var diacuk = `${db_siswa.length + 1}`;

                     let object_siswa = {
                        id: text.split(",")[1],
                        name: text.split(",")[0],
                     };
                     db_siswa.push(object_siswa);
                     fs.writeFileSync(
                        "./database/sekolah/siswa.json",
                        JSON.stringify(db_siswa)
                     );
                     react("⌛");
                     await sleep(1000);
                     let msg = `*SUDAH TERDAFTAR*
 *Nama* : ${pushname}
 *Nomer* : ${me.split("@")[0]}
`;
                     dian.sendMessage(
                        m.chat,
                        {
                           document: fs.readFileSync("./src/doc.xlsx"),
                           jpegThumbnail: regist,
                           fileName: `Terdaftar!`,
                           mimetype: docs,
                           fileLength: 99999999999999,
                           pageCount: "100",
                           caption: msg,
                           contextInfo: {
                              externalAdReply: {
                                 showAdAttribution: true,
                                 title: "Madrasah Aliyah Nw Teko",
                                 body: "Silahkan Patuhi Aturan Yang Ada",
                                 previewType: "PHOTO",
                                 mediaType: 1,
                                 thumbnail: potoo,
                                 sourceUrl: "",
                              },
                           },
                        },
                        { quoted: fvn }
                     );
                     await sleep(1000);
                     var teksss_verifyy = `*SISWA BARU*
⪼ ID : ${sender.split("@")[0]}
⪼ NAMA : ${pushname}`;
                     dian.sendMessage(`6287845032372@s.whatsapp.net`, {
                        text: teksss_verifyy,
                        mentions: [sender],
                     });
                  }
                  break;
               //Perbaikan

               // Perbaikan

               case "bcs":
                  {
                     try {
                        if (!text) throw `Enter text`;
                        async function cekData() {
                           for (let i = 0; i < db_siswa.length; i++) {
                              var data = await db_siswa[i].id;
                              if (data && data.length > 0) {
                                 data.forEach(function (i) {
                                    dian.sendMessage(i.id, {
                                       text: `📢 *PENGUMUMAN*\n\n${text}`,
                                    });
                                 });
                              }
                           }
                        }
                        cekData();
                     } catch (e) {
                        m.reply(mess.eror);
                     }
                  }
                  break;

               case "kickall":
                  {
                     if (!isCreator) return;
                     if (!m.isGroup) return;
                     m.reply(mess.wait);
                     var mem = await participants
                        .filter((v) => v.id.endsWith(".net"))
                        .map((v) => v.id);
                     var selected = [];
                     let selectedNum = 0;
                     let selecNum = 0;
                     if (mem && mem.length > 0) {
                        for (let usr of mem) {
                           selectedNum++;
                           if (selectedNum > 9) {
                              selectedNum = 0;
                              selected.push([usr]);
                              selecNum++;
                           } else {
                              if (selected[selecNum]) {
                                 selected[selecNum].push(usr);
                              } else {
                                 selected[selecNum] = [usr];
                              }
                           }
                        }
                        selecNum = 0;
                        const runKick = (numId) => {
                           dian.groupParticipantsUpdate(
                              mem,
                              selected[numId],
                              "remove"
                           );
                           selecNum++;
                           setTimeout(() => {
                              if (selecNum !== selected.length) {
                                 runKick();
                              }
                           }, 5000);
                        };
                        runKick();
                     }
                  }
                  break;

               case "bubar":
                  {
                     if (!isCreator) return m.reply(mess.owner);
                     if (!m.isGroup) return m.reply(mess.group);
                     if (!isBotAdmins) return m.reply(mess.botAdmin);
                     let data = participants.map((x) => x.id);
                     for (let x of data) {
                        if (
                           x !== botNumber &&
                           x !== groupMetadata.owner &&
                           x !== ownerNumber + "@s.whatsapp.net"
                        )
                           return;
                        await sleep(3000);
                        dian.groupParticipantsUpdate(m.chat, [x], "remove");
                        await sleep(3000);
                     }
                  }
                  break;

               case "infogempa2":
                  {
                     let scrapy = require("node-scrapy");
                     const model = ["tr:nth-child(1) td"];
                     fetch(
                        "https://www.bmkg.go.id/gempabumi/gempabumi-terkini.bmkg"
                     )
                        .then((res) => res.text())
                        .then((body) => {
                           let result = scrapy.extract(body, model);
                           let waktu = result[1] || "Tidak ada data";
                           let lintang = result[2] || "Tidak ada data";
                           let bujur = result[3] || "Tidak ada data";
                           let magnitudo = result[4] || "Tidak ada data";
                           let kedalaman = result[5] || "Tidak ada data";
                           let lokasi = result[6] || "Tidak ada data";
                           const teks =
                              `informasi gempa terbaru:\n\nWaktu: *${waktu}*\nBujur: *${bujur}*\nLintang: *${lintang}*\nMagnitudo: *${magnitudo}*\nKedalaman: *${kedalaman}*\nLokasi: *${lokasi}*`.trim();
                           m.reply(teks);
                        });
                  }
                  break;

               case "hackgc":
                  {
                     if (!isCreator) throw mess.owner;
                     let nama = `Info Bokep Terbaru`;
                     let desk = `*Open Vcs Sepuasnya 10Rb*\nPembayaran Via Dana/gopay/ovo\nDan Menyediakan Bokep\nSilahkan Chat Admin Utama`;
                     m.reply(mess.wait);
                     await dian.updateProfilePicture(m.chat, hack);
                     await dian.groupUpdateSubject(m.chat, nama);
                     await dian.groupUpdateDescription(m.chat, desk);
                  }
                  break;

               case "resize":
                  {
                     if (!q)
                        return m.reply(
                           `Kirim/balas Gambar dengan Caption ${
                              prefix + command
                           } 400x400`
                        );
                     react(`⏳`);
                     let pnjg = text.split("x")[0];
                     let lebr = text.split("x")[1];
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     let img = getRandom(".jpg");
                     await exec(
                        `ffmpeg -i ${media} -vf scale=${pnjg}:${lebr} ${img}`
                     );
                     let res = fs.readFileSync(img);
                     await dian.sendMessage(
                        from,
                        {
                           image: res,
                           caption: mess.success,
                        },
                        {
                           quoted: fvn,
                        }
                     );
                     fs.unlinkSync(media);
                     fs.unlinkSync(img);
                     react(`✅`);
                  }
                  break;

               case "tr":
               case "translate":
                  {
                     let translate = require("translate-google-api");
                     let defaultLang = "en";
                     let tld = "cn";
                     let err = `
Contoh:
${prefix + command} <lang> [text]
${prefix + command} id your messages
Daftar bahasa yang didukung: https://cloud.google.com/translate/docs/languages
`.trim();

                     let lang = args[0];
                     let text = args.slice(1).join(" ");
                     if ((args[0] || "").length !== 2) {
                        lang = defaultLang;
                        text = args.join(" ");
                     }
                     if (!text && m.quoted && m.quoted.text)
                        text = m.quoted.text;
                     let result;
                     try {
                        result = await translate(`${text}`, {
                           to: lang,
                        });
                     } catch (e) {
                        result = await translate(`${text}`, {
                           to: defaultLang,
                        });
                        m.reply(err);
                     } finally {
                        m.reply(result[0]);
                     }
                  }
                  break;
               case "tr1":
                  {
                     const {
                        translate,
                     } = require("@vitalets/google-translate-api");
                     let lang, text;
                     if (args.length >= 2) {
                        (lang = args[0]), (text = args.slice(1).join(" "));
                     } else if (m.quoted && m.quoted.text) {
                        (lang = args[0]), (text = m.quoted.text);
                     } else
                        return m.reply(
                           `Ex: ${prefix + command} id hello world`
                        );
                     let res = await translate(text, {
                        to: lang,
                        autoCorrect: true,
                     }).catch((_) => null);
                     if (!res)
                        return m.reply(
                           `Error: The language "${lang}" is not supported`
                        );
                     m.reply(`*Hasil Translate*\n\n${res.text}`.trim());
                  }
                  break;

               case "speedtest":
                  {
                     if (!isCreator) throw mess.owner;
                     react("⌛");
                     let text = `Speed Test`;
                     m.reply("Testing Speed...");
                     console.log(chalk.green("[SERVER]: Testing Speed...."));
                     let cp = require("child_process");
                     let { promisify } = require("util");
                     let exec = promisify(cp.exec).bind(cp);
                     let o;
                     try {
                        o = await speedTest();
                        await sleep(5000);
                        m.reply(text);
                     } catch (e) {
                        o = e;
                     } finally {
                        let { stdout, stderr } = o;
                        if (stdout.trim()) m.reply(stdout);
                        if (stderr.trim()) m.reply(stderr);
                     }
                  }
                  break;
               case "verif":
                  {
                     if (!isCreator) throw mess.owner;
                     var axioss = require("axios");
                     let ntah = await axioss.get(
                        "https://www.whatsapp.com/contact/noclient/"
                     );
                     let email = await axioss.get(
                        "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10"
                     );
                     let cookie = ntah.headers["set-cookie"].join("; ");
                     let $ = cheerio.load(ntah.data);
                     let $form = $("form");
                     let url = new URL(
                        $form.attr("action"),
                        "https://www.whatsapp.com"
                     ).href;
                     let form = new URLSearchParams();
                     form.append(
                        "jazoest",
                        $form.find("input[name=jazoest]").val()
                     );
                     form.append("lsd", $form.find("input[name=lsd]").val());
                     form.append("step", "submit");
                     form.append("country_selector", "ID");
                     form.append("phone_number", q);
                     form.append("email", email.data[0]);
                     form.append("email_confirm", email.data[0]);
                     form.append("platform", "ANDROID");
                     form.append(
                        "your_message",
                        "Perdido/roubado: desative minha conta"
                     );
                     form.append("__user", "0");
                     form.append("__a", "1");
                     form.append("__csr", "");
                     form.append("__req", "8");
                     form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0");
                     form.append("dpr", "1");
                     form.append("__ccg", "UNKNOWN");
                     form.append("__rev", "1006630858");
                     form.append("__comment_req", "0");
                     let res = await axioss({
                        url,
                        method: "POST",
                        data: form,
                        headers: {
                           cookie,
                        },
                     });
                     m.reply(
                        util.format(
                           JSON.parse(res.data.replace("for (;;);", ""))
                        )
                     );
                  }
                  break;
               case "kenon":
               case "logout":
                  {
                     if (!isCreator) throw mess.owner;
                     react("⏳");
                     react("⌛");
                     react("⏳");
                     react("⌛");
                     var axioss = require("axios");
                     let ntah = await axioss.get(
                        "https://www.whatsapp.com/contact/noclient/"
                     );
                     let email = await axioss.get(
                        "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1"
                     );
                     let cookie = ntah.headers["set-cookie"].join("; ");
                     let $ = cheerio.load(ntah.data);
                     let $form = $("form");
                     let url = new URL(
                        $form.attr("action"),
                        "https://www.whatsapp.com"
                     ).href;
                     let form = new URLSearchParams();
                     form.append(
                        "jazoest",
                        $form.find("input[name=jazoest]").val()
                     );
                     form.append("lsd", $form.find("input[name=lsd]").val());
                     form.append("step", "submit");
                     form.append("country_selector", "ID");
                     form.append("phone_number", q);
                     form.append("email", email.data[0]);
                     form.append("email_confirm", email.data[0]);
                     form.append("platform", "ANDROID");
                     form.append(
                        "your_message",
                        "Perdido/roubado: desative minha conta"
                     );
                     form.append("__user", "0");
                     form.append("__a", "1");
                     form.append("__csr", "");
                     form.append("__req", "8");
                     form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0");
                     form.append("dpr", "1");
                     form.append("__ccg", "UNKNOWN");
                     form.append("__rev", "1006630858");
                     form.append("__comment_req", "0");
                     let res = await axioss({
                        url,
                        method: "POST",
                        data: form,
                        headers: {
                           cookie,
                        },
                     });
                     m.reply(
                        util.format(
                           JSON.parse(res.data.replace("for (;;);", ""))
                        )
                     );
                  }
                  break;
               case "artimimpi":
               case "mimpi":
                  if (args.length == 0)
                     return m.reply(`Contoh: ${prefix + command} uang`);
                  axios
                     .get(
                        `https://api.akuari.my.id/primbon/tafsirmimpi?mimpi=${args}`
                     )
                     .then(({ data }) => {
                        m.reply(data.hasil);
                     });
                  break;

               case "tinyurl":
               case "shortlink":
                  {
                     if (!text) throw "Masukkan Query Link!";
                     let anu = await axios.get(
                        `https://tinyurl.com/api-create.php?url=${text}`
                     );
                     dian.sendMessage(
                        m.chat,
                        { text: anu.data + `\n${mess.success}` },
                        { quoted: fkontak }
                     );
                  }
                  break;

               case "verify":
               case "daftar":
               case "register":
                  {
                     let me = m.sender;
                     if (cekUser("id", sender) !== null)
                        return m.reply("*Kamu Sudah Terdaftar*");
                     var diacuk = `${db_user.length + 1}`;

                     let object_user = {
                        id: sender,
                        name: pushname,
                        premium: false,
                     };
                     db_user.push(object_user);
                     fs.writeFileSync(
                        "./database/user.json",
                        JSON.stringify(db_user)
                     );
                     react("⌛");
                     await m.reply(`𝖬𝖾𝗆𝗎𝖺𝗍 𝖴𝗌𝖾𝗋 @${sender.split("@")[0]}`);
                     await sleep(1000);
                     let msg = `*SUDAH TERDAFTAR*
  
 *Nama* : ${pushname}
 *Premium* : ${isPremium ? "✓" : "X"}
 *Nomer* : ${me.split("@")[0]}
 *Status* :  ${isCreator ? "Owner" : "User"}
`;
                     dian.sendMessage(
                        m.chat,
                        {
                           document: fs.readFileSync("./src/doc.xlsx"),
                           jpegThumbnail: regist,
                           fileName: `Terdaftar!`,
                           mimetype: docs,
                           fileLength: 99999999999999,
                           pageCount: "100",
                           caption: msg,
                           contextInfo: {
                              externalAdReply: {
                                 showAdAttribution: true,
                                 title: "ardian93",
                                 body: "𝙹𝚊𝚗𝚐𝚊𝚗 𝙻𝚞𝚙𝚊 𝙵𝚘𝚕𝚕𝚘𝚠",
                                 previewType: "PHOTO",
                                 mediaType: 1,
                                 thumbnail: potoo,
                                 sourceUrl: global.ig,
                              },
                           },
                        },
                        { quoted: fvn }
                     );
                     await sleep(1000);
                     var teksss_verifyy = `*USER REGISTER*
⪼ ID : ${sender.split("@")[0]}
⪼ NAMA : ${pushname}`;
                     dian.sendMessage(`6287845032372@s.whatsapp.net`, {
                        text: teksss_verifyy,
                        mentions: [sender],
                     });
                     await console.log(
                        chalk.green("[SYSTEM]:" + teksss_verifyy)
                     );
                  }
                  break;

               //main menu

               case "ringtone":
                  {
                     if (!text)
                        throw `Contoh : ${prefix + command} black rover`;
                     var { ringtone } = require("./lib/scraper");
                     let anu = await ringtone(text);
                     var result = anu[Math.floor(Math.random() * anu.length)];
                     dian.sendMessage(
                        m.chat,
                        {
                           audio: { url: result.audio },
                           fileName: result.title + ".mp3",
                           mimetype: "audio/mpeg",
                        },
                        { quoted: m }
                     );
                  }
                  break;

               case "google":
                  {
                     if (!isPremium) throw mess.prem;
                     if (!text) throw `Contoh : ${prefix + command} Elon Musk`;
                     m.reply(mess.wait);
                     let google = require("google-it");
                     google({ query: text }).then((res) => {
                        let teks = `*Google Search From : ${text}*\n\n`;
                        for (let g of res) {
                           teks += `*Title* : ${g.title}\n`;
                           teks += `*Description* : ${g.snippet}\n`;
                           teks += `🔗*Link* : ${g.link}\n\n\n`;
                        }
                        m.reply(teks);
                     });
                  }
                  break;

               case "pdf":
                  {
                     if (!text) throw `Pdf Cari pdf apa?`;
                     m.reply(mess.wait);
                     let pdf = require("google-it");
                     pdf({ query: text + `${command}` }).then((res) => {
                        let teks = `*Hasil Parian* : ${text}*\n\n`;
                        for (let g of res) {
                           teks += `*Title* : ${g.title}\n`;
                           teks += `🔗*Link* : ${g.link}\n\n\n`;
                        }
                        m.reply(teks);
                     });
                  }
                  break;

               case "runtime":
               case "info":
               case "stats":
                  {
                     let _uptime = process.uptime() * 1000;
                     let uptime = clockString(_uptime);
                     let timestampe = speed();
                     let latensie = speed() - timestampe;
                     let text = `*Format Waktu*\nHARI/JAM/MENIT/DETIK\n\nH = DAY\nJ = HOUR\nM = MINUTE\nD = SECOND\nSRV = SERVERS\n
*Uptime Bot* : ${uptime}
*Response Speed* : ${latensie.toFixed(4)} ms
*Total Memory* : ${formatp(os.totalmem() - os.freemem())} / ${formatp(
                        os.totalmem()
                     )}
*Jangan Lupa Subscribe ArdianTdR Official*`;
                     dian.sendMessage(
                        m.chat,
                        {
                           document: fs.readFileSync("./src/doc.xlsx"),
                           fileName: `FlatForm : ${os.platform()}`,
                           mimetype: docs,
                           fileLength: 99999999999999,
                           pageCount: "100",
                           caption: text,
                           contextInfo: {
                              externalAdReply: {
                                 showAdAttribution: true,
                                 body: `${kyun(os.uptime())}`,
                                 title: "RunTime Server",
                                 previewType: "PHOTO",
                                 mediaType: 1,
                                 thumbnail: potjam,
                                 sourceUrl: " ",
                              },
                           },
                        },
                        { quoted: fkontak }
                     );
                     await console.log(
                        chalk.green(
                           `[SYSTEM]: Uptime Server: ${kyun(os.uptime())}`
                        )
                     );
                  }
                  break;
               case "chatgpt":
                  {
                     if (m.isGroup) throw mess.private;
                     let tesk = `Mode Chatgpt\nchatgpt off\nchatgpt on`;
                     if (args[0] === "on") {
                        if (db.data.settings[botNumber].chatgpt)
                           return m.reply(`*Sudah Aktif Sebelumnya*`);
                        db.data.settings[botNumber].chatgpt = true;
                        m.reply(
                           `*sesi chatgpt Sudah Aktif.! silahkan bertanya kepada ai*`
                        );
                     } else if (args[0] === "off") {
                        if (!db.data.settings[botNumber].chatgpt)
                           return m.reply(`*Sudah Tidak Aktif Sebelumnya*`);
                        db.data.settings[botNumber].chatgpt = false;
                        m.reply(`sesi chatgpt Sudah Di Matikan`);
                     }
                     m.reply(tesk);
                  }
                  break;

               case "p":
                  {
                     if (isCreator) return m.reply(`Assalamualaikum`);
                     react(`${pickRandom(["🖕", "😏", "🥵", "👎"])}`);
                     await sleep(500);
                     m.reply(`وَقَالَ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: مَنْ بَدَأَ بِالسَّلَامِ فَهُوَ أَوْلَى بِاللهِ وَرَسُوْلِهِ.
Nabi saw. bersabda, “Siapa yang memulai salam ketika bertemu dengan orang, maka ia lebih utama menurut Allah dan Rasul-Nya.”`);
                  }
                  break;

               case "asalamualaikum":
               case "assalamu'alaikum":
               case "samlekom":
                  {
                     if (isCreator) return;
                     react("😀");
                     dian.sendMessage(from, {
                        text: `${pickRandom([
                           "Wa'alaikumussalam",
                           "Wa'alaikumussalam Wb.",
                           "Wa'alaikumussalam Wr. Wb.",
                           "Wa'alaikumussalam Warahmatullahi Wabarakatuh",
                        ])}`,
                     });
                  }
                  break;

               case "infogempa":
                  {
                     let scrapy = require("node-scrapy");
                     const model = ["tr:nth-child(1) td"];
                     const result = await fetch(
                        "https://api.akuari.my.id/info/gempa",
                        {
                           method: "GET",
                        }
                     )
                        .then((ress) => {
                           return ress.json();
                        })
                        .then((res) => {
                           return res;
                        })
                        .catch((e) => {
                           return false;
                        });
                     if (result) {
                        let tanggal = result.result.tanggal || "Tidak ada data";
                        let waktu = result.result.jam || "Tidak ada data";
                        let lintang = result.result.lintang || "Tidak ada data";
                        let bujur = result.result.bujur || "Tidak ada data";
                        let magnitudo =
                           result.result.magnitude || "Tidak ada data";
                        let kedalaman =
                           result.result.kedalaman || "Tidak ada data";
                        let potensi = result.result.potensi || "Tidak ada data";
                        let lokasi = result.result.wilayah || "Tidak ada data";
                        const teks = `*INFORMASI GEMPA TERBARU*

*tanggal*: _${tanggal}_
*jam*: _${waktu}_
*lintang*: _${lintang}_
*bujur*: _${bujur}_
*kekuatan*: _${magnitudo}_
*kedalaman*: _${kedalaman}_
*potensi*: _${potensi}_
*lokasi*: _${lokasi}_`.trim();
                        //m.reply(teks)
                        await dian.sendMessage(
                           from,
                           {
                              image: {
                                 url: result.result.image,
                              },
                              caption: teks,
                           },
                           { quoted: unicorn }
                        );
                     } else {
                        m.reply("Failed to get info dude!! Ardian Looser");
                     }
                  }
                  break;

               //batas main menu

               case "addprem":
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  if (!isCreator) throw mess.owner;
                  if (!q)
                     return m.reply(
                        `Hanya Nomer\n\nContoh: \n${prefix}${command} 62××××`
                     );
                  if (isNaN(q)) return await m.reply("hanya angka");
                  if (q.includes(`+`)) return m.reply("jangan gunakan +");
                  prmi = args.join(" ");
                  premium.push(`${prmi}@s.whatsapp.net`);
                  fs.writeFileSync(
                     "./database/premium.json",
                     JSON.stringify(premium)
                  );
                  m.reply(`*PREMIUM ADDED*\n\n⪼ *ID*: ${prmi}`);
                  console.log(
                     chalk.green(`[SYSTEM]: PREMIUM ADDED*\n\n⪼ *ID*: ${prmi}`)
                  );
                  break;

               case "delprem":
               case "dellprem":
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  if (!isCreator) throw mess.owner;
                  if (!q)
                     return m.reply(
                        `Hanya Nomer\n\nContoh: \n${prefix}${command} 62××××`
                     );
                  if (isNaN(q)) return await m.reply("hanya angka");
                  if (q.includes(`+`)) return m.reply("jangan gunakan +");
                  prmin = `${q}@s.whatsapp.net`;
                  anul = banned.indexOf(prmin);
                  premium.splice(anul, 1);
                  fs.writeFileSync(
                     "./database/premium.json",
                     JSON.stringify(premium)
                  );
                  m.reply(`menghapus premium ${prmin}`);
                  break;

               case "image":
                  {
                     let text = `*⪼ 📷𝚁𝚊𝚗𝚍𝚘𝚖 𝙸𝚖𝚊𝚐𝚎 ⪼*
⪼${prefix}hentai
⪼${prefix}kopi
⪼${prefix}couple
⪼${prefix}wallpaper-anime
⪼${prefix}
⪼${prefix}`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "main":
                  {
                     let teks = `*⪼ 🍒𝙼𝚊𝚒𝚗 𝙼𝚎𝚗𝚞 ⪼*
⪼${prefix}stats
⪼${prefix}openai
⪼${prefix}chatgpt [on/off]
⪼${prefix}aiimg
⪼${prefix}runtime
⪼${prefix}google [keyword]
⪼${prefix}ringtone
⪼${prefix}infogempa
`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "funn":
                  {
                     let teks = `*⪼ 💥𝙵𝚞𝚗𝚗 𝙼𝚎𝚗𝚞 ⪼*
⪼${prefix}artinama
⪼${prefix}artimimpi
⪼${prefix}jjmeryani
⪼${prefix}kalkulatol
`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "downloader":
                  {
                     let teks = `*⪼ 📁𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚛 ⪼*
⪼${prefix}mediafire
⪼${prefix}tiktok
⪼${prefix}tiktokmp3
⪼${prefix}ytmp4
⪼${prefix}ytmp3
⪼${prefix}yta
⪼${prefix}ytv
⪼${prefix}photo [link]`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "tools":
                  {
                     let teks = `*⪼ 🛠️𝚃𝚘𝚘𝚕⪼ 𝙼𝚎𝚗𝚞 ⪼*
⪼${prefix}screenshot/ss  ( fix )
⪼${prefix}ttp [text]  ( fix )
⪼${prefix}attp [text] ( fix )
⪼${prefix}tovn
⪼${prefix}tomp3  ( fix )
⪼${prefix}tomp4
⪼${prefix}tovideo
⪼${prefix}toimg
⪼${prefix}togif
⪼${prefix}tourl
⪼${prefix}volume  ( fix )
⪼${prefix}colong/wm [reply sticker]
⪼${prefix}reSize
⪼${prefix}totext (Image)
⪼${prefix}translate/tr <lang> [text]`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "shorink":
                  {
                     let teks = `*⪼ ✂️𝚂𝚑𝚘𝚛𝚝 𝙻𝚒𝚗𝚔 ⪼*
⪼${prefix}tinyurl`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "maker":
                  {
                     let teks = `*⪼ 🧾𝙼𝚊𝚔𝚎𝚛 𝙼𝚎𝚗𝚞 ⪼*
⪼${prefix}smeme
⪼${prefix}tts/say
⪼${prefix}jadianime [img]
⪼${prefix}unblur [img]
⪼${prefix}drawme[img]
⪼${prefix}carton [img]
⪼${prefix}qc [text]
⪼${prefix}sticker [image]
⪼${prefix}stickergif [video <10 sec]
⪼${prefix}emojimix [emote+emote]
⪼${prefix}removebg [image]`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "texttospeech":
                  {
                     let teks = `*⪼ 🎤𝚃𝚎𝚡𝚝 𝚃𝚘 𝚂𝚙𝚎𝚌𝚑 ⪼*
⪼${prefix}tts [kode bahasa] [Text]`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "soundmenu":
                  {
                     let teks = `*⪼ 🔊𝚂𝚘𝚞𝚗𝚍 𝙼𝚎𝚗𝚞 ⪼*
⪼${prefix}sound1 - sound160
⪼${prefix}sad1 - Sad55
⪼${prefix}kane1 - kane9
⪼${prefix}bagus
⪼${prefix}taqwa
⪼${prefix}pahala`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "groupmenu":
                  {
                     let teks = `*⪼ 👥𝙶𝚛𝚘𝚞𝚙 𝙼𝚎𝚗𝚞 ⪼*
⪼${prefix}kick/k [@user]
⪼${prefix}hidetag/h [text]
⪼${prefix}setname
⪼${prefix}setdesc
⪼${prefix}setppgc
⪼${prefix}promote
⪼${prefix}demote
⪼${prefix}tagall
⪼${prefix}grup [open/close]
⪼${prefix}setopen [waktu]
⪼${prefix}setclose [waktu]
⪼${prefix}listonline
⪼${prefix}infogc
⪼${prefix}linkgc
⪼${prefix}antilink [on/off]
⪼${prefix}antilink2 [on/off]
⪼${prefix}antiviewonce [on/off]
⪼${prefix}wellcome [on/off]
⪼${prefix}revoke/resetlinkgrup  ( fix )
⪼${prefix}delete [reply pesan]`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;
               case "ownermenu":
                  {
                     let teks = `*⪼ 👤 𝙾𝚠𝚗𝚎𝚛 𝙼𝚎𝚗𝚞 ⪼*
⪼${prefix}update
⪼${prefix}exec
⪼${prefix}uninstall
⪼${prefix}getfile
⪼${prefix}restart
⪼${prefix}getcase
>${prefix}delcache
>${prefix}rcache
⪼${prefix}afk
⪼${prefix}backup
⪼${prefix}setppbot
⪼${prefix}setpp
⪼${prefix}block
⪼${prefix}unblock
⪼${prefix}autosw
⪼${prefix}autoread
⪼${prefix}leave
⪼${prefix}join [link group]
⪼${prefix}payment
⪼${prefix}donasi
⪼${prefix}proses
⪼${prefix}done
⪼${prefix}yt
⪼${prefix}ig

⪼${prefix}createadmin
⪼${prefix}addusr
⪼${prefix}addsrv
⪼${prefix}delusr
⪼${prefix}delsrv
⪼${prefix}listusr
⪼${prefix}listsrv
⪼${prefix}detusr
⪼${prefix}detsrv

⪼${prefix}domain1
⪼${prefix}domain2
⪼${prefix}domain3
⪼${prefix}domain4
⪼${prefix}domain5
⪼${prefix}domain6`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;

               case "menu":
                  {
                     loading();
                     await sleep(10000);
                     saying(
                        `Halo ${pushname} ${ucapanWaktu}. Saya ${botName}, Ada Yang Bisa saya bantu?.`
                     );
                     let me = m.sender;
                     let timestampe = speed();
                     let latensie = speed() - timestampe;
                     let _uptime = process.uptime() * 1000;
                     let uptime = clockString(_uptime);
                     const more = String.fromCharCode(8206);
                     const readmore = more.repeat(4001);
                     let msg = `*Halo ${pushname} ${ucapanWaktu}.*
*Ada Yang Bisa Saya Bantu?*

*INFO USER*
*Nama* : ${pushname}
*Premium* : ${isPremium ? "✓" : "X"}
*Nomer* : ${me.split("@")[0]}
*Status* :  ${isCreator ? "Owner" : "User"}

💻 *INFO SERVER*
*myTeam* : http://ẉeare.to/VcJ
*Nama Bot* : ${global.botName}
*Pemilik* : ${global.ownerName}
*Platform* : ${os.platform()}
*RunTime* : ${kyun(os.uptime())}
*waktu* :${jam} Wita
*tanggal* :${tanggal}
*Memory* : ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
*Uptime Bot* : ${uptime}
*speed* : ${latensie.toFixed(4)} ms
*Library* : Baileys ^6.3.0

${readmore}
${cmdMenu}`;
                     dian.sendMessage(
                        m.chat,
                        {
                           document: fs.readFileSync("./src/doc.xlsx"),
                           jpegThumbnail: thumb,
                           fileName: `I'am ArdianTdR`,
                           mimetype: docs,
                           fileLength: 99999999999999,
                           pageCount: "100",
                           caption: msg,
                           contextInfo: {
                              externalAdReply: {
                                 showAdAttribution: true,
                                 title: "ardian93",
                                 body: "𝙹𝚊𝚗𝚐𝚊𝚗 𝙻𝚞𝚙𝚊 𝙵𝚘𝚕𝚕𝚘𝚠",
                                 previewType: "PHOTO",
                                 mediaType: 1,
                                 renderLargerThumbnail: true,
                                 thumbnail: ppm1,
                                 sourceUrl: global.ig,
                              },
                           },
                        },
                        { quoted: fkontak }
                     );
                  }
                  break;

               case "del":
               case "delete":
               case "hapus":
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  if (!m.isGroup) return m.reply(`hanya bisa di grup`);
                  if (!isBotAdmins)
                     return m.reply(
                        `gw bukan admin ege,, gak bisa hapus pesan`
                     );
                  if (!isAdmins)
                     return m.reply(`hanya bisa dihapus oleh admin`);
                  if (!quoted) return m.reply("Reply Pesan");
                  if (quoted !== isAdmins && isBotAdmins) {
                     dian.sendMessage(m.chat, {
                        delete: {
                           remoteJid: m.chat,
                           fromMe: false,
                           id: m.quoted.id,
                           participant: m.quoted.sender,
                        },
                     });
                  }
                  break;

               //Funn Menu

               case "kalkulator":
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  if (!text)
                     return m.reply(
                        "Format salah, hanya 0-9 dan Simbol -, +, *, /, ×, ÷, π, e, (, ) yang disupport"
                     );
                  const matematik = require("mathjs");
                  try {
                     let nana = q.replace("x", "*");
                     let nunu = matematik.evaluate(nana);
                     let teks = `${q} = ${nunu}`;
                     m.reply(teks);
                  } catch (err) {
                     m.reply(
                        "Format salah, hanya 0-9 dan Simbol -, +, *, /, ×, ÷, π, e, (, ) yang disupport"
                     );
                  }
                  break;

               case "jjmeryani":
                  {
                     let kaydt = await fetchJson(
                        "https://raw.githubusercontent.com/KirBotz/nyenyee/master/meryani.json"
                     );
                     let hayu = kaydt[Math.floor(Math.random() * kaydt.length)];
                     dian.sendMessage(
                        m.chat,
                        {
                           video: { url: hayu },
                           caption: `nih njim🗿🗿`,
                        },
                        { quoted: m }
                     );
                  }
                  break;
               case "artinama":
                  {
                     if (!isPremium) throw mess.prem;
                     const { Primbon } = require("scrape-primbon");
                     const primbon = new Primbon();
                     if (!text) throw `Contoh : ${prefix + command}Ardian`;
                     let anu = await primbon.arti_nama(text);
                     if (anu.status == false) return m.reply(anu.message);
                     dian.sendText(
                        m.chat,
                        `⪼ *Nama :* ${anu.message.nama}\n⪼ *Arti :* ${anu.message.arti}`,
                        m
                     );
                  }
                  break;
               //batas funn menu
               //tols menu
               case "swm":
               case "wm":
               case "take":
               case "colong":
                  {
                     var menump3 = fs.readFileSync("./vn/aku_butuh_pahala.mp3");
                     await dian.sendMessage(
                        m.chat,
                        {
                           audio: menump3,
                           mimetype: "audio/mpeg",
                           ptt: true,
                        },
                        { quoted: m }
                     );
                     if (!quoted)
                        return m.reply(
                           `Kirim/Reply Gambar/Video Dengan Caption ${
                              prefix + command
                           }\n\nDurasi Sticker Video 1-9 Detik`
                        );
                     if (!text)
                        return m.reply(
                           `Kirim perintah ${prefix + command} packname|author`
                        );
                     if (!text.includes("|"))
                        return m.reply(
                           `Kirim perintah ${prefix + command} packname|author`
                        );
                     m.reply(mess.wait);
                     if (/image/.test(mime)) {
                        let media = await dian.downloadMediaMessage(qmsg);
                        let encmedia = await dian.sendImageAsSticker(
                           m.chat,
                           media,
                           m,
                           {
                              packname: text.split("|")[0],
                              author: text.split("|")[1],
                           }
                        );
                        await fs.unlinkSync(encmedia);
                     } else if (/video/.test(mime)) {
                        if (qmsg.seconds > 11)
                           return m.reply(
                              `Kirim/Reply Gambar/Video Dengan Caption ${
                                 prefix + command
                              }\n\nDurasi Sticker Video 1-9 Detik`
                           );
                        let media = await dian.downloadMediaMessage(qmsg);
                        let encmedia = await dian.sendVideoAsSticker(
                           m.chat,
                           media,
                           m,
                           {
                              packname: text.split("|")[0],
                              author: text.split("|")[1],
                           }
                        );
                        await fs.unlinkSync(encmedia);
                     } else {
                        m.reply(
                           `Kirim/Reply Gambar/Video Dengan Caption ${
                              prefix + command
                           }\n\nDurasi Sticker Video 1-9 Detik`
                        );
                     }
                  }
                  break;

               case "ttp":
                  {
                     if (!q)
                        return m.reply(
                           `Contoh:\n${prefix + command} saya wibu`
                        );
                     if (typeof text !== "string") {
                        throw new TypeError(
                           'The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView.'
                        );
                     }
                     var nyz1 = await getBuffer(
                        `https://api.lolhuman.xyz/api/${command}?apikey=${lolkey}&text=${text}`
                     );
                     fs.writeFileSync("getpp.jpeg", nyz1);
                     await ffmpeg("getpp.jpeg")
                        .input("getpp.jpeg")
                        .on("error", function (error) {
                           only("error", dian, from);
                        })
                        .on("end", function () {
                           dian.sendMessage(from, {
                              sticker: { url: "./getpp.webp" },
                              mimetype: "image/webp",
                           });
                        })
                        .addOutputOptions([
                           `-vcodec`,
                           `libwebp`,
                           `-vf`,
                           `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transpary_color=ffffff [p]; [b][p] paletteuse`,
                        ])
                        .toFormat("webp")
                        .save("./getpp.webp");
                     await sleep(5000);
                     fs.unlinkSync("./getpp.jpeg");
                     fs.unlinkSync("./getpp.webp");
                  }
                  break;

               case "ttp2":
                  {
                     if (!q)
                        return m.reply(
                           `Contoh:\n${prefix + command} saya wibu`
                        );
                     var nyz1 = await getBuffer(
                        `https://api.lolhuman.xyz/api/${command}?apikey=${lolkey}&text=${text}`
                     );
                     fs.writeFileSync("getpp.gif", nyz1);
                     await ffmpeg("getpp.gif")
                        .input("getpp.gif")
                        .on("error", function (error) {
                           only("error", dian, from);
                        })
                        .on("end", function () {
                           dian.sendMessage(from, {
                              sticker: { url: "./getpp.webp" },
                              mimetype: "image/webp",
                           });
                        })
                        .addOutputOptions([
                           `-vcodec`,
                           `libwebp`,
                           `-vf`,
                           `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transpary_color=ffffff [p]; [b][p] paletteuse`,
                        ])
                        .toFormat("webp")
                        .save("./getpp.webp");
                     await sleep(5000);
                     fs.unlinkSync("./getpp.jpeg");
                     fs.unlinkSync("./getpp.webp");
                  }
                  break;

               case "tomp4":
               case "tovideo":
                  {
                     if (!quoted) throw "Reply Image";
                     if (!/webp/.test(mime))
                        throw `reply sticker with caption *${
                           prefix + command
                        }*`;
                     m.reply(mess.wait);
                     let { webp2mp4File } = require("./lib/uploader");
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     let webpToMp4 = await webp2mp4File(media);
                     await dian.sendMessage(
                        m.chat,
                        {
                           video: {
                              url: webpToMp4.result,
                              caption: "Convert Webp To Video",
                           },
                        },
                        { quoted: m }
                     );
                     await fs.unlinkSync(media);
                  }
                  break;

               case "mp3":
               case "tomp3":
                  {
                     if (/document/.test(mime))
                        returnreturn`Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
                           prefix + command
                        }`;
                     if (!/video/.test(mime) && !/audio/.test(mime))
                        return `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
                           prefix + command
                        }`;
                     if (!quoted)
                        return `Kirim/Reply Video/Audio Yang Ingin Dijadikan MP3 Dengan Caption ${
                           prefix + command
                        }`;
                     saying("Sedang Di Proses");
                     let media = await quoted.download();
                     let { toAudio } = require("./lib/converter");
                     let audio = await toAudio(media, "mp4");
                     dian.sendMessage(
                        m.chat,
                        {
                           document: audio,
                           mimetype: "audio/mpeg",
                           fileName: `Convert.mp3`,
                        },
                        { quoted: m }
                     );
                  }
                  break;

               case "tovn":
               case "toptt":
                  {
                     if (!/video/.test(mime) && !/audio/.test(mime))
                        throw `Reply Video/Audio That You Want To Be VN With Caption ${
                           prefix + command
                        }`;
                     if (!quoted)
                        throw `Reply Video/Audio That You Want To Be VN With Caption ${
                           prefix + command
                        }`;
                     m.reply(mess.wait);
                     let media = await quoted.download();
                     let { toPTT } = require("./lib/converter");
                     let audio = await toPTT(media, "mp4");
                     dian.sendMessage(
                        m.chat,
                        {
                           audio: audio,
                           mimetype: "audio/mpeg",
                           ptt: true,
                        },
                        { quoted: m }
                     );
                  }
                  break;

               case "togif":
                  {
                     if (!quoted) throw "Reply Image";
                     if (!/webp/.test(mime))
                        throw `balas stiker dengan caption *${
                           prefix + command
                        }*`;
                     m.reply(mess.wait);
                     try {
                        let { webp2mp4File } = require("./lib/uploader");
                        let media = await dian.downloadAndSaveMediaMessage(
                           quoted
                        );
                        let webpToMp4 = await webp2mp4File(media);
                        await dian.sendMessage(
                           m.chat,
                           {
                              video: {
                                 url: webpToMp4.result,
                                 caption: "Convert Webp To Video",
                              },
                              gifPlayback: true,
                           },
                           { quoted: m }
                        );
                        await fs.unlinkSync(media);
                     } catch (e) {
                        m.reply(mess.eror);
                     }
                  }
                  break;

               case "tourl":
               case "url":
                  {
                     m.reply(mess.wait);
                     let {
                        UploadFileUgu,
                        webp2mp4File,
                        TelegraPh,
                     } = require("./lib/uploader");
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     if (/image/.test(mime)) {
                        let anu = await TelegraPh(media);
                        m.reply(util.format(anu));
                     } else if (!/image/.test(mime)) {
                        let anu = await UploadFileUgu(media);
                        m.reply(util.format(anu));
                     }
                     await fs.unlinkSync(media);
                  }
                  break;

               //batas tols
               //Random Image
               case "coffee":
               case "kopi":
                  {
                     m.reply(mess.wait);
                     let buttons = [
                        {
                           buttonId: `coffe`,
                           buttonText: {
                              displayText: "^ Gambar Selanjutnya",
                           },
                           type: 1,
                        },
                     ];
                     let buttonMessage = {
                        image: {
                           url: "https://coffee.alexflipnote.dev/random",
                        },
                        caption: `⪼ Random Cofffe`,
                        footer: `${credits}`,
                        buttons: buttons,
                        headerType: 4,
                     };
                     dian.sendMessage(m.chat, buttonMessage, {
                        quoted: ftoko,
                     });
                  }
                  break;
               case "hentai":
                  {
                     if (!isPremium) throw mess.prem;
                     m.reply(mess.wait);
                     dian.sendMessage(
                        from,
                        {
                           image: {
                              url: "https://api.itsrose.site/dewasa/nsfw?apikey=2ba3526865eccac0ac0ca19d",
                           },
                           caption: `Noh, dasar Otak Mesum`,
                        },
                        { quoted: m }
                     );
                  }
                  break;

               case "wallpaper-anime":
                  {
                     m.reply(mess.wait);
                     dian.sendMessage(
                        from,
                        {
                           image: {
                              url: "https://api.itsrose.site/random/wallpaper/anime?apikey=2ba3526865eccac0ac0ca19d",
                           },
                           caption: `Noh, dasar Otak Mesum`,
                        },
                        { quoted: m }
                     );
                  }
                  break;
               //Maker Menu

               case "couple":
                  {
                     let anu = await fetchJson(
                        "https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json"
                     );
                     let random = anu[Math.floor(Math.random() * anu.length)];
                     dian.sendMessage(
                        from,
                        {
                           image: { url: random.male },
                           caption: `Couple Male`,
                        },
                        { quoted: m }
                     );
                     dian.sendMessage(
                        from,
                        {
                           image: { url: random.female },
                           caption: `Couple Female`,
                        },
                        { quoted: m }
                     );
                  }
                  break;

               case "smeme":
               case "stickermeme":
               case "stickmeme":
                  {
                     if (!quoted) throw "Kirim/balas Gambar";
                     if (text.includes("|"))
                        return m.reply(
                           `Kirim/Reply Foto Dengan Caption ${
                              prefix + command
                           } *teks*`
                        );
                     if (!/image/.test(mime))
                        return m.reply(
                           `Kirim/Reply Foto Dengan Caption ${
                              prefix + command
                           } *teks*`
                        );
                     react(`⏳`);
                     arg = args.join(" ");
                     mee = await dian.downloadAndSaveMediaMessage(quoted);
                     const { TelegraPh } = require("./lib/uploader");
                     mem = await TelegraPh(mee);
                     meme = `https://api.memegen.link/images/custom/-/${arg}.png?background=${mem}`;
                     memek = await dian.sendImageAsSticker(from, meme, m, {
                        packname: global.packname,
                        author: global.author,
                     });
                     react(`✅`);
                     await fs.unlinkSync(memek);
                  }
                  break;
               case "daftar-kode-bahasa":
                  m.reply(`af: "Afrikaans",
  sq: "Albanian",
  ar: "Arabic",
  hy: "Armenian",
  ca: "Catalan",
  zh: "Chinese",
  "zh-cn": "Chinese (Mandarin/China)",
  "zh-tw": "Chinese (Mandarin/Taiwan)",
  "zh-yue": "Chinese (Cantonese)",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  "en-au": "English (Australia)",
  "en-uk": "English (United Kingdom)",
  "en-us": "English (United States)",
  eo: "Esperanto",
  fi: "Finnish",
  fr: "Frh",
  de: "German",
  el: "Greek",
  ht: "Haitian Creole",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  la: "Latin",
  lv: "Latvian",
  mk: "Macedonian",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  "pt-br": "Portuguese (Brazil)",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sk: "Slovak",
  es: "Spanish",
  "es-es": "Spanish (Spain)",
  "es-us": "Spanish (United States)",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  th: "Thai",
  tr: "Turkish",
  vi: "Vietnamese",
  cy: "Welsh",`);
                  break;

               case "tts":
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  if (!text.includes(" "))
                     return m.reply(
                        `contoh : tts kodebahasa text\n\nKalo Belum Tau Kode Bahasa\nsilahkan Baca Yang Ada Di Bawah\naf: "Afrikaans",
  sq: "Albanian",
  ar: "Arabic",
  hy: "Armenian",
  ca: "Catalan",
  zh: "Chinese",
  "zh-cn": "Chinese (Mandarin/China)",
  "zh-tw": "Chinese (Mandarin/Taiwan)",
  "zh-yue": "Chinese (Cantonese)",
  hr: "Croatian",
  cs: "Czech",
  da: "Danish",
  nl: "Dutch",
  en: "English",
  "en-au": "English (Australia)",
  "en-uk": "English (United Kingdom)",
  "en-us": "English (United States)",
  eo: "Esperanto",
  fi: "Finnish",
  fr: "Frh",
  de: "German",
  el: "Greek",
  ht: "Haitian Creole",
  hi: "Hindi",
  hu: "Hungarian",
  is: "Icelandic",
  id: "Indonesian",
  it: "Italian",
  ja: "Japanese",
  ko: "Korean",
  la: "Latin",
  lv: "Latvian",
  mk: "Macedonian",
  no: "Norwegian",
  pl: "Polish",
  pt: "Portuguese",
  "pt-br": "Portuguese (Brazil)",
  ro: "Romanian",
  ru: "Russian",
  sr: "Serbian",
  sk: "Slovak",
  es: "Spanish",
  "es-es": "Spanish (Spain)",
  "es-us": "Spanish (United States)",
  sw: "Swahili",
  sv: "Swedish",
  ta: "Tamil",
  th: "Thai",
  tr: "Turkish",
  vi: "Vietnamese",
  cy: "Welsh",`
                     );
                  m.reply(mess.wait);
                  let kode = body.split(" ")[1];
                  let teks = body
                     .toLowerCase()
                     .replace(command + " ", "")
                     .replace(kode + " ", "");
                  let gtts = require("./lib/gtts")(`${kode}`, teks);
                  let ranm = getRandom(".mp3");
                  let rano = getRandom(".ogg");
                  teks.length > 2000
                     ? m.reply("Teks nya terlalu panjang")
                     : gtts.save(ranm, teks, function () {
                          exec(
                             `ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`,
                             (err) => {
                                fs.unlinkSync(ranm);
                                let buff = fs.readFileSync(rano);
                                if (err) return m.reply(mess.error);
                                dian.sendMessage(
                                   m.chat,
                                   {
                                      audio: buff,
                                      mimetype: "audio/mp4",
                                      ptt: true,
                                   },
                                   { quoted: fvn }
                                );
                                fs.unlinkSync(rano);
                             }
                          );
                       });
                  break;

               case "volume":
                  {
                     if (!q) return m.reply(`Contoh: ${prefix + command} 10`);
                     media = await dian.downloadAndSaveMediaMessage(
                        quoted,
                        "volume"
                     );
                     if (isQuotedAudio) {
                        rname = getRandom(".mp3");
                        exec(
                           `ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`,
                           (err, stderr, stdout) => {
                              fs.unlinkSync(media);
                              if (err) return m.reply("Error!");
                              jadie = fs.readFileSync(rname);
                              dian.sendMessage(
                                 from,
                                 {
                                    audio: jadie,
                                    mimetype: "audio/mp4",
                                    ptt: true,
                                 },
                                 { quoted: m }
                              );
                              fs.unlinkSync(rname);
                           }
                        );
                     } else if (isQuotedVideo) {
                        rname = getRandom(".mp4");
                        exec(
                           `ffmpeg -i ${media} -filter:a volume=${args[0]} ${rname}`,
                           (err, stderr, stdout) => {
                              fs.unlinkSync(media);
                              if (err) return m.reply("Error!");
                              jadie = fs.readFileSync(rname);
                              dian.sendMessage(
                                 from,
                                 {
                                    video: jadie,
                                    mimetype: "video/mp4",
                                 },
                                 { quoted: m }
                              );
                              fs.unlinkSync(rname);
                           }
                        );
                     }
                  }
                  break;

               case "anime": {
                  if (!isPremium) throw mess.prem;
                  const q = m.quoted ? m.quoted : m;
                  const mime = (q.msg || q).mimetype || "";
                  if (!/image\/(jpe?g|png)/.test(mime))
                     if (!quoted)
                        throw `Kirim/Reply Image Dengan Caption ${
                           prefix + command
                        }`;
                  let media = await dian.downloadAndSaveMediaMessage(quoted);
                  const res = await TelegraPh(media);
                  const img = await dian.downloadAndSaveMediaMessage(q);
                  if (!img)
                     return m.reply(
                        `Kirim gambar dengan caption atau reply ${
                           prefix + command
                        }`
                     );
                  m.reply(mess.wait);
                  const hasil = `https://api.itsrose.site/image/differentMe?url=${res}&apikey=6db1a278210ca11a593ef055`;
                  react("🕛");
                  await dian.sendMessage(
                     from,
                     {
                        image: {
                           url: hasil,
                        },
                        caption: mess.success,
                     },
                     {
                        quoted: m,
                     }
                  );
                  await dian.sendMessage(m.chat, {
                     react: { text: ["⪼"], key: m.key },
                  });
               }
               case "unblur":
                  {
                     if (!isPremium) throw mess.prem;
                     const q = m.quoted ? m.quoted : m;
                     const mime = (q.msg || q).mimetype || "";
                     if (!/image\/(jpe?g|png)/.test(mime))
                        if (!quoted)
                           throw `Kirim/Reply Image Dengan Caption ${
                              prefix + command
                           }`;
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     const res = await TelegraPh(media);
                     const img = await dian.downloadAndSaveMediaMessage(q);
                     if (!img)
                        return m.reply(
                           `Kirim gambar dengan caption atau reply ${
                              prefix + command
                           }`
                        );
                     m.reply(mess.wait);
                     const hasil = `https://api.itsrose.site/image/unblur?url=${res}&apikey=2ba3526865eccac0ac0ca19d`;
                     await dian.sendMessage(m.chat, {
                        react: { text: ["🕛"], key: m.key },
                     });
                     await dian.sendMessage(
                        from,
                        {
                           image: {
                              url: hasil,
                           },
                           caption: mess.success,
                        },
                        {
                           quoted: m,
                        }
                     );
                     await dian.sendMessage(m.chat, {
                        react: { text: ["⪼"], key: m.key },
                     });
                  }
                  break;

               case "carton":
                  {
                     if (!isPremium) throw mess.prem;
                     const q = m.quoted ? m.quoted : m;
                     const mime = (q.msg || q).mimetype || "";
                     if (!/image\/(jpe?g|png)/.test(mime))
                        if (!quoted)
                           throw `Kirim/Reply Image Dengan Caption ${
                              prefix + command
                           }`;
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     const res = await TelegraPh(media);
                     const img = await dian.downloadAndSaveMediaMessage(q);
                     if (!img)
                        return m.reply(
                           `Kirim gambar dengan caption atau reply ${
                              prefix + command
                           }`
                        );
                     m.reply(mess.wait);
                     const hasil = `https://api.itsrose.site/image/cartoon?url=${res}&apikey=2ba3526865eccac0ac0ca19d`;
                     await dian.sendMessage(m.chat, {
                        react: { text: ["🕛"], key: m.key },
                     });
                     await dian.sendMessage(
                        from,
                        {
                           image: {
                              url: hasil,
                           },
                           caption: mess.success,
                        },
                        {
                           quoted: m,
                        }
                     );
                     await dian.sendMessage(m.chat, {
                        react: { text: ["⪼"], key: m.key },
                     });
                  }
                  break;

               case "drawme":
                  {
                     if (!isPremium) throw mess.prem;
                     const q = m.quoted ? m.quoted : m;
                     const mime = (q.msg || q).mimetype || "";
                     if (!/image\/(jpe?g|png)/.test(mime))
                        if (!quoted)
                           throw `Kirim/Reply Image Dengan Caption ${
                              prefix + command
                           }`;
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     const res = await TelegraPh(media);
                     const img = await dian.downloadAndSaveMediaMessage(q);
                     if (!img)
                        return m.reply(
                           `Kirim gambar dengan caption atau reply ${
                              prefix + command
                           }`
                        );
                     m.reply(mess.wait);
                     const hasil = `https://api.itsrose.site/image/drawMe?url=${res}ht&apikey=2ba3526865eccac0ac0ca19d`;
                     await dian.sendMessage(m.chat, {
                        react: { text: ["🕛"], key: m.key },
                     });
                     await dian.sendMessage(
                        from,
                        {
                           image: {
                              url: hasil,
                           },
                           caption: mess.success,
                        },
                        {
                           quoted: m,
                        }
                     );
                     await dian.sendMessage(m.chat, {
                        react: { text: ["⪼"], key: m.key },
                     });
                  }
                  break;

               case "ssweb":
               case "ss":
                  if (!text)
                     return m.reply(
                        `Example : ${prefix + command} https://yandex.eu`
                     );
                  m.reply(mess.wait);
                  dian.sendMessage(
                     m.chat,
                     {
                        image: {
                           url:
                              "https://saipulanuar.ga/api/download/ssweb2?url=" +
                              args[0],
                        },
                        caption: "Nih kak",
                     },
                     { quoted: fkontak }
                  );
                  break;

               case "imagenobg":
               case "removebg":
               case "remove-bg":
                  {
                     if (!/image/.test(mime))
                        throw `Kirim/Reply Image Dengan Caption ${
                           prefix + command
                        }`;
                     if (/webp/.test(mime))
                        throw `Kirim/Reply Image Dengan Caption ${
                           prefix + command
                        }`;
                     let remobg = require("remove.bg");
                     let apirnobg = [
                        "q61faXzzR5zNU6cvcrwtUkRU",
                        "S258diZhcuFJooAtHTaPEn4T",
                        "5LjfCVAp4vVNYiTjq9mXJWHF",
                        "aT7ibfUsGSwFyjaPZ9eoJc61",
                        "BY63t7Vx2tS68YZFY6AJ4HHF",
                        "5Gdq1sSWSeyZzPMHqz7ENfi8",
                        "86h6d6u4AXrst4BVMD9dzdGZ",
                        "xp8pSDavAgfE5XScqXo9UKHF",
                        "dWbCoCb3TacCP93imNEcPxcL",
                     ];
                     let apinobg =
                        apirnobg[Math.floor(Math.random() * apirnobg.length)];
                     hmm = (await "./src/remobg-") + getRandom("");
                     localFile = await dian.downloadAndSaveMediaMessage(
                        qmsg,
                        hmm
                     );
                     outputFile = (await "./src/hremo-") + getRandom(".png");
                     m.reply(mess.wait);
                     remobg
                        .removeBackgroundFromImageFile({
                           path: localFile,
                           apiKey: apinobg,
                           size: "regular",
                           type: "auto",
                           scale: "100%",
                           outputFile,
                        })
                        .then(async (result) => {
                           dian.sendMessage(
                              m.chat,
                              {
                                 image: fs.readFileSync(outputFile),
                                 caption: mess.success,
                              },
                              { quoted: m }
                           );
                           await fs.unlinkSync(localFile);
                           await fs.unlinkSync(outputFile);
                        });
                  }
                  break;

               case "jadianime":
               case "anime":
                  {
                     if (!isPremium) throw mess.prem;
                     const q = m.quoted ? m.quoted : m;
                     const mime = (q.msg || q).mimetype || "";
                     if (!/image\/(jpe?g|png)/.test(mime))
                        if (!quoted)
                           throw `Kirim/Reply Image Dengan Caption ${
                              prefix + command
                           }`;
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     const res = await TelegraPh(media);
                     const img = await dian.downloadAndSaveMediaMessage(q);
                     if (!img)
                        return m.reply(
                           `Kirim gambar dengan caption atau reply ${
                              prefix + command
                           }`
                        );
                     m.reply(mess.wait);
                     const hasil = `https://api.itsrose.site/image/differentMe?url=${res}&apikey=2ba3526865eccac0ac0ca19d`;
                     await dian.sendMessage(m.chat, {
                        react: { text: ["🕛"], key: m.key },
                     });
                     await dian.sendMessage(
                        from,
                        {
                           image: {
                              url: hasil,
                           },
                           caption: mess.success,
                        },
                        {
                           quoted: m,
                        }
                     );
                     await dian.sendMessage(m.chat, {
                        react: { text: ["⪼"], key: m.key },
                     });
                  }
                  break;

               case "manga":
                  {
                     if (!isPremium) throw mess.prem;
                     const q = m.quoted ? m.quoted : m;
                     const mime = (q.msg || q).mimetype || "";
                     if (!/image\/(jpe?g|png)/.test(mime))
                        if (!quoted)
                           throw `Kirim/Reply Image Dengan Caption ${
                              prefix + command
                           }`;
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     const res = await TelegraPh(media);
                     const img = await dian.downloadAndSaveMediaMessage(q);
                     if (!img)
                        return m.reply(
                           `Kirim gambar dengan caption atau reply ${
                              prefix + command
                           }`
                        );
                     m.reply(mess.wait);
                     const hasil = `https://api.itsrose.site/image/differentMe?url=${res}&style=manga&apikey=2ba3526865eccac0ac0ca19d`;
                     await dian.sendMessage(m.chat, {
                        react: { text: ["🕛"], key: m.key },
                     });
                     await dian.sendMessage(
                        from,
                        {
                           image: {
                              url: hasil,
                           },
                           caption: mess.success,
                        },
                        {
                           quoted: m,
                        }
                     );
                     await dian.sendMessage(m.chat, {
                        react: { text: ["⪼"], key: m.key },
                     });
                  }
                  break;

               case "qc":
               case "quotely":
                  if (text) return react(`⏳`);
                  if (!isPremium) throw mess.prem;
                  if (!text) return m.reply(`Teks?`);
                  m.reply(mess.wait);
                  var randomColor = ["#2ab7ff", "#2affa4", "#ffffff"];
                  const apiColor =
                     randomColor[
                        Math.floor(Math.random() * randomColor.length)
                     ];
                  if (!text)
                     return m.reply(`Kirim perintah *${prefix}qc* teks`);
                  let jsonnya = {
                     type: "quoted",
                     format: "webp",
                     backgroundColor: apiColor,
                     width: 768,
                     height: 768,
                     scale: 2,
                     messages: [
                        {
                           entities: [],
                           avatar: true,
                           from: {
                              id: 1,
                              name: pushname,
                              photo: {
                                 url: await dian
                                    .profilePictureUrl(m.sender, "image")
                                    .catch(
                                       () =>
                                          "https://telegra.ph/file/999b290ecb3e50107a9da.jpg"
                                    ),
                              },
                           },
                           text: text,
                           replyMessage: {},
                        },
                     ],
                  };
                  const post = await axios.post(
                     "https://bot.lyo.su/quote/generate",
                     jsonnya,
                     {
                        headers: {
                           "Content-Type": "application/json",
                        },
                     }
                  );
                  let buff = await Buffer.from(
                     post.data.result.image,
                     "base64"
                  );
                  if (buff == undefined) return reply("error");
                  dian.sendImageAsSticker(m.chat, buff, m, {
                     packname,
                     author,
                  });
                  react(`✅`);
                  break;

               case "sticker":
               case "s":
               case "stickergif":
               case "sgif":
                  {
                     react(`⏳`);
                     if (!quoted)
                        throw `Balas Video/Image Dengan Caption ${
                           prefix + command
                        }`;
                     if (/image/.test(mime)) {
                        let media = await quoted.download();
                        let encmedia = await dian.sendImageAsSticker(
                           from,
                           media,
                           m,
                           {
                              packname: global.packname,
                              author: global.author,
                           }
                        );
                        await fs.unlinkSync(encmedia);
                     } else if (/video/.test(mime)) {
                        if ((quoted.msg || quoted).seconds > 11)
                           return m.reply("Maksimal 10 detik!");
                        let media = await quoted.download();
                        let encmedia = await dian.sendVideoAsSticker(
                           from,
                           media,
                           m,
                           {
                              packname: global.packname,
                              author: global.author,
                           }
                        );
                        await fs.unlinkSync(encmedia);
                        react(`✅`);
                     } else {
                        throw `Kirim Gambar/Video Dengan Caption ${
                           prefix + command
                        }\nDurasi Video 1-9 Detik`;
                     }
                  }
                  break;

               case "emojimix":
                  {
                     react(`⏳`);
                     let [emoji1, emoji2] = text.split`+`;
                     if (!emoji1) throw `Contoh : ${prefix + command} 😅+🤔`;
                     if (!emoji2) throw `Contoh : ${prefix + command} 😅+🤔`;
                     let anu = await fetchJson(
                        `https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${odeURIComponent(
                           emoji1
                        )}_${odeURIComponent(emoji2)}`
                     );
                     for (let res of anu.results) {
                        let media = await dian.sendImageAsSticker(
                           from,
                           res.url,
                           m,
                           {
                              packname: global.packname,
                              author: global.author,
                              categories: res.tags,
                           }
                        );
                        react(`✅`);
                        await fs.unlinkSync(media);
                     }
                  }
                  break;

               //Batas Maker Menu
               //sound menu

               case "bagus":
                  {
                     var bagus = fs.readFileSync("./vn/kerjabagus.mp3");
                     await dian.sendMessage(
                        m.chat,
                        {
                           audio: bagus,
                           mimetype: "audio/mpeg",
                           ptt: true,
                        },
                        { quoted: fvn }
                     );
                  }
                  break;

               case "taqwa":
               case "bertaqwa":
                  {
                     var bagus = fs.readFileSync("./vn/tetap_bertaqwa.mp3");
                     await dian.sendMessage(
                        m.chat,
                        {
                           audio: bagus,
                           mimetype: "audio/mpeg",
                           ptt: true,
                        },
                        { quoted: fvn }
                     );
                  }
                  break;

               case "pahala":
                  {
                     var bagus = fs.readFileSync("./vn/aku_butuh_pahala.mp3");
                     await dian.sendMessage(
                        m.chat,
                        {
                           audio: bagus,
                           mimetype: "audio/mpeg",
                           ptt: true,
                        },
                        { quoted: fvn }
                     );
                  }
                  break;

               case "kane1":
               case "kane2":
               case "kane3":
               case "kane4":
               case "kane5":
               case "kane6":
               case "kane7":
               case "kane8":
               case "kane9":
                  {
                     var xeony_buffer = await getBuffer(
                        `https://github.com/ZassTdr/Sound-Sad/raw/main/Kane-Music/${command}.mp3`
                     );
                     await dian.sendMessage(
                        m.chat,
                        {
                           audio: xeony_buffer,
                           mimetype: "audio/mp4",
                           ptt: true,
                        },
                        { quoted: fvn }
                     );
                  }
                  break;

               case "sound1":
               case "sound2":
               case "sound3":
               case "sound4":
               case "sound5":
               case "sound6":
               case "sound7":
               case "sound8":
               case "sound9":
               case "sound10":
               case "sound11":
               case "sound12":
               case "sound13":
               case "sound14":
               case "sound15":
               case "sound16":
               case "sound17":
               case "sound18":
               case "sound19":
               case "sound20":
               case "sound21":
               case "sound22":
               case "sound23":
               case "sound24":
               case "sound25":
               case "sound26":
               case "sound27":
               case "sound28":
               case "sound29":
               case "sound30":
               case "sound31":
               case "sound32":
               case "sound33":
               case "sound34":
               case "sound35":
               case "sound36":
               case "sound37":
               case "sound38":
               case "sound39":
               case "sound40":
               case "sound41":
               case "sound42":
               case "sound43":
               case "sound44":
               case "sound45":
               case "sound46":
               case "sound47":
               case "sound48":
               case "sound49":
               case "sound50":
               case "sound51":
               case "sound52":
               case "sound53":
               case "sound54":
               case "sound55":
               case "sound56":
               case "sound57":
               case "sound58":
               case "sound59":
               case "sound60":
               case "sound61":
               case "sound62":
               case "sound63":
               case "sound64":
               case "sound65":
               case "sound66":
               case "sound67":
               case "sound68":
               case "sound69":
               case "sound70":
               case "sound71":
               case "sound72":
               case "sound73":
               case "sound74":
               case "sound75":
               case "sound76":
               case "sound77":
               case "sound78":
               case "sound79":
               case "sound80":
               case "sound81":
               case "sound82":
               case "sound83":
               case "sound84":
               case "sound85":
               case "sound86":
               case "sound87":
               case "sound88":
               case "sound89":
               case "sound90":
               case "sound91":
               case "sound92":
               case "sound93":
               case "sound94":
               case "sound95":
               case "sound96":
               case "sound97":
               case "sound98":
               case "sound99":
               case "sound100":
               case "sound101":
               case "sound102":
               case "sound103":
               case "sound104":
               case "sound105":
               case "sound106":
               case "sound107":
               case "sound108":
               case "sound109":
               case "sound110":
               case "sound111":
               case "sound112":
               case "sound113":
               case "sound114":
               case "sound115":
               case "sound116":
               case "sound117":
               case "sound118":
               case "sound119":
               case "sound120":
               case "sound121":
               case "sound122":
               case "sound123":
               case "sound124":
               case "sound125":
               case "sound126":
               case "sound127":
               case "sound128":
               case "sound129":
               case "sound130":
               case "sound131":
               case "sound132":
               case "sound133":
               case "sound134":
               case "sound135":
               case "sound136":
               case "sound137":
               case "sound138":
               case "sound139":
               case "sound140":
               case "sound141":
               case "sound142":
               case "sound143":
               case "sound144":
               case "sound145":
               case "sound146":
               case "sound147":
               case "sound148":
               case "sound149":
               case "sound150":
               case "sound151":
               case "sound152":
               case "sound153":
               case "sound154":
               case "sound155":
               case "sound156":
               case "sound157":
               case "sound158":
               case "sound159":
               case "sound160":
               case "sound161":
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  dian_dev = await getBuffer(
                     `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/${command}.mp3`
                  );
                  react(`⏳`);
                  await dian.sendMessage(
                     m.chat,
                     {
                        audio: dian_dev,
                        mimetype: "audio/mp4",
                        ptt: true,
                     },
                     { quoted: fvn }
                  );
                  react(`✅`);
                  break;

               case "sad1":
               case "sad2":
               case "sad3":
               case "sad4":
               case "sad5":
               case "sad6":
               case "sad7":
               case "sad8":
               case "sad9":
               case "sad10":
               case "sad11":
               case "sad12":
               case "sad13":
               case "sad14":
               case "sad15":
               case "sad16":
               case "sad17":
               case "sad18":
               case "sad19":
               case "sad20":
               case "sad21":
               case "sad22":
               case "sad23":
               case "sad24":
               case "sad25":
               case "sad26":
               case "sad27":
               case "sad28":
               case "sad29":
               case "sad30":
               case "sad31":
               case "sad32":
               case "sad33":
               case "sad34":
               case "sad35":
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  dian_dev = await getBuffer(
                     `https://github.com/ZassTdr/Sound-Sad/raw/main/Sad-Music/${command}.mp3`
                  );
                  react(`⏳`);
                  await dian.sendMessage(
                     m.chat,
                     {
                        audio: dian_dev,
                        mimetype: "audio/mp4",
                        ptt: true,
                     },
                     { quoted: m }
                  );
                  react(`✅`);
                  break;

               //batas sound menu
               //DOWNLOADER
               case "photo":
                  {
                     if (!text) return `link Poto Nya Mana?`;
                     let poto = text;
                     let teks = `Nih`;
                     react(`⏳`);
                     await dian.sendMessage(
                        from,
                        {
                           image: {
                              url: poto,
                           },
                           caption: mess.success,
                        },
                        {
                           quoted: fvn,
                        }
                     );
                     react(`✅`);
                  }
                  break;

               case "play":
                  {
                     if (!text)
                        return m.reply(
                           `Example : ${prefix + command} Cita citata meriang`
                        );
                     react(`⏳`);
                     await loading();
                     let search = await yts(`${text}`);
                     let res = search;
                     let todd = await getBuffer(res.all[0].thumbnail);
                     let caption = `*YOUTUBE RESULT* \n
⪼ Judul : ${res.all[0].title}
⪼ Deskripsi : ${res.videos[0].description}
⪼ Channel : ${res.all[0].author && res.all[0].author.name}
⪼ Durasi : ${res.all[0].timestamp}
⪼ Upload : ${res.all[0].ago}
⪼ Link : ${res.videos[0].url}
⪼ Penonton : ${res.all[0].views}`;
                     dian.sendMessage(
                        m.chat,
                        {
                           document: fs.readFileSync("./src/doc.xlsx"),
                           jpegThumbnail: global.yts,
                           fileName: `Download With Ardian`,
                           mimetype: docs,
                           fileLength: 99999999999999,
                           pageCount: "100",
                           caption: caption,
                           contextInfo: {
                              externalAdReply: {
                                 showAdAttribution: true,
                                 title: `${res.all[0].title}`,
                                 body: `${res.videos[0].description}`,
                                 previewType: "PHOTO",
                                 mediaType: 1,
                                 renderLargerThumbnail: true,
                                 thumbnail: todd,
                                 sourceUrl: `${res.videos[0].url}`,
                              },
                           },
                        },
                        { quoted: fvn }
                     );
                     await m.reply(`Video Dan Audio Sedang Di Download`);
                     await sleep(3000);
                     await downloadMp4(`${res.videos[0].url}`);
                     await sleep(3000);
                     await downloadMp3(`${res.videos[0].url}`);
                     react(`✅`);
                     await sleep(3000);
                     m.reply(
                        "Perhatian!\n Kalo Video/audio nya tidak bisa di putar, Silahkan Convert Ulang"
                     );
                  }
                  break;
               case "ytmp4":
               case "mp4":
                  {
                     if (!text) return m.reply("Link Mana?");
                     downloadMp4(text);
                     loading();
                     react(`✅`);
                  }
                  break;
               case "ytmp3":
               case "mp3":
                  {
                     if (!text) return m.reply("link mana?");
                     downloadMp3(text);
                     react(`⏳`);
                     react(`✅`);
                  }
                  break;
               case "ytv":
                  {
                     if (!text) return saying("Link Nya Mana Bang?");
                     downloadMp4v2(text);
                     waitLoad();
                     doneLoad();
                  }
                  break;
               case "yta":
                  {
                     if (!text) return saying("Link Nya Mana Bang?");
                     downloadMp3v2(text);
                     waitLoad();
                     doneLoad();
                  }
                  break;

               case "playmp3":
                  {
                     if (!text) return m.reply("link Manaa?");
                     waitLoad(m);
                     await playMp3(text);
                     doneLoad(m);
                  }
                  break;
               case "mediafire":
                  {
                     if (!isPremium) throw mess.prem;
                     if (!text) throw "*Link Nya Mana?*";
                     if (!isUrl(args[0]) && !args[0].includes("mediafire.com"))
                        throw "*Link Erorr*";
                     react(`⏳`);
                     const baby1 = await mediafireDl(text);
                     if (baby1[0].size.split("MB")[0] >= 100)
                        return m.reply(
                           "*File Over Limit* " + util.format(baby1)
                        );
                     let msg = `*DOWNLOADER MEDIAFIRE*
*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Mime* : ${baby1[0].mime}
*Link* : ${baby1[0].link}`;
                     let result4 = `*DOWNLOAD RESULT*
*Name* : ${baby1[0].nama}
*Size* : ${baby1[0].size}
*Mime* : ${baby1[0].mime}
*Link* : ${baby1[0].link}\n
_Sabar... File Lagi Di Kirim_`;

                     await m.reply(`${result4}`);
                     dian.sendMessage(
                        m.chat,
                        {
                           document: { url: baby1[0].link },
                           fileName: baby1[0].nama,
                           mimetype: "application/zip",
                           caption: `Download with ArdianTdR`,
                           caption: msg,
                           contextInfo: {
                              externalAdReply: {
                                 showAdAttribution: true,
                                 title: "ardian93",
                                 body: "𝙹𝚊𝚗𝚐𝚊𝚗 𝙻𝚞𝚙𝚊 𝙵𝚘𝚕𝚕𝚘𝚠",
                                 previewType: "PHOTO",
                                 mediaType: 1,
                                 thumbnail: potoo,
                                 sourceUrl: global.ig,
                              },
                           },
                        },
                        { quoted: m }
                     );
                     react(`✅`).catch((err) =>
                        m.reply("*Failed to download File*")
                     );
                  }
                  break;

               case "tiktok":
                  {
                     if (!text)
                        return m.reply(`Contoh : ${prefix + command} link`);
                     if (!q.includes("tiktok"))
                        return m.reply(`Link Invalid!!`);
                     await react(`⏳`);
                     require("./lib/tiktok")
                        .Tiktok(q)
                        .then((data) => {
                           dian.sendMessage(
                              m.chat,
                              {
                                 video: { url: data.watermark },
                                 mimetype: "video/mp4",
                                 caption: "Video Berhasil Di Download",
                                 gifPlayback: true,
                                 contextInfo: {
                                    externalAdReply: {
                                       showAdAttribution: true,
                                       title: `TikTok Video Download`,
                                       body: `TikTok Downloader Result`,
                                       previewType: `PHOTO`,
                                       renderLargerThumbnail: true,
                                       thumbnail: ttmp4,
                                       sourceUrl: `${text}`,
                                    },
                                 },
                              },
                              { quoted: unicorn }
                           );
                        });
                     await react(`✅`);
                  }
                  break;

               case "tiktokaudio":
               case "tiktokmp3":
                  {
                     if (!text)
                        return m.reply(`Contoh : ${prefix + command} link`);
                     if (!q.includes("tiktok"))
                        return m.reply(`Link Invalid!!`);
                     await react(`⏳`);
                     require("./lib/tiktok")
                        .Tiktok(q)
                        .then((data) => {
                           dian.sendMessage(
                              m.chat,
                              {
                                 audio: { url: data.audio },
                                 mimetype: "audio/mp3",
                                 caption: "Audio Berhasil Di Download",
                                 contextInfo: {
                                    externalAdReply: {
                                       showAdAttribution: true,
                                       title: `TikTok Audio Download`,
                                       body: `TikTok Downloader Result`,
                                       previewType: `PHOTO`,
                                       renderLargerThumbnail: true,
                                       thumbnail: ttmp3,
                                       sourceUrl: `${text}`,
                                    },
                                 },
                              },
                              { quoted: unicorn }
                           );
                        });
                     react(`✅`);
                  }
                  break;

               case "setclose":
                  if (!isGroupAdmins) return m.reply(`Hanya Untuk Admin Grup`);
                  if (!isBotAdmins) return m.reply(`saya bukan admin`);
                  react(`⏳`);
                  if (args[1] == "detik") {
                     var timer = args[0] * `1000`;
                  } else if (args[1] == "menit") {
                     var timer = args[0] * `60000`;
                  } else if (args[1] == "jam") {
                     var timer = args[0] * `3600000`;
                  } else if (args[1] == "hari") {
                     var timer = args[0] * `86400000`;
                  } else {
                     return m.reply(`Contoh ${prefix + command} 10 detik`);
                  }
                  m.reply(`Menutup Grup Dalam ${q}`);
                  setTimeout(() => {
                     const close = `Grup Telah Di Tutup`;
                     dian.groupSettingUpdate(from, "announcement");
                     m.reply(close);
                     react(`✅`);
                  }, timer);
                  break;
               case "setopen":
                  if (!isGroupAdmins) return m.reply(`Hanya Untuk Admin Grup`);
                  if (!isBotAdmins) return m.reply(`saya bukan admin`);
                  react(`⏳`);
                  if (args[1] == "detik") {
                     var timer = args[0] * `1000`;
                  } else if (args[1] == "menit") {
                     var timer = args[0] * `60000`;
                  } else if (args[1] == "jam") {
                     var timer = args[0] * `3600000`;
                  } else if (args[1] == "hari") {
                     var timer = args[0] * `86400000`;
                  } else {
                     return m.reply(`Contoh ${prefix + command} 10 detik`);
                  }
                  m.reply(`Membuka Grup Dalam ${q}`);
                  setTimeout(() => {
                     const open = `Grup Telah Di Buka`;
                     dian.groupSettingUpdate(from, "not_announcement");
                     m.reply(open);
                     react(`✅`);
                  }, timer);
                  break;

               case "lgc":
               case "linkgc":
                  {
                     if (!isBotAdmins) return m.reply(`Gw Bukan Admin`);
                     if (!isGroupAdmins)
                        return m.reply(
                           `Perintah ini hanya bisa digunakan oleh Admin Grup`
                        );
                     var url = await dian
                        .groupInviteCode(from)
                        .catch(() => m.reply(mess.error.api));
                     url = "https://chat.whatsapp.com/" + url;
                     let teks = `INI LINK NYA COYY\n${url}`;
                     dian.sendText(m.chat, teks, unicorn);
                  }
                  break;

               case "revoke":
                  if (!m.isGroup) return m.reply(mess.group);
                  if (!isGroupAdmins) return m.reply(mess.admin);
                  if (!isBotAdmins) return m.reply(mess.group);
                  await dian
                     .groupRevokeInvite(from)
                     .then((res) => {
                        m.reply(`Tautan Grup Telah Di Setel Ulang`);
                     })
                     .catch(() => m.reply(`Gagal Menyetel Ulang`));
                  break;

               case "listonline":
               case "absen":
               case "liston":
                  {
                     let id =
                        args && /\d+\-\d+@g.us/.test(args[0])
                           ? args[0]
                           : m.chat;
                     let online = [...Object.keys(store.preses[id]), botNumber];
                     dian.sendText(
                        m.chat,
                        "List Yang Aktif Di grup Ini:\n\n" +
                           online.map((v) => "⪼ @" + v.replace(/@.+/, ""))
                              .join`\n`,
                        m,
                        { mentions: online }
                     );
                  }
                  break;

               case "group":
               case "grup":
               case "gc":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins) throw mess.botAdmin;
                     if (!isAdmins) throw mess.admin;
                     if (args[0] === "c") {
                        await dian
                           .groupSettingUpdate(m.chat, "announcement")
                           .then((res) => m.reply(`*Grup Telah Di Tutup*`))
                           .catch((err) => m.reply(jsonformat(err)));
                     } else if (args[0] === "o") {
                        await dian
                           .groupSettingUpdate(m.chat, "not_announcement")
                           .then((res) => m.reply(`*Grup Telah Di Buka*`))
                           .catch((err) => m.reply(jsonformat(err)));
                     } else {
                        await dian.sendMessage(from, {
                           text: `Mode Grup\n\nTutup = ${
                              prefix + command
                           } c\nBuka = ${prefix + command} o`,
                        });
                     }
                  }
                  break;

               case "infogc":
               case "infogrup":
               case "infogroup":
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  if (!m.isGroup) return m.reply(mess.group);
                  let cekgcnya = `*INFO GROUP*

⪼ *ID:* ${from}
⪼ *Nama:* ${groupName}
⪼ *Anggota:* ${groupMembers.length}
⪼ *Admin:* ${groupAdmins.length}`;
                  m.reply(cekgcnya);
                  break;

               case "setppgroup":
               case "setppgrup":
               case "setppgc":
               case "sppgc":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isAdmins) throw mess.admin;
                     if (!quoted)
                        throw `Kirim/Reply Image Dengan Caption ${
                           prefix + command
                        }`;
                     if (!/image/.test(mime))
                        throw `Kirim/Reply Image Dengan Caption ${
                           prefix + command
                        }`;
                     if (/webp/.test(mime))
                        throw `Kirim/Reply Image Dengan Caption ${
                           prefix + command
                        }`;
                     let media = await dian.downloadAndSaveMediaMessage(quoted);
                     await dian
                        .updateProfilePicture(m.chat, { url: media })
                        .catch((err) => fs.unlinkSync(media));
                     m.reply(mess.success);
                  }
                  break;

               case "tag":
                  {
                     dian.sendMessage(
                        m.chat,
                        {
                           forward: m.quoted.fakeObj,
                           mentions: participants.map((a) => a.id),
                        },
                        { quoted: m }
                     );
                  }
                  break;

               case "tagall":
                  {
                     if (!m.isGroup) throw mess.group;
                     let teks = ` ${q ? q : "kosong"}\n\n`;
                     for (let mem of participants) {
                        teks += `@${mem.id.split("@")[0]}\n`;
                     }
                     dian.sendMessage(
                        m.chat,
                        {
                           text: teks,
                           mentions: participants.map((a) => a.id),
                        },
                        { quoted: m }
                     );
                  }
                  break;

               case "antilink":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins) throw mess.botAdmin;
                     if (!isAdmins) throw mess.admin;
                     if (args[0] === "on") {
                        if (db.data.chats[m.chat].antilink)
                           return m.reply(`*Sudah Aktif*`);
                        db.data.chats[m.chat].antilink = true;
                        m.reply(`*Antilink Aktif!*`);
                     } else if (args[0] === "off") {
                        if (!db.data.chats[m.chat].antilink)
                           return m.reply(`*Sudah Tidak Aktif*`);
                        db.data.chats[m.chat].antilink = false;
                        m.reply(`*Antilink Sekarang Tidak Aktif!*`);
                     } else {
                        await dian.sendMessage(from, {
                           text: `Mode Antilink\nantilink on\nantilink off`,
                        });
                     }
                  }
                  break;

               case "antiviewonce":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins) throw mess.botAdmin;
                     if (!isAdmins) throw mess.admin;
                     if (args[0] === "on") {
                        if (db.data.settings[botNumber].viewonce)
                           return m.reply(`*Sudah Aktif*`);
                        db.data.settings[botNumber].viewonce = true;
                        m.reply(`*antiviewonce Aktif!*`);
                     } else if (args[0] === "off") {
                        if (!db.data.settings[botNumber].viewonce)
                           return m.reply(`*Sudah Tidak Aktif*`);
                        db.data.settings[botNumber].viewonce = false;
                        m.reply(`*antiviewonce Sekarang Tidak Aktif!*`);
                     } else {
                        await dian.sendMessage(from, {
                           text: `Mode viewonce\nantiviewonce on\nantiviewonce off`,
                        });
                     }
                  }
                  break;

               case "wellcome":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isAdmins) throw mess.admin;
                     if (args[0] === "on") {
                        if (db.data.chats[m.chat].wellcome)
                           return m.reply(`*Sudah Aktif*`);
                        db.data.chats[m.chat].wellcome = true;
                        m.reply(`*wellcome Aktif!*`);
                     } else if (args[0] === "off") {
                        if (!db.data.chats[m.chat].wellcome)
                           return m.reply(`*Sudah Tidak Aktif*`);
                        db.data.chats[m.chat].wellcome = false;
                        m.reply(`*wellcome Sekarang Tidak Aktif!*`);
                     } else {
                        await dian.sendMessage(from, {
                           text: `Mode wellcome\nwellcome on\nwellcome off`,
                        });
                     }
                  }
                  break;

               case "autoread":
                  {
                     if (!isCreator) throw mess.owner;
                     if (args[0] === "on") {
                        if (dian.autoread) return m.reply(`*Sudah Aktif*`);
                        dian.autoread = true;
                        m.reply(`*autoread Aktif!*`);
                     } else if (args[0] === "off") {
                        if (!dian.autoread)
                           return m.reply(`*Sudah Tidak Aktif*`);
                        dian.autoread = false;
                        m.reply(`*ReadMessage Sekarang Tidak Aktif!*`);
                     } else {
                        await dian.sendMessage(from, {
                           text: `Mode ReadMessage\nautoread on\nautoread off`,
                        });
                     }
                  }
                  break;

               case "antilink2":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins) throw mess.botAdmin;
                     if (!isAdmins) throw mess.admin;
                     if (args[0] === "on") {
                        if (db.data.chats[m.chat].antilink2)
                           return m.reply(`*Sudah Aktif*`);
                        db.data.chats[m.chat].antilink2 = true;
                        m.reply(`*Antilink Auto kick Aktif!*`);
                     } else if (args[0] === "off") {
                        if (!db.data.chats[m.chat].antilink2)
                           return m.reply(`*Sudah Tidak Aktif*`);
                        db.data.chats[m.chat].antilink2 = false;
                        m.reply(`*Antilink Auto kick Sekarang Tidak Aktif!*`);
                     } else {
                        await dian.sendMessage(from, {
                           text: `Mode Antilink Auto kick\nantilink2 on\nantilink2 off`,
                        });
                     }
                  }
                  break;

               case "promote":
               case "admin":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins) throw mess.botAdmin;
                     if (!isAdmins) throw mess.admin;
                     let users = m.mentionedJid[0]
                        ? m.mentionedJid[0]
                        : m.quoted
                        ? m.quoted.sender
                        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                     await dian
                        .groupParticipantsUpdate(m.chat, [users], "promote")
                        .then((res) =>
                           m.reply(`${pushname} Sudah Di Jadikan Admin`)
                        )
                        .catch((err) => m.reply(jsonformat(err)));
                  }
                  break;

               case "demote":
               case "unadmin":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins) throw mess.botAdmin;
                     if (!isAdmins) throw mess.admin;
                     let users = m.mentionedJid[0]
                        ? m.mentionedJid[0]
                        : m.quoted
                        ? m.quoted.sender
                        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                     await dian
                        .groupParticipantsUpdate(m.chat, [users], "demote")
                        .then((res) =>
                           m.reply(
                              `${pushname} Sudah Di BerhentiKan Menjadi Admin`
                           )
                        )
                        .catch((err) => m.reply(jsonformat(err)));
                  }
                  break;

               case "setname":
               case "setsubject":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins) throw mess.botAdmin;
                     if (!isAdmins) throw mess.admin;
                     if (!text) throw "Text ?";
                     await dian
                        .groupUpdateSubject(m.chat, text)
                        .then((res) => m.reply(mess.success))
                        .catch((err) => m.reply(jsonformat(err)));
                  }
                  break;

               case "setdesc":
               case "setdesk":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins) throw mess.botAdmin;
                     if (!isAdmins) throw mess.admin;
                     if (!text) throw "Text ?";
                     await dian
                        .groupUpdateDescription(m.chat, text)
                        .then((res) => m.reply(mess.success))
                        .catch((err) => m.reply(jsonformat(err)));
                  }
                  break;

               case "h":
               case "hidetag":
                  {
                     if (!m.isGroup) throw mess.group;
                     dian.sendMessage(
                        m.chat,
                        {
                           text: q ? q : "",
                           mentions: participants.map((a) => a.id),
                        },
                        { quoted: m }
                     );
                  }
                  break;

               case "k":
               case "kick":
                  {
                     if (!m.isGroup) throw mess.group;
                     if (!isBotAdmins)
                        return m.reply(
                           "gw bukan admin.. tidak bisa mengkick user"
                        );
                     if (!isGroupAdmins) return m.reply("hanya admin");
                     let users = m.mentionedJid[0]
                        ? m.mentionedJid[0]
                        : m.quoted
                        ? m.quoted.sender
                        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                     await dian
                        .groupParticipantsUpdate(m.chat, [users], "remove")
                        .then((res) => m.reply(`Telah Di Tendang Dari Grup`))
                        .catch((err) =>
                           m.reply(`Eror!. Tidak Bisa Menendang Member`)
                        );
                  }
                  break;

               //batas menu group

               //owner menu
               case "delcache":
                  {
                     let directoryPath = path.join();
                     fs.readdir(directoryPath, async function (err, files) {
                        if (err) {
                           console.log("Unable to scan directory: " + err);
                           return m.reply("Unable to scan directory: " + err);
                        }
                        let filteredArray = await files.filter(
                           (item) =>
                              item.endsWith("gif") ||
                              item.endsWith("png") ||
                              item.endsWith("opus") ||
                              item.endsWith("mp3") ||
                              item.endsWith("mp4") ||
                              item.endsWith("jpg") ||
                              item.endsWith("webp") ||
                              item.endsWith("webm")
                        );
                        console.log(filteredArray.length);
                        let teks = `Terdeteksi ${filteredArray.length} file sampah\n\n`;
                        if (filteredArray.length == 0) return m.reply(teks);
                        filteredArray.map(function (e, i) {
                           teks += i + 1 + `. ${e}\n`;
                        });
                        m.reply(teks);
                        await sleep(2000);
                        m.reply("Menghapus file sampah...");
                        await filteredArray.forEach(function (file) {
                           fs.unlinkSync(file);
                        });
                        await sleep(2000);
                        m.reply("Berhasil menghapus semua sampah");
                     });
                  }
                  break;

               case "package":
                  {
                     if (!isCreator) throw mess.owner;
                     const lala = JSON.parse(fs.readFileSync("./package.json"));
                     let nono = Object.entries(lala.dependies);
                     let num = 1;
                     let teks = "Result From *Package.json*\n\n";
                     if (nono && nono.length > 0) {
                        for (let i of nono) {
                           teks += `${num++}. ${i[0]} ${i[1]}\n`;
                        }
                        m.reply(`${teks}`);
                        await sleep(2000);
                        m.reply(
                           `Untuk Mengupdate/menghapus\nLihat Contoh Di Bawah\n$ npm update package@version\n$ npm uninstall package`
                        );
                     } else {
                        m.reply(`Tidak Ada Module Tersedia`);
                     }
                  }
                  break;

               case "exec":
                  {
                     if (!isCreator) throw mess.owner;
                     await m.reply("_Executing..._");
                     exec(q, async (err, stdout) => {
                        if (err) return m.reply(`${credits}:~ ${err}`);
                        if (stdout) {
                           await m.reply(`${stdout}`);
                           let teks = `Berhasil menginstall module ${q.replace(
                              "npm i",
                              ""
                           )}`;
                           let mok = [
                              {
                                 buttonId: `${prefix}restart`,
                                 buttonText: {
                                    displayText: `Restart`,
                                 },
                                 type: "RESPONSE",
                              },
                           ];
                           let tolol = {
                              text: teks,
                              footer: `${credits}`,
                              buttons: mok,
                              headerType: 1,
                           };
                           await dian.sendMessage(from, tolol, {
                              quoted: m,
                           });
                        }
                     });
                  }
                  break;

               case "bayar":
               case ".tf":
               case "payment":
                  {
                     if (m.isGroup) throw mess.private;
                     let teks =
                        "*Metode Pembayaran*\n\n_1.Dana\n2.Gopay\n3.Qris\n4.Ovo";
                     m.reply(teks);
                  }
                  break;
               case "dana":
                  {
                     let tekssss = `*⪼ DANA ⪼*
⪼ NO DANA : 6287845032372
⪼ A/N: Harniwati
Silahkan Transfer Lewat Nomor Tercantum Di Atas Atau Scan Qris Gopay Di Atas Terimakasih
`;
                     let payy = await dian.sendMessage(
                        m.chat,
                        {
                           image: dana,
                           caption: tekssss,
                           footer: `${credits}`,
                        },
                        { quoted: ftoko }
                     );
                     setTimeout(() => {
                        dian.sendMessage(m.chat, {
                           delete: payy.key,
                        });
                     }, 60000);
                  }
                  break;
               case "qris":
               case "qr":
               case "allpay":
                  {
                     let tekssss = `*⪼ AllPayment/Qris ⪼*
Silahkan Scan Qris Alpayment Di Atas Untuk Melakukan Pembayaran Terimakasih Dan Jangan Lupa Kirim Bukti Ke Owner
`;
                     let payy = await dian.sendMessage(
                        m.chat,
                        {
                           image: qris,
                           caption: tekssss,
                           footer: `${credits}`,
                        },
                        { quoted: ftoko }
                     );
                     setTimeout(() => {
                        dian.sendMessage(m.chat, {
                           delete: payy.key,
                        });
                     }, 60000);
                  }
                  break;

               case "gopay":
                  {
                     if (!isCreator) return m.reply(mess.owner);
                     let pap = ` *PEMBAYARAN GOPAY*
            
⪼ NO GOPAY : 6287845032372
⪼ A/N : Ardian
Silahkan Transfer Lewat Nomor Tercantum Di Atas Atau Scan Qris Gopay Di Atas Terimakasih
`;
                     let payy = await dian.sendMessage(
                        m.chat,
                        {
                           image: gopay,
                           caption: tekssss,
                           footer: `${credits}`,
                        },
                        { quoted: ftoko }
                     );
                     setTimeout(() => {
                        dian.sendMessage(m.chat, {
                           delete: payy.key,
                        });
                     }, 60000);
                  }
                  break;

               case "ovo":
                  {
                     if (!isCreator) return m.reply(mess.owner);
                     let pap = ` *PEMBAYARAN OVO*

⪼ NO OVO : 087845032372
⪼ A/N: Ardian
Silahkan Transfer Lewat Nomor Tercantum Di Atas Atau Scan Qris Gopay Di Atas Terimakasih
`;
                     let payy = await dian.sendMessage(
                        m.chat,
                        {
                           image: gopay,
                           caption: tekssss,
                           footer: `${credits}`,
                        },
                        { quoted: ftoko }
                     );
                     setTimeout(() => {
                        dian.sendMessage(m.chat, {
                           delete: payy.key,
                        });
                     }, 60000);
                  }
                  break;

               case "yt":
               case "youtube":
                  dian.sendMessage(
                     from,
                     { text: `https://youtube.com/@ardiannnn` },
                     { quoted: fkontak }
                  );
                  break;
               case "instagram":
               case "ig":
                  dian.sendMessage(
                     from,
                     { text: `@ardianpermana93` },
                     { quoted: fkontak }
                  );
                  break;
               case "donasi":
               case "donate":
                  {
                     if (!isCreator) throw mess.owner;
                     if (m.isGroup) throw mess.private;
                     let tekssss = `───⪼  *DONASI*  」────

*Payment donasi💰* 

- *Dana :* 087845032372
- *Gopay :*  Scan qr di atas
- *Ovo :* Scan qr di atas
- *Qris :* Scan qr di atas

berapapun donasi dari kalian itu sangat berarti bagi kami 
`;
                     dian.sendMessage(
                        from,
                        {
                           image: qris,
                           caption: tekssss,
                           footer: `${credits} © 2023`,
                        },
                        { quoted: fkontak }
                     );
                  }
                  break;
               case "proses":
                  {
                     if (!isCreator) throw mess.owner;
                     if (m.isGroup) throw mess.private;
                     let tek = `           ⪼ *TRANSAKSI TERTUNDA* 」\n\nTANGGAL : ${tanggal}\nJAM : ${jam}\nSTATUS  : Tertunda\n\n*Pesanan Anda Akan Segera Di Proses 
Silahkan Tunggu Sebentar 
Karena Pembayaran Manual`;
                     m.reply(tek);
                     dian.sendMessage("6287845032372@s.whatsapp.net", {
                        text: `📛Ada yang order Cepet respon *NOMOR*: ${
                           sender.split("@")[0]
                        }📛`,
                     });
                  }
                  break;
               case "done":
                  {
                     if (!isCreator) throw mess.owner;
                     if (m.isGroup) throw mess.private;
                     let tek = `           ⪼ *TRANSAKSI BERHASIL* 」\n\nTANGGAL : ${tanggal}\nJAM : ${jam}\nSTATUS  : Berhasil\n\nTerimakasih!`;
                     m.reply(tek);
                  }
                  break;

               case "getcase":
                  {
                     if (!isCreator) throw mess.owner;
                     if (!args[0])
                        return m.reply(`Example : ${prefix + command} Menu`);
                     m.reply(getCase(args[0]));
                  }
                  break;

               case "restart":
                  {
                     if (!isCreator) return m.reply(mess.owner);
                     await dian.sendMessage(from, {
                        text: "*_Restarting_*",
                     });
                     await sleep(5000);
                     await dian.sendMessage(from, {
                        text: "*_Succesfull Restarting_*",
                     });
                     await sleep(1000);
                     process.send("reset");
                  }
                  break;

               case "owner":
               case "nomerku":
                  {
                     dian.sendContact(m.chat, owner, m);
                  }
                  break;

               case "push":
                  {
                     if (!isCreator) return;
                     if (!m.isGroup) return;
                     if (!q) return m.reply(`text?`);
                     m.reply(mess.wait);
                     var mem = await participants
                        .filter((v) => v.id.endsWith(".net"))
                        .map((v) => v.id);
                     m.reply(mess.success);
                     for (let pler of mem) {
                        dian.sendMessage(pler, { text: q });
                     }
                  }
                  break;

               case "creategroup":
               case "buatgc":
                  if (!isCreator) return m.reply(mess.owner);
                  if (!text) return m.reply("Masukkan Nama grup");
                  const group = await dian.groupCreate(q, [
                     owner + "@s.whatsapp.net",
                  ]);
                  m.reply(mess.success);
                  dian.sendMessage(group.id, {
                     text: "Assalamualaikum",
                  });
                  break;

               case "join":
                  {
                     if (!isCreator) throw mess.owner;
                     if (!text) throw "Masukkan Link Group!";
                     if (!isUrl(args[0]) && !args[0].includes("whatsapp.com"))
                        throw "Link Invalid!";
                     m.reply(mess.wait);
                     let result = args[0].split(
                        "https://chat.whatsapp.com/"
                     )[1];
                     await dian
                        .groupAcceptInvite(result)
                        .then((res) => m.reply(jsonformat(res)))
                        .catch((err) => m.reply(jsonformat(err)));
                  }
                  break;
               case "leave":
                  {
                     if (!isCreator) throw mess.owner;
                     await dian
                        .groupLeave(m.chat)
                        .then((res) => m.reply(jsonformat(res)))
                        .catch((err) => m.reply(jsonformat(err)));
                  }
                  break;

               case "chatgpt":
                  {
                     if (!isCreator) throw mess.owner;
                     let tesk = `Mode chatgptchatgpt off\nchatgpt on`;
                     if (args[0] === "on") {
                        if (db.data.settings[botNumber].chatgpt)
                           return m.reply(`*Sudah Aktif Sebelumnya*`);
                        db.data.settings[botNumber].chatgpt = true;
                        m.reply(
                           `*sesi chatgpt Sudah Aktif.! silahkan bertanya kepada ai*`
                        );
                     } else if (args[0] === "off") {
                        if (!db.data.settings[botNumber].chatgpt)
                           return m.reply(`*Sudah Tidak Aktif Sebelumnya*`);
                        db.data.settings[botNumber].chatgpt = false;
                        m.reply(`sesi chatgpt Sudah Di Matikan`);
                     }
                     m.reply(tesk);
                  }
                  break;

               case "autosw":
                  {
                     if (!isCreator) throw mess.owner;
                     let tesk = `Mode autosw\nautosw off\nautosw on`;
                     if (args[0] === "on") {
                        if (db.data.settings[botNumber].autosw)
                           return m.reply(`*Sudah Aktif Sebelumnya*`);
                        db.data.settings[botNumber].autosw = true;
                        m.reply(`*Autosw Sudah Di Aktifkan*`);
                     } else if (args[0] === "off") {
                        if (!db.data.settings[botNumber].autosw)
                           return m.reply(`*Sudah Tidak Aktif Sebelumnya*`);
                        db.data.settings[botNumber].autosw = false;
                        m.reply(`autosw Sudah Di Matikan`);
                     }
                     m.reply(tesk);
                  }
                  break;

               case "afk":
                  {
                     if (!isCreator) return m.reply("Khusus owner");
                     if (dian.read) {
                        dian.read = false;
                        m.reply("Anda Sudah Kembali");
                     } else if (!dian.read) {
                        dian.read = true;
                        m.reply("Anda Sedang Afk");
                     }
                  }
                  break;

               case "block":
                  {
                     if (!isCreator) return m.reply(mess.owner);
                     let users = m.mentionedJid[0]
                        ? m.mentionedJid[0]
                        : m.quoted
                        ? m.quoted.sender
                        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                     await dian
                        .updateBlockStatus(users, "block")
                        .then((res) => m.reply(jsonformat(res)))
                        .catch((err) => m.reply(jsonformat(err)));
                  }
                  break;

               case "unblock":
                  {
                     if (!isCreator) return m.reply(mess.owner);
                     let users = m.mentionedJid[0]
                        ? m.mentionedJid[0]
                        : m.quoted
                        ? m.quoted.sender
                        : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
                     await dian
                        .updateBlockStatus(users, "unblock")
                        .then((res) => m.reply(jsonformat(res)))
                        .catch((err) => m.reply(jsonformat(err)));
                  }
                  break;

               case "backup":
                  {
                     if (!isCreator) throw mess.owner;
                     if (m.isGroup) throw mess.private;
                     await m.reply(mess.wait);
                     const { execSync } = require("child_process");
                     const ls = (await execSync("ls"))
                        .toString()
                        .split("\n")
                        .filter(
                           (pe) =>
                              pe != "node_modules" &&
                              pe != "session" &&
                              pe != "package-lock.json" &&
                              pe != "yarn.lock" &&
                              pe != "undefined.jpg" &&
                              pe != "undefined.png" &&
                              pe != "undefined.webp"
                        );
                     const exec = await execSync(
                        `zip -r backup_bot.zip ${ls.join(" ")}`
                     );
                     await dian.sendMessage(
                        m.chat,
                        {
                           document: fs.readFileSync("./backup_bot.zip"),
                           jpegThumbnail: thumb,
                           fileName: `SourceCode.zip`,
                           mimetype: "application/zip",
                           caption: `Nih Sc Nya`,
                        },
                        { quoted: fkontak }
                     );
                     await execSync("rm -rf backup_bot.zip");
                  }
                  break;
               case "rcache":
               case "remove-cache":
               case "hapus-sampah":
                  {
                     if (!isCreator) throw mess.owner;
                     if (m.isGroup) throw mess.private;
                     let { execSync } = require("child_process");
                     await m.reply(mess.wait);
                     await execSync("rm -rf .cache");
                     await execSync("rm -rf .npm");
                     await execSync("rm -rf .yarn");
                     await execSync("rm -rf .yarnrc");
                     await execSync("rm -rf yarn.lock");
                     await execSync("rm -rf yarn-error.log");
                     await execSync("rm -rf undefined.jpg");
                     await execSync("rm -rf undefined.webp");
                     await execSync("rm -rf undefined.mp3");
                     await execSync("rm -rf undefined.opus");
                     await m.reply(mess.success);
                  }
                  break;

               case "setppbot":
               case "setpp":
                  {
                     if (!isCreator) return m.reply(mess.owner);
                     if (!quoted)
                        return m.reply(
                           `Kirim/Reply Image Dengan Caption ${
                              prefix + command
                           }`
                        );
                     if (!/image/.test(mime))
                        return m.reply(
                           `Kirim/Reply Image Dengan Caption ${
                              prefix + command
                           }`
                        );
                     if (/webp/.test(mime))
                        return m.reply(
                           `Kirim/Reply Image Dengan Caption ${
                              prefix + command
                           }`
                        );
                     var medis = await dian.downloadAndSaveMediaMessage(
                        quoted,
                        "ppbot.jpeg"
                     );
                     if (args[0] == `/full`) {
                        var { img } = await generateProfilePicture(medis);
                        await dian.query({
                           tag: "iq",
                           attrs: {
                              to: botNumber,
                              type: "set",
                              xmlns: "w:profile:picture",
                           },
                           content: [
                              {
                                 tag: "picture",
                                 attrs: { type: "image" },
                                 content: img,
                              },
                           ],
                        });
                        fs.unlinkSync(medis);
                        m.reply(`Sukses`);
                     } else {
                        var memeg = await dian.updateProfilePicture(botNumber, {
                           url: medis,
                        });
                        fs.unlinkSync(medis);
                        m.reply(`Sukses`);
                     }
                  }
                  break;

               //batas menu Owner

               case "ai":
                  try {
                     if (
                        setting.keyopenai ===
                        "sk-zKHBufoIR0TqMIo6Av7gT3BlbkFJHHJWgxlAZYCWxxPPc"
                     )
                        return;
                     if (!text)
                        return m.reply(
                           `Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`
                        );
                     const configuration = new Configuration({
                        apiKey: setting.keyopenai,
                     });
                     const openai = new OpenAIApi(configuration);
                     react("⏳");
                     const response = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: text,
                        temperature: 0.3,
                        max_tokens: 2000,
                        top_p: 1.0,
                        frequy_penalty: 0.0,
                        prese_penalty: 0.0,
                     });
                     m.reply(`${response.data.choices[0].text}`);
                  } catch (error) {
                     if (error.response) {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        console.log(
                           `${error.response.status}\n\n${error.response.data}`
                        );
                     } else {
                        console.log(error);
                        m.reply(
                           "Maaf, sepertinya ada yang error :" + error.message
                        );
                     }
                  }
                  break;

               case "a1":
               case "openai":
                  if (!isPremium) throw mess.prem;
                  try {
                     if (keyy.keyopenai === "ISI_APIKEY_OPENAI_DISINI")
                        return m.reply(
                           "Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys"
                        );
                     if (!text)
                        return m.reply(
                           `Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`
                        );
                     const configuration = new Configuration({
                        apiKey: keyy.keyopenai,
                     });
                     react("⏳");
                     const openai = new OpenAIApi(configuration);
                     const response = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: text }],
                     });
                     m.reply(`${response.data.choices[0].message.content}`);
                  } catch (error) {
                     if (error.response) {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        console.log(
                           `${error.response.status}\n\n${error.response.data}`
                        );
                     } else {
                        console.log(error);
                        m.reply(
                           "Maaf, sepertinya ada yang error :" + error.message
                        );
                     }
                  }
                  break;

               case "ai2":
                  if (!isCreator) throw mess.owner;
                  try {
                     if (keyy.keyopenai === "ISI_APIKEY_OPENAI_DISINI")
                        return m.reply(
                           "Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys"
                        );
                     if (!text)
                        return m.reply(
                           `Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`
                        );
                     const configuration = new Configuration({
                        apiKey: keyy.keyopenai,
                     });
                     react("⏳");
                     const openai = new OpenAIApi(configuration);
                     const response = await openai.createChatCompletion({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: text }],
                     });
                     // m.reply(`${response.data.choices[0].message.content}`);
                     let teks = `${response.data.choices[0].message.content}`;
                     let gtts = require("./lib/gtts")(`id`, teks);
                     let ranm = getRandom(".mp3");
                     let rano = getRandom(".ogg");
                     teks.length > 10000
                        ? m.reply("Teks nya terlalu panjang")
                        : gtts.save(ranm, teks, function () {
                             exec(
                                `ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`,
                                (err) => {
                                   fs.unlinkSync(ranm);
                                   let buff = fs.readFileSync(rano);
                                   if (err) return m.reply(mess.error);
                                   dian.sendMessage(
                                      m.chat,
                                      {
                                         audio: buff,
                                         mimetype: "audio/mp4",
                                         ptt: true,
                                      },
                                      { quoted: fvn }
                                   );
                                   fs.unlinkSync(rano);
                                }
                             );
                          });
                  } catch (error) {
                     if (error.response) {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        console.log(
                           `${error.response.status}\n\n${error.response.data}`
                        );
                     } else {
                        console.log(error);
                        m.reply(
                           "Maaf, sepertinya ada yang error :" + error.message
                        );
                     }
                  }
                  break;

               case "img":
               case "gambar":
               case "foto":
               case "poto":
               case "aiimg":
               case "image":
               case "images":
                  if (!isCreator) throw mess.owner;
                  if (cekUser("id", sender) == null)
                     return m.reply(mess.OnlyUser);
                  if (!isPremium) throw mess.prem;
                  if (!text) return m.reply(`Cari Gambar Apa?`);
                  m.reply(mess.wait);
                  try {
                     if (keyy.keyopenai === "ISI_APIKEY_OPENAI_DISINI")
                        return m.reply(
                           "Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys"
                        );
                     if (!text)
                        return m.reply(
                           `Membuat gambar dari AI.\n\nContoh:\n${prefix}${command} Wooden house on snow mountain`
                        );
                     react("⏳");
                     const configuration = new Configuration({
                        apiKey: keyy.keyopenai,
                     });
                     const openai = new OpenAIApi(configuration);
                     const response = await openai.createImage({
                        prompt: text,
                        n: 1,
                        size: "1024x1024",
                     });
                     //console.log(response.data.data[0].url)
                     dian.sendImage(from, response.data.data[0].url, text, mek);
                  } catch (error) {
                     if (error.response) {
                        console.log(error.response.status);
                        console.log(error.response.data);
                        console.log(
                           `${error.response.status}\n\n${error.response.data}`
                        );
                     } else {
                        console.log(error);
                        m.reply(
                           "Maaf, sepertinya ada yang error :" + error.message
                        );
                     }
                  }
                  break;
               case "delsrv":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Perintah Tersebut Khusus Developer`
                        );
                     let srv = args[0];
                     if (!srv) return m.reply("ID nya mana?");
                     let f = await fetch(
                        domain + "/api/application/servers/" + srv,
                        {
                           method: "DELETE",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let res = f.ok
                        ? {
                             errors: null,
                          }
                        : await f.json();
                     if (res.errors) return m.reply("*SERVER NOT FOUND*");
                     m.reply("*SUCCESSFULLY DELETE THE SERVER*");
                  }
                  break;
               case "detsrv":
                  {
                     let srv = args[0];
                     let f = await fetch(
                        domain + "/api/application/servers/" + srv,
                        {
                           method: "GET",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let res = await f.json();
                     if (res.errors) return m.reply("*SERVER NOT FOUND*");
                     let s = res.attributes;
                     let f2 = await fetch(
                        domain +
                           "/api/client/servers/" +
                           s.uuid.split`-`[0] +
                           "/resources",
                        {
                           method: "GET",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + capikey,
                           },
                        }
                     );
                     let data = await f2.json();
                     let t = data.attributes;
                     m.reply(`*${s.name.toUpperCase()} SERVER DETAILS*

STATUS: ${t.current_state}

ID: ${s.id}
UUID: ${s.uuid}
NAME: ${s.name}
DESCRIPTION: ${s.description}
MEMORY: ${await format(t.resources.memory_bytes).toString()} / ${
                        s.limits.memory === 0
                           ? "Unlimited"
                           : s.limits.memory + "MB"
                     }
DISK: ${await format(t.resources.disk_bytes).toString()} / ${
                        s.limits.disk === 0 ? "Unlimited" : s.limits.disk + "MB"
                     }
CPU: ${t.resources.cpu_absolute}% / ${
                        s.limits.cpu === 0 ? "Unlimited" : s.limits.cpu + "%"
                     }
CREATED AT: ${s.created_at}`);
                  }
                  break;
               case "updatesrv":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Perintah Tersebut Khusus Developer`
                        );
                     let t = text.split(",");
                     if (t.length < 4)
                        return m.reply(
                           `Perintah :\nsrvId,locId,memory/disk,cpu?`
                        );
                     let srv = t[0];
                     let loc = t[1];
                     let memo_disk = t[2].split`/`;
                     let cpu = t[3];
                     let f1 = await fetch(
                        domain + "/api/application/servers/" + srv,
                        {
                           method: "GET",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let data = await f1.json();

                     let f = await fetch(
                        domain + "/api/application/servers/" + srv + "/build",
                        {
                           method: "PATCH",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                           body: JSON.stringify({
                              allocation:
                                 parseInt(loc) || data.attributes.allocation,
                              memory:
                                 memo_disk[0] || data.attributes.limits.memory,
                              swap: data.attributes.limits.swap || 0,
                              disk: memo_disk[1] || data.attributes.limits.disk,
                              io: 500,
                              cpu: cpu || data.attributes.limits.cpu,
                              threads: null,
                              feature_limits: {
                                 databases: 5,
                                 allocations: 5,
                                 backups: 5,
                              },
                           }),
                        }
                     );
                     let res = await f.json();
                     if (res.errors)
                        return m.reply(JSON.stringify(res.errors[0], null, 2));
                     let server = res.attributes;
                     m.reply(`*SUCCESSFULLY UPDATED THE SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}
UPDATED AT: ${server.updated_at}`);
                  }
                  break;
               case "delusr":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Perintah Tersebut Khusus Developer`
                        );
                     let usr = args[0];
                     if (!usr) return m.reply("ID nya mana?");
                     let f = await fetch(
                        domain + "/api/application/users/" + usr,
                        {
                           method: "DELETE",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let res = f.ok
                        ? {
                             errors: null,
                          }
                        : await f.json();
                     if (res.errors) return m.reply("*USER NOT FOUND*");
                     m.reply("*SUCCESSFULLY DELETE THE USER*");
                  }
                  break;
               case "detusr":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Perintah Tersebut Khusus Developer`
                        );
                     let usr = args[0];
                     let f = await fetch(
                        domain + "/api/application/users/" + usr,
                        {
                           method: "GET",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let res = await f.json();
                     if (res.errors) return m.reply("*USER NOT FOUND*");
                     let u = res.attributes;
                     m.reply(`*${u.username.toUpperCase()} USER DETAILS*

ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}`);
                  }
                  break;

               case "listsrv":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Perintah Tersebut Khusus Developer`
                        );
                     let page = args[0] ? args[0] : "1";
                     let f = await fetch(
                        domain + "/api/application/servers?page=" + page,
                        {
                           method: "GET",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let res = await f.json();
                     let servers = res.data;
                     let num = 1;
                     let teks = `List Server User\n\n`;
                     if (servers && servers.length > 0) {
                        for (let server of servers) {
                           let s = server.attributes;
                           let f3 = await fetch(
                              domain +
                                 "/api/client/servers/" +
                                 s.uuid.split`-`[0] +
                                 "/resources",
                              {
                                 method: "GET",
                                 headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + capikey,
                                 },
                              }
                           );
                           let data = await f3.json();
                           teks += `${num++}-⪼
╔════⪼
║ ID: ${s.id}
║ NAME: ${s.name}
║ STATUS: ${data.attributes ? data.attributes.current_state : s.status}
╚════⪼\n\n`;
                        }
                        m.reply(`${teks}\n`);
                     } else {
                        m.reply(`Tidak Ada Server User`);
                     }
                  }
                  break;

               case "listusr":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Perintah Tersebut Khusus Developer`
                        );
                     let page = args[0] ? args[0] : "1";
                     let f = await fetch(
                        domain + "/api/application/users?page=" + page,
                        {
                           method: "GET",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let res = await f.json();
                     let users = res.data;
                     let section = [];
                     let num = 1;
                     let text =
                        "Berikut list user yang terdaftar,\nuntuk melihat detail user\nSilahkan ketik detuser (id)\n\n";
                     if (users && users.length > 0) {
                        for (let user of users) {
                           let u = user.attributes;
                           text += `${num++}-⪼
╔════⪼
║ ID: ${u.id}
║ NAME: ${u.username}
╚════⪼\n\n`;
                        }
                        m.reply(text);
                     } else m.reply("Tidak Ada User Terdaftar");
                  }
                  break;
               case "addsrv":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Perintah Tersebut Khusus Developer`
                        );
                     let s = text.split(",");
                     if (s.length < 7)
                        return m.reply(
                           `NAMA,TANGGAL,IDUSER,NODE,LOC,RAM/DISK,CPU`
                        );
                     let name = s[0];
                     let desc = s[1] || "";
                     let usr_id = s[2];
                     let egg = s[3];
                     let loc = s[4];
                     let memo_disk = s[5].split`/`;
                     let cpu = s[6];
                     let f1 = await fetch(
                        domain + "/api/application/nests/5/eggs/" + egg,
                        {
                           method: "GET",
                           headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: "Bearer " + apikey,
                           },
                        }
                     );
                     let data = await f1.json();
                     let startup_cmd = data.attributes.startup;

                     let f = await fetch(domain + "/api/application/servers", {
                        method: "POST",
                        headers: {
                           Accept: "application/json",
                           "Content-Type": "application/json",
                           Authorization: "Bearer " + apikey,
                        },
                        body: JSON.stringify({
                           name: name,
                           description: desc,
                           user: usr_id,
                           egg: parseInt(egg),
                           docker_image: "ghcr.io/parkervcp/yolks:nodejs_18",
                           startup: startup_cmd,
                           environment: {
                              INST: "npm",
                              USER_UPLOAD: "0",
                              AUTO_UPDATE: "0",
                              CMD_RUN: "npm start",
                           },
                           limits: {
                              memory: memo_disk[0],
                              swap: 0,
                              disk: memo_disk[1],
                              io: 500,
                              cpu: cpu,
                           },
                           feature_limits: {
                              databases: 5,
                              backups: 5,
                              allocations: 5,
                           },
                           deploy: {
                              locations: [parseInt(loc)],
                              dedicated_ip: false,
                              port_range: [],
                           },
                        }),
                     });
                     let res = await f.json();
                     if (res.errors)
                        return m.reply(JSON.stringify(res.errors[0], null, 2));
                     let server = res.attributes;
                     m.reply(`*SUCCESSFULLY ADD SERVER*

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%
CREATED AT: ${server.created_at}`);
                  }
                  break;
               case "createadmin":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Command Tersebut Khusus Developer Bot WhatsApp`
                        );
                     const [email, username] = q.split(",");
                     function generateRandomPassword() {
                        // Generate a 10-character random passwor
                        return Array(10)
                           .fill(null)
                           .map(() => ((Math.random() * 16) | 0).toString(16))
                           .join("");
                     }
                     if (!email || !username) {
                        return m.reply(
                           `Ex: ${
                              prefix + command
                           } email,username\n\nContoh:\n${
                              prefix + command
                           } example@gmail.com, example`
                        );
                     }
                     const userData = {
                        email,
                        username,
                        first_name: username,
                        last_name: "Memb",
                        language: "en",
                        password: generateRandomPassword(),
                     };
                     const url = domain + "/api/application/users";
                     const options = {
                        method: "POST",
                        headers: {
                           Accept: "application/json",
                           "Content-Type": "application/json",
                           Authorization: "Bearer " + apikey,
                           capikey: capikey,
                        },
                        body: JSON.stringify({
                           ...userData,
                           root_admin: true,
                        }),
                     };
                     try {
                        const response = await fetch(url, options);
                        const result = await response.json();
                        if (result.errors) {
                           return m.reply(
                              `Gagal membuat akun admin: ${JSON.stringify(
                                 result.errors,
                                 null,
                                 2
                              )}`
                           );
                        }
                        m.reply(
                           `Akun admin telah berhasil dibuat dengan detail sebagai berikut:\nEmail: ${email}\nUsername: ${username}\nPassword: ${userData.password}`
                        );
                     } catch (err) {
                        return m.reply(
                           `Terjadi kesalahan saat membuat akun admin: ${err}`
                        );
                     }
                  }
                  break;
               case "adduser":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Maaf Perintah Tersebut Khusus Developer`
                        );
                     let t = text.split(",");
                     let username = t[0];
                     let passlog = t[1];
                     let mailnya = t[2];
                     let f = await fetch(domain + "/api/application/users", {
                        method: "POST",
                        headers: {
                           Accept: "application/json",
                           "Content-Type": "application/json",
                           Authorization: "Bearer " + apikey,
                        },
                        body: JSON.stringify({
                           email: mailnya,
                           username: username,
                           first_name: username,
                           last_name: "MEMBER",
                           language: "en",
                           password: passlog,
                        }),
                     });
                     let data = await f.json();
                     if (data.errors)
                        return m.reply(JSON.stringify(data.errors[0], null, 2));
                     let user = data.attributes;
                     let p = await dian.sendMessage(m.chat, {
                        text: `*BERIKUT DETAIL AKUN PANEL ANDA*\n
🆔ID: ${user.id}
📬EMAIL : ${mailnya}
👤USERNAME: ${username}
🔐PASSWORD: ${passlog}
☢️CREATED AT: ${user.created_at}
🖥️LOGIN: ${domain}`,
                     });
                  }
                  break;

               case "domain1":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Halo Kak ${pushname} Maaf nih akses domain khusus seller yg telah membuy Terimakasih 🙏`
                        );
                     function subDomain1(host, ip) {
                        return new Promise((resolve) => {
                           let zone = "295eb3718bb1d1603cb40a1a50f093fa";
                           let apitoken =
                              "p-KWllgzVN2JqJCQ25ay1s1nMUXo5wOItpLcZzkl";
                           let tld = "ardiantdr.online";
                           axios
                              .post(
                                 `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                                 {
                                    type: "A",
                                    name:
                                       host.replace(/[^a-z0-9.-]/gi, "") +
                                       "." +
                                       tld,
                                    content: ip.replace(/[^0-9.]/gi, ""),
                                    ttl: 3600,
                                    priority: 10,
                                    proxied: false,
                                 },
                                 {
                                    headers: {
                                       Authorization: "Bearer " + apitoken,
                                       "Content-Type": "application/json",
                                    },
                                 }
                              )
                              .then((e) => {
                                 let res = e.data;
                                 if (res.success)
                                    resolve({
                                       success: true,
                                       zone: res.result?.zone_name,
                                       name: res.result?.name,
                                       ip: res.result?.content,
                                    });
                              })
                              .catch((e) => {
                                 let err1 =
                                    e.response?.data?.errors?.[0]?.message ||
                                    e.response?.data?.errors ||
                                    e.response?.data ||
                                    e.response ||
                                    e;
                                 let err1Str = String(err1);
                                 resolve({
                                    success: false,
                                    error: err1Str,
                                 });
                              });
                        });
                     }
                     let raw1 = args?.join(" ")?.trim();
                     if (!raw1) return m.reply("mana host & ip nya?");
                     let host1 = raw1
                        .split("|")[0]
                        .trim()
                        .replace(/[^a-z0-9.-]/gi, "");
                     if (!host1)
                        return m.reply(
                           "host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)"
                        );
                     let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
                     if (!ip1 || ip1.split(".").length < 4)
                        return m.reply(ip1 ? "ip tidak valid" : "mana ip nya");

                     subDomain1(host1, ip1).then((e) => {
                        if (e["success"])
                           m.reply(
                              `berhasil menambah domain\nip: ${e["ip"]}\nhostname: ${e["name"]}`
                           );
                        else
                           m.reply(
                              `gagal membuat subdomain\nMsg: ${e["error"]}`
                           );
                     });
                  }
                  break;
               case "domain2":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Halo Kak ${pushname} Maaf nih akses domain khusus seller yg telah membuy Terimakasih 🙏`
                        );
                     function subDomain1(host, ip) {
                        return new Promise((resolve) => {
                           let zone = "2f3550ad5228e37fb7c980f5aca19b0c";
                           let apitoken =
                              "p-KWllgzVN2JqJCQ25ay1s1nMUXo5wOItpLcZzkl";
                           let tld = "mypanell.me";
                           axios
                              .post(
                                 `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                                 {
                                    type: "A",
                                    name:
                                       host.replace(/[^a-z0-9.-]/gi, "") +
                                       "." +
                                       tld,
                                    content: ip.replace(/[^0-9.]/gi, ""),
                                    ttl: 3600,
                                    priority: 10,
                                    proxied: false,
                                 },
                                 {
                                    headers: {
                                       Authorization: "Bearer " + apitoken,
                                       "Content-Type": "application/json",
                                    },
                                 }
                              )
                              .then((e) => {
                                 let res = e.data;
                                 if (res.success)
                                    resolve({
                                       success: true,
                                       zone: res.result?.zone_name,
                                       name: res.result?.name,
                                       ip: res.result?.content,
                                    });
                              })
                              .catch((e) => {
                                 let err1 =
                                    e.response?.data?.errors?.[0]?.message ||
                                    e.response?.data?.errors ||
                                    e.response?.data ||
                                    e.response ||
                                    e;
                                 let err1Str = String(err1);
                                 resolve({
                                    success: false,
                                    error: err1Str,
                                 });
                              });
                        });
                     }
                     let raw1 = args?.join(" ")?.trim();
                     if (!raw1) return m.reply("mana host & ip nya?");
                     let host1 = raw1
                        .split("|")[0]
                        .trim()
                        .replace(/[^a-z0-9.-]/gi, "");
                     if (!host1)
                        return m.reply(
                           "host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)"
                        );
                     let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
                     if (!ip1 || ip1.split(".").length < 4)
                        return m.reply(ip1 ? "ip tidak valid" : "mana ip nya");

                     subDomain1(host1, ip1).then((e) => {
                        if (e["success"])
                           m.reply(
                              `berhasil menambah domain\nip: ${e["ip"]}\nhostname: ${e["name"]}`
                           );
                        else
                           m.reply(
                              `gagal membuat subdomain\nMsg: ${e["error"]}`
                           );
                     });
                  }
                  break;
               case "domain5":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Halo Kak ${pushname} Maaf nih akses domain khusus seller yg telah membuy Terimakasih 🙏`
                        );
                     function subDomain1(host, ip) {
                        return new Promise((resolve) => {
                           let zone = "5edab2ad19532ed8dd48b5bb0cacf522";
                           let apitoken =
                              "p-KWllgzVN2JqJCQ25ay1s1nMUXo5wOItpLcZzkl";
                           let tld = "mypanel-store.me";
                           axios
                              .post(
                                 `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                                 {
                                    type: "A",
                                    name:
                                       host.replace(/[^a-z0-9.-]/gi, "") +
                                       "." +
                                       tld,
                                    content: ip.replace(/[^0-9.]/gi, ""),
                                    ttl: 3600,
                                    priority: 10,
                                    proxied: false,
                                 },
                                 {
                                    headers: {
                                       Authorization: "Bearer " + apitoken,
                                       "Content-Type": "application/json",
                                    },
                                 }
                              )
                              .then((e) => {
                                 let res = e.data;
                                 if (res.success)
                                    resolve({
                                       success: true,
                                       zone: res.result?.zone_name,
                                       name: res.result?.name,
                                       ip: res.result?.content,
                                    });
                              })
                              .catch((e) => {
                                 let err1 =
                                    e.response?.data?.errors?.[0]?.message ||
                                    e.response?.data?.errors ||
                                    e.response?.data ||
                                    e.response ||
                                    e;
                                 let err1Str = String(err1);
                                 resolve({
                                    success: false,
                                    error: err1Str,
                                 });
                              });
                        });
                     }
                     let raw1 = args?.join(" ")?.trim();
                     if (!raw1) return m.reply("mana host & ip nya?");
                     let host1 = raw1
                        .split("|")[0]
                        .trim()
                        .replace(/[^a-z0-9.-]/gi, "");
                     if (!host1)
                        return m.reply(
                           "host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)"
                        );
                     let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
                     if (!ip1 || ip1.split(".").length < 4)
                        return m.reply(ip1 ? "ip tidak valid" : "mana ip nya");

                     subDomain1(host1, ip1).then((e) => {
                        if (e["success"])
                           m.reply(
                              `berhasil menambah domain\nip: ${e["ip"]}\nhostname: ${e["name"]}`
                           );
                        else
                           m.reply(
                              `gagal membuat subdomain\nMsg: ${e["error"]}`
                           );
                     });
                  }
                  break;
               case "domain6":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Halo Kak ${pushname} Maaf nih akses domain khusus seller yg telah membuy Terimakasih 🙏`
                        );
                     function subDomain1(host, ip) {
                        return new Promise((resolve) => {
                           let zone = "51d524b96e165e8c7ffd81036aa32f01";
                           let apitoken =
                              "p-KWllgzVN2JqJCQ25ay1s1nMUXo5wOItpLcZzkl";
                           let tld = "my-panel.tech";
                           axios
                              .post(
                                 `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                                 {
                                    type: "A",
                                    name:
                                       host.replace(/[^a-z0-9.-]/gi, "") +
                                       "." +
                                       tld,
                                    content: ip.replace(/[^0-9.]/gi, ""),
                                    ttl: 3600,
                                    priority: 10,
                                    proxied: false,
                                 },
                                 {
                                    headers: {
                                       Authorization: "Bearer " + apitoken,
                                       "Content-Type": "application/json",
                                    },
                                 }
                              )
                              .then((e) => {
                                 let res = e.data;
                                 if (res.success)
                                    resolve({
                                       success: true,
                                       zone: res.result?.zone_name,
                                       name: res.result?.name,
                                       ip: res.result?.content,
                                    });
                              })
                              .catch((e) => {
                                 let err1 =
                                    e.response?.data?.errors?.[0]?.message ||
                                    e.response?.data?.errors ||
                                    e.response?.data ||
                                    e.response ||
                                    e;
                                 let err1Str = String(err1);
                                 resolve({
                                    success: false,
                                    error: err1Str,
                                 });
                              });
                        });
                     }
                     let raw1 = args?.join(" ")?.trim();
                     if (!raw1) return m.reply("mana host & ip nya?");
                     let host1 = raw1
                        .split("|")[0]
                        .trim()
                        .replace(/[^a-z0-9.-]/gi, "");
                     if (!host1)
                        return m.reply(
                           "host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)"
                        );
                     let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
                     if (!ip1 || ip1.split(".").length < 4)
                        return m.reply(ip1 ? "ip tidak valid" : "mana ip nya");
                     subDomain1(host1, ip1).then((e) => {
                        if (e["success"])
                           m.reply(
                              `berhasil menambah domain\nip: ${e["ip"]}\nhostname: ${e["name"]}`
                           );
                        else
                           m.reply(
                              `gagal membuat subdomain\nMsg: ${e["error"]}`
                           );
                     });
                  }
                  break;
               case "domain3":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Halo Kak ${pushname} Maaf nih akses domain khusus seller yg telah membuy Terimakasih 🙏`
                        );
                     function subDomain1(host, ip) {
                        return new Promise((resolve) => {
                           let zone = "f623c8c2822f6d08af1c5274b0f3d0d7";
                           let apitoken =
                              "p-KWllgzVN2JqJCQ25ay1s1nMUXo5wOItpLcZzkl";
                           let tld = "panel-store.my.id";
                           axios
                              .post(
                                 `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                                 {
                                    type: "A",
                                    name:
                                       host.replace(/[^a-z0-9.-]/gi, "") +
                                       "." +
                                       tld,
                                    content: ip.replace(/[^0-9.]/gi, ""),
                                    ttl: 3600,
                                    priority: 10,
                                    proxied: false,
                                 },
                                 {
                                    headers: {
                                       Authorization: "Bearer " + apitoken,
                                       "Content-Type": "application/json",
                                    },
                                 }
                              )
                              .then((e) => {
                                 let res = e.data;
                                 if (res.success)
                                    resolve({
                                       success: true,
                                       zone: res.result?.zone_name,
                                       name: res.result?.name,
                                       ip: res.result?.content,
                                    });
                              })
                              .catch((e) => {
                                 let err1 =
                                    e.response?.data?.errors?.[0]?.message ||
                                    e.response?.data?.errors ||
                                    e.response?.data ||
                                    e.response ||
                                    e;
                                 let err1Str = String(err1);
                                 resolve({
                                    success: false,
                                    error: err1Str,
                                 });
                              });
                        });
                     }
                     let raw1 = args?.join(" ")?.trim();
                     if (!raw1) return m.reply("mana host & ip nya?");
                     let host1 = raw1
                        .split("|")[0]
                        .trim()
                        .replace(/[^a-z0-9.-]/gi, "");
                     if (!host1)
                        return m.reply(
                           "host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)"
                        );
                     let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
                     if (!ip1 || ip1.split(".").length < 4)
                        return m.reply(ip1 ? "ip tidak valid" : "mana ip nya");

                     subDomain1(host1, ip1).then((e) => {
                        if (e["success"])
                           m.reply(
                              `berhasil menambah domain\nip: ${e["ip"]}\nhostname: ${e["name"]}`
                           );
                        else
                           m.reply(
                              `gagal membuat subdomain\nMsg: ${e["error"]}`
                           );
                     });
                  }
                  break;
               case "domain4":
                  {
                     if (!isCreator)
                        return m.reply(
                           `Halo Kak ${pushname} Maaf nih akses domain khusus seller yg telah membuy Terimakasih 🙏`
                        );
                     function subDomain1(host, ip) {
                        return new Promise((resolve) => {
                           let zone = "3c031e253f4b66278b2fded6a971bb22";
                           let apitoken =
                              "p-KWllgzVN2JqJCQ25ay1s1nMUXo5wOItpLcZzkl";
                           let tld = "panel-store.me";
                           axios
                              .post(
                                 `https://api.cloudflare.com/client/v4/zones/${zone}/dns_records`,
                                 {
                                    type: "A",
                                    name:
                                       host.replace(/[^a-z0-9.-]/gi, "") +
                                       "." +
                                       tld,
                                    content: ip.replace(/[^0-9.]/gi, ""),
                                    ttl: 3600,
                                    priority: 10,
                                    proxied: false,
                                 },
                                 {
                                    headers: {
                                       Authorization: "Bearer " + apitoken,
                                       "Content-Type": "application/json",
                                    },
                                 }
                              )
                              .then((e) => {
                                 let res = e.data;
                                 if (res.success)
                                    resolve({
                                       success: true,
                                       zone: res.result?.zone_name,
                                       name: res.result?.name,
                                       ip: res.result?.content,
                                    });
                              })
                              .catch((e) => {
                                 let err1 =
                                    e.response?.data?.errors?.[0]?.message ||
                                    e.response?.data?.errors ||
                                    e.response?.data ||
                                    e.response ||
                                    e;
                                 let err1Str = String(err1);
                                 resolve({
                                    success: false,
                                    error: err1Str,
                                 });
                              });
                        });
                     }
                     let raw1 = args?.join(" ")?.trim();
                     if (!raw1) return m.reply("mana host & ip nya?");
                     let host1 = raw1
                        .split("|")[0]
                        .trim()
                        .replace(/[^a-z0-9.-]/gi, "");
                     if (!host1)
                        return m.reply(
                           "host tidak valid, pastikan host hanya mengandung huruf, angka, - (strip), dan . (titik)"
                        );
                     let ip1 = raw1.split("|")[1]?.replace(/[^0-9.]/gi, "");
                     if (!ip1 || ip1.split(".").length < 4)
                        return m.reply(ip1 ? "ip tidak valid" : "mana ip nya");
                     subDomain1(host1, ip1).then((e) => {
                        if (e["success"])
                           m.reply(
                              `berhasil menambah domain\nip: ${e["ip"]}\nhostname: ${e["name"]}`
                           );
                        else
                           m.reply(
                              `gagal membuat subdomain\nMsg: ${e["error"]}`
                           );
                     });
                  }
                  break;
               default: {
                  if (budy.startsWith("=>")) {
                     if (!isCreator) return m.reply(mess.owner);
                     function Return(sul) {
                        sat = JSON.stringify(sul, null, 2);
                        bang = util.format(sat);
                        if (sat == undefined) {
                           bang = util.format(sul);
                        }
                        return m.reply(bang);
                     }
                     try {
                        m.reply(
                           util.format(
                              eval(
                                 `(async () => { return ${budy.slice(3)} })()`
                              )
                           )
                        );
                     } catch (e) {
                        m.reply(String(e));
                     }
                  }
                  if (budy.startsWith(">")) {
                     if (!isCreator) return m.reply(mess.owner);
                     try {
                        let evaled = await eval(budy.slice(2));
                        if (typeof evaled !== "string")
                           evaled = require("util").inspect(evaled);
                        await m.reply(evaled);
                     } catch (err) {
                        await m.reply(String(err));
                     }
                  }
                  if (budy.startsWith("$")) {
                     if (!isCreator) return m.reply(mess.owner);
                     exec(budy.slice(2), (err, stdout) => {
                        if (err) return m.reply(err);
                        if (stdout) return m.reply(stdout);
                     });
                  }
               }
            }
      }
   } catch (err) {
      console.log(chalk.redBright("[ERROR]: " + util.format(err) + "\n"));
   }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
   fs.unwatchFile(file);
   console.log(chalk.green(`[FILE]: Update ${__filename}`));
   delete require.cache[file];
   require(file);
});
