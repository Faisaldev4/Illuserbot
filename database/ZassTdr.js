require("../ZassTdrqr/ZassTdrsettings");
const API = (name, path = "/", query = {}, apikeyqueryname) =>
  (name in APIs ? APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? "?" +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? { [apikeyqueryname]: APIKeys[name in APIs ? APIs[name] : name] }
            : {}),
        })
      )
    : "");
const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("baileys");
const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");
const { exec, spawn, execSync } = require("child_process");
const os = require("os");
const chalk = require("chalk");
const crypto = require("crypto");
const axios = require("axios");
const speed = require("performance-now");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const request = require("request");
const Jimp = require("jimp");
const { Primbon } = require("scrape-primbon");
const primbon = new Primbon();
const util = require("util");
const { sizeFormatter } = require("human-readable");
const ffmpeg = require("fluent-ffmpeg");
const yts = require("yt-search")
const format = sizeFormatter();
const { tiktokdl } = require("./lib/tiktok");
const { color, bgcolor, mycolor } = require("./lib/color");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
} = require("./lib/exif");
const { ytMp4, ytMp3, ytPlay } = require("./lib/yotube");
const { instagram } = require("./lib/instagram");
const { pornvid } = require("./lib/scraper");
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
  fetchJson,
  getBuffer,
  jsonformat,
  parseMention,
  getCase,
  getRandom,
} = require("./lib/functions");
const scrapper = require("./lib/scrapper");
const addusrp = JSON.parse(fs.readFileSync("./ZassTdrjs/database/user.json"));
const banned = JSON.parse(fs.readFileSync("./ZassTdrjs/database/banned.json"));
const cheerio = require("cheerio");
const xfar = require("xfarr-api");
const si = require("systeminformation");
const osu = require("node-os-utils");
const { performance } = require("perf_hooks");
const cp = require("child_process");

const { promisify } = require("util");
const setting = JSON.parse(fs.readFileSync("./ZassTdrjs/database/key.json"));
const bad = JSON.parse(fs.readFileSync("./ZassTdrjs/database/bad.json"));

module.exports = ZassTdr = async (ZassTdr, m, msg, chatUpdate, store) => {
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
    const budy = typeof m.text == "string" ? m.text : "";
    const prefix = /^[°#+,.?=''():√%!¢£¥€π¤ΠΦ_&`™️©️®️Δ^βα¦|/\\©️^]/.test(body)
      ? body.match(/^[°#+,.?=''():√%¢£¥€π¤ΠΦ_&!™️©️®️Δ^βα¦|/\\©️^]/gi)
      : ".";
    const content = JSON.stringify(m.message);
    const { type, quotedMsg, mentioned, now, fromMe } = m;
    const isCmd = body.startsWith(prefix);
    const from = m.key.remoteJid;
    const command = body
      .replace(prefix, "")
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await ZassTdr.decodeJid(ZassTdr.user.id);
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const itsMe = m.sender == botNumber ? true : false;
    const q = args.join(" ");
    let text = args.join(" ");
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || "";

    const tanggal = moment.tz("Asia/Jakarta").format("DD/MM/YY");
    const jam = moment.tz("asia/jakarta").format("HH:mm:ss");
    const isBan = banned.includes(m.sender);
    const isGroup = m.key.remoteJid.endsWith("@g.us");
    const sender = m.isGroup
      ? m.key.participant
        ? m.key.participant
        : m.participant
      : m.key.remoteJid;
    const groupMetadata = m.isGroup
      ? await ZassTdr.groupMetadata(m.chat).catch((e) => {})
      : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";
    const participants = m.isGroup ? await groupMetadata.participants : "";
    const groupAdmins = m.isGroup
      ? await participants.filter((v) => v.admin !== null).map((v) => v.id)
      : "";
    const groupOwner = m.isGroup ? groupMetadata.owner : "";
    const groupMembers = m.isGroup ? groupMetadata.participants : "";
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false;
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false;
    const AntiNsfw = m.isGroup ? groupAdmins.includes(m.sender) : false;

    ///antilink
    const sendMediaURL = async (to, url, text = "", mids = []) => {
      if (mids.length > 0) {
        text = (to, text, mids);
      }
      const fn = Date.now() / 10000;
      const filename = fn.toString();
      let mime = "";
      var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
          mime = res.headers["content-type"];
          request(uri)
            .pipe(fs.createWriteStream(filename))
            .on("close", callback);
        });
      };
      download(url, filename, async function () {
        console.log("done");
        let media = fs.readFileSync(filename);
        let type = mime.split("/")[0] + "Message";
        if (mime === "image/gif") {
          type = MessageType.video;
          mime = Mimetype.gif;
        }
        if (mime.split("/")[0] === "audio") {
          mime = Mimetype.mp4Audio;
        }
        ZassTdr.sendMessage(to, media, type, {
          mimetype: mime,
          caption: text,
          contextInfo: { mentionedJid: mids },
        });
        fs.unlinkSync(filename);
      });
    };

    //antilink
    if (db.data.chats[m.chat]) {
      if (budy.match(`https://`, `http://`)) {
        if (!isBotAdmins) return;
        if (isCreator) return;
        await ZassTdr.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.sender,
          },
        });
      }
    }
    //wame
    if (!ZassTdr.public) {
      if (!m.key.fromMe) return;
    }

    if (isCmd && m.isGroup) {
      console.log(
        chalk.bold.rgb(
          255,
          178,
          102
        )("\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]"),
        chalk.bold.rgb(153, 255, 153)(command),
        chalk.bold.rgb(204, 204, 0)("from"),
        chalk.bold.rgb(153, 255, 204)(pushname),
        chalk.bold.rgb(204, 204, 0)("in"),
        chalk.bold.rgb(255, 178, 102)("Group Chat"),
        chalk.bold("[" + args.length + "]")
      );
    }
    if (isCmd && !m.isGroup) {
      console.log(
        chalk.bold.rgb(
          255,
          178,
          102
        )("\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]"),
        chalk.bold.rgb(153, 255, 153)(command),
        chalk.bold.rgb(204, 204, 0)("from"),
        chalk.bold.rgb(153, 255, 204)(pushname),
        chalk.bold.rgb(204, 204, 0)("in"),
        chalk.bold.rgb(255, 178, 102)("Private Chat"),
        chalk.bold("[" + args.length + "]")
      );
    }

    try {
      ppuser = await ZassTdr.profilePictureUrl(m.sender, "image");
    } catch (err) {
      ppuser =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
    }
    ppnyauser = await getBuffer(ppuser);

    const generateProfilePicture = async (buffer) => {
      const jimp_1 = await Jimp.read(buffer);
      const resz =
        jimp_1.getWidth() > jimp_1.getHeight()
          ? jimp_1.resize(550, Jimp.AUTO)
          : jimp_1.resize(Jimp.AUTO, 650);
      const jimp_2 = await Jimp.read(await resz.getBufferAsync(Jimp.MIME_JPEG));
      return {
        img: await resz.getBufferAsync(Jimp.MIME_JPEG),
      };
    };

    global.addUserPanel = (email, username, expired, _db) => {
      var obj_add = {
        email: email,
        username: username,
        expired: expired,
      };
      _db.push(obj_add);
      fs.writeFileSync(
        "./ZassTdrjs/database/user.json",
        JSON.stringify(_db, null, 3)
      );
    };

    let isNumber = (x) => typeof x === "number" && !isNaN(x);
    let user = global.db.data.users[m.sender];
    if (typeof user !== "object") global.db.data.users[m.sender] = {};
    if (user) {
      if (!isNumber(user.afkTime)) user.afkTime = -1;
      if (!("afkReason" in user)) user.afkReason = "";
    } else
      global.db.data.users[m.sender] = {
        afkTime: -1,
        afkReason: "",
      };
    let mentionUser = [
      ...new Set([
        ...(m.mentionedJid || []),
        ...(m.quoted ? [m.quoted.sender] : []),
      ]),
    ];
    for (let jid of mentionUser) {
      let user = global.db.data.users[jid];
      if (!user) continue;
      let afkTime = user.afkTime;
      if (!afkTime || afkTime < 0) continue;
      let reason = user.afkReason || "";
      m.reply(
        `Jangan tag dia!
Dia sedang AFK ${reason ? "dengan alasan " + reason : "tanpa alasan"}
Selama ${clockString(new Date() - afkTime)}
`.trim()
      );
    }
    if (global.db.data.users[m.sender].afkTime > -1) {
      let user = global.db.data.users[m.sender];
      m.reply(
        `
Hello Saya Bot ZassTdr${user.afkReason ? "" + user.afkReason : ""}
Selama ${clockString(new Date() - user.afkTime)}
`.trim()
      );
      user.afkTime = -1;
      user.afkReason = "";
    }
    const more = String.fromCharCode(8206);
    const readmore = more.repeat(4001);
    //___________________[ TIME&DATE ]___________________//
    const hariini = moment.tz("Asia/Jakarta").format("dddd, DD MMMM YYYY");
    const barat = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    const tengah = moment.tz("Asia/Makassar").format("HH:mm:ss");
    const timur = moment.tz("Asia/Jayapura").format("HH:mm:ss");
    const time2 = moment().tz("Asia/Jakarta").format("HH:mm:ss");
    if (time2 < "23:59:00") {
      var ucapanWaktu = "Selamat Malam 🌌";
    }
    if (time2 < "19:00:00") {
      var ucapanWaktu = "Selamat Sore 🌃";
    }
    if (time2 < "18:00:00") {
      var ucapanWaktu = "Selamat Sore 🌅";
    }
    if (time2 < "15:00:00") {
      var ucapanWaktu = "Selamat Siang 🏙";
    }
    if (time2 < "11:00:00") {
      var ucapanWaktu = "Selamat Pagi 🌄";
    }
    if (time2 < "05:00:00") {
      var ucapanWaktu = "Selamat Pagi 🌉";
    }
    const tahunBaru = new Date("January 1, 2024 00:00:00");
    const sekarang = new Date().getTime();
    const Selisih = tahunBaru - sekarang;
    const jhari = Math.floor(Selisih / (1000 * 60 * 60 * 24));
    const jjam = Math.floor(
      (Selisih % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const jmenit = Math.floor((Selisih % (1000 * 60 * 60)) / (1000 * 60));
    const jdetik = Math.floor((Selisih % (1000 * 60)) / 1000);
    const ulngthn = new Date("October 31, 2023 00:00:00");
    const ayeuna = new Date().getTime();
    const ceIroh = ulngthn - ayeuna;
    const hahari = Math.floor(ceIroh / (1000 * 60 * 60 * 24));
    const hajam = Math.floor(
      (ceIroh % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const hamenit = Math.floor((ceIroh % (1000 * 60 * 60)) / (1000 * 60));
    const hadetik = Math.floor((ceIroh % (1000 * 60)) / 1000);
    const idulAdha = new Date("Juni 29, 2023 00:00:00");
    const nembe = new Date().getTime();
    const ceDadah = idulAdha - nembe;
    const hihari = Math.floor(ceDadah / (1000 * 60 * 60 * 24));
    const hijam = Math.floor(
      (ceDadah % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const himenit = Math.floor((ceDadah % (1000 * 60 * 60)) / (1000 * 60));
    const hidetik = Math.floor((ceDadah % (1000 * 60)) / 1000);
    //Downloader functions

    const ff = {
      key: {
        participant: `0@s.Ardian.net`,
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
        console.log(color("Download Audio With ytdl-core"));
        ytdl(Link, { filter: "audioonly" })
          .pipe(fs.createWriteStream(mp3File))
          .on("finish", async () => {
            await ZassTdr.sendMessage(
              from,
              {
                document: fs.readFileSync(mp3File),
                jpegThumbnail: ytmp3,
                mimetype: "audio/mp3",
                fileName: `${lot.all[0].title}.mp3`,
                caption: `Download With Zass`,
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
        console.log(color("Download Video With ytdl-core"));
        let nana = ytdl(Link)
          .pipe(fs.createWriteStream(mp4File))
          .on("finish", async () => {
            await ZassTdr.sendMessage(
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

    //end of functions

    switch (command) {
      case "play":
        {
          if (!text)
            return m.reply(`Example : ${prefix + command} Cita citata meriang`);
          let search = await yts(`${text}`);
          let res = search;
          let todd = await getBuffer(res.all[0].thumbnail);
          let caption = `*YOUTUBE RESULT*

⪼ Judul : ${res.all[0].title}
⪼ Deskripsi : ${res.videos[0].description}
⪼ Channel : ${res.all[0].author && res.all[0].author.name}
⪼ Durasi : ${res.all[0].timestamp}
⪼ Upload : ${res.all[0].ago}
⪼ Link : ${res.videos[0].url}
⪼ Penonton : ${res.all[0].views}`;
          ZassTdr.sendMessage(
            m.chat,
            {
              document: fs.readFileSync("./src/doc.xlsx"),
              jpegThumbnail: thumb,
              fileName: `Download With Zass`,
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
            { quoted: ff }
          );
          await m.reply(`Video Dan Audio Sedang Di Download`);
          await sleep(3000);
          await downloadMp4(`${res.videos[0].url}`);
          await sleep(3000);
          await downloadMp3(`${res.videos[0].url}`);
        }
        break;
      case "ytmp4":
      case "mp4":
      case "ytv":
        {
          if (!text) return m.reply("Link Mana?");
          downloadMp4(text);
        }
        break;
      case "ytmp3":
      case "mp3":
      case "yta":
        {
          if (!text) return m.reply(mess.wait);
          downloadMp3(text);
        }
        break;

      //________________________________[  MENUNYA ]_____________________________________//
      case "totalfiture":
        {
          if (!isCreator) return m.reply(`dih sok asik`);
          fs.readFile("./ZassTdrjs/ZassTdr.js", "utf8", (err, data) => {
            if (err) throw err;
            let regex = /case\s"(\w+)"/g;
            let match,
              caseNames = [];
            while ((match = regex.exec(data)) !== null) {
              caseNames.push(match[1]);
            }
            let output = "• " + caseNames.join("\n• ");
            m.reply(
              `*Total Fiture : ${caseNames.length} \n\n*FITURE MASI SEDIKIT KALO MAU BANYAK DI YT NJG*`
            );
          });
        }
        break;
      //=================== YT DOWN =========================//
      case "nfsw":
      case "nsfw":
        {
          m.reply(`Sianj Sange,Sabar Anj!!\nawkaowkwo`);
          var ano = await fetchJson(
            "https://raw.githubusercontent.com/anamnich/Databasee/main/nsfw/nsfwloli.json"
          );
          try {
            var wifegerakx = ano[Math.floor(Math.random() * ano.length)];
            let encmedia = await ZassTdr.sendMessage(
              m.chat,
              { image: { url: `${wifegerakx}` }, caption: `Nih Bahan colinya` },
              { quoted: m }
            );
          } catch (e) {
            m.reply(`Eror Anj`);
          }
        }
        break;
      //=================== INFO GC =========================//
      case "infogc":
      case "infogrup":
      case "infogroup":
        {
          if (!isGroupAdmins)
            return m.repy("Hanya Bisa Digunakan Admin Kocak :v");
          var owngc = groupMetadata.owner;
          var caption = `*[ ${groupMetadata.subject} ]*\n\n*Nama Grup :* ${
            groupMetadata.subject
          }\n*Pemilik Grup :* @${
            owngc.split("@")[0]
          }\n*Di Buat Pada :* ${moment(`${groupMetadata.creation}` * 1000)
            .tz("Asia/Jakarta")
            .format("DD/MM/YYYY HH:mm:ss")}\n*Jumlah Member :* ${
            groupMembers.length
          }\n*Jumlah Admin :* ${groupAdmins.length}\n*Deskripsi :* ${
            groupMetadata.desc
          }`;
          ZassTdr.profilePictureUrl(from, "image")
            .then((res) =>
              ZassTdr.sendMessage(
                from,
                { caption: caption, image: { url: res }, mentions: [owngc] },
                { quoted: m }
              )
            )
            .catch(() =>
              ZassTdr.sendMessage(
                from,
                {
                  caption: caption,
                  image: { url: `https://i.ibb.co/YZdzhGt/522cd54e9767.jpg` },
                  mentions: [owngc],
                },
                { quoted: m }
              )
            );
        }
        break;
      //=================== GET CASE =========================//
      case "getcase":
        {
          if (!isCreator) return m.reply("Lu Sapa Njg");
          if (!args[0]) return m.reply(`Example : ${prefix + command} Menu`);
          m.reply(getCase(args[0]));
        }
        break;
      //=================== WETON =========================//
      case "weton":
      case "wetonjawa":
        {
          if (!text) throw `Example : ${prefix + command} 13, 4, 2004`;
          let [tgl, bln, thn] = text.split`,`;
          let anu = await primbon.weton_jawa(tgl, bln, thn);
          if (anu.status == false) return m.reply(anu.message);
          ZassTdr.sendText(
            m.chat,
            `⭔ *Tanggal :* ${anu.message.tanggal}\n⭔ *Jumlah Neptu :* ${anu.message.jumlah_neptu}\n⭔ *Watak Hari :* ${anu.message.watak_hari}\n⭔ *Naga Hari :* ${anu.message.naga_hari}\n⭔ *Jam Baik :* ${anu.message.jam_baik}\n⭔ *Watak Kelahiran :* ${anu.message.watak_kelahiran}`,
            m
          );
        }
        break;
      //=================== HENTAI =========================//
      case "hentai2":
      case "nwaifu":
        if (!quoted) return `*Ngetik Yg Bener Dek!!* ${prefix + command}`;
        m.reply("si anying sangean");
        var w = await axios.get(`https://waifu.pics/api/nsfw/waifu`);
        let button4Messages = {
          image: { url: w.data.url },
          caption: `NIH MEK BUAT BAHAN COLI`,
          headerType: 1,
        };
        await ZassTdr.sendMessage(m.chat, button4Messages, { quoted: m }).catch(
          (err) => {
            return "Error!";
          }
        );
        break;
      //=================== HENTAI =========================//
      case "hentai1":
      case "hneko":
        m.reply(`Sabar Njg`);
        var waifudd = await axios.get(`https://waifu.pics/api/nsfw/neko`);
        let button3Messages = {
          image: { url: waifudd.data.url },
          caption: `NIH MEK BUAT BAHAN COLI`,
          headerType: 1,
        };
        await ZassTdr.sendMessage(m.chat, button3Messages, { quoted: m }).catch(
          (err) => {
            return "Error!";
          }
        );
        break;
      //=================== TTS =========================//
      case "tts":
      case "gtts":
        if (!q) return m.reply(` contoh : ${prefix + command} yamate kudasai`);
        const gtts = require("./lib/gtts")(`id`, q);
        var bby = args.join(" ");
        var ranm = getRandom(".mp3");
        var rano = getRandom(".ogg");
        bby.length > 300
          ? m.reply("Teks nya terlalu panjang kak")
          : gtts.save(ranm, bby, function () {
              exec(
                `ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`,
                (err) => {
                  fs.unlinkSync(ranm);
                  var buff = fs.readFileSync(rano);
                  if (err) return m.reply(`eror banh`);
                  ZassTdr.sendMessage(
                    m.chat,
                    { audio: buff, mimetype: "audio/mpeg", ptt: true },
                    { quoted: m }
                  );
                  fs.unlinkSync(rano);
                }
              );
            });
        break;
      //=================== TTP =========================//
      case "ttp2":
      case "ttp":
        {
          if (!q) return m.reply(`Contoh:\n${prefix + command} saya wibu`);
          var nyz1 = await getBuffer(
            `https://api.lolhuman.xyz/api/${command}?apikey=anakasu&text=${text}`
          );
          fs.writeFileSync("getpp.jpeg", nyz1);
          await ffmpeg("getpp.jpeg")
            .input("getpp.jpeg")
            .on("error", function (error) {
              only("error", ZassTdr, from);
            })
            .on("end", function () {
              ZassTdr.sendMessage(from, {
                sticker: { url: "./getpp.webp" },
                mimetype: "image/webp",
              });
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save("./getpp.webp");
          await sleep(5000);
          fs.unlinkSync("./getpp.jpeg");
          fs.unlinkSync("./getpp.webp");
        }
        break;
      //=================== TIKTOK =========================//
      case "tiktoknowm":
      case "tiktok":
      case "tt":
        {
          if (!text) return m.reply("Mana Link nya");
          ZassTdr.sendMessage(m.chat, { react: { text: ["🕐"], key: m.key } });
          let data = await fetchJson(
            `https://api.lolhuman.xyz/api/tiktok?apikey=anakasu&url=${text}`
          );
          try {
            var buttonMessage = {
              video: { url: data.result.link },
              caption: `*TIKTOK DOWNLOAD*

🌺: *Title* : ${data.result.title}
🌺: *URL Video* : ${text}

╔═══《 *ᥴ᥅ꫀꪖꪻꪮ᥅* 》═══⊱
╠❏ ZassTdr Official { VCJ }
╚════[ ᄃﾘﾑﾑ ]══════`,
              footer: `ZassTdr Store`,
              headerType: 5,
            };
            ZassTdr.sendMessage(m.chat, buttonMessage, { quoted: m });
            ZassTdr.sendMessage(m.chat, {
              react: { text: ["✅"], key: m.key },
            });
          } catch (e) {
            m.reply(`Eror Bangsat URL Gak Valid Atau Fitur Sedang Eror`);
          }
        }
        break;
      //=================== BOKEP =========================//
      case "bokep":
        {
          if (!isGroup)
            return m.reply("Di group aja ngentod!! Biar dosanya kesebar..");
          m.reply(`sabar bang`);
          let boks = Date.now();
          let bok = await scrapper.pornvid();
          let bokt = `BOKEP

┬╗ Judul    : ${bok.hasil.title}
┬╗ Upload   : ${bok.hasil.upload}
┬╗ Views    : ${bok.hasil.views}
┬╗ Like     : ${bok.hasil.like}
┬╗ Dislike  : ${bok.hasil.dislike}
┬╗ Favorite : ${bok.hasil.favorite}
┬╗ Tag      : ${bok.hasil.tags}
┬╗ Source   : ${bok.hasil.source}`;
          sendMediaURL(
            m.chat,
            from,
            "https://tikporntok.com/" + bok.hasil.thumb,
            bokt
          );
          sendMediaURL(
            m.chat,
            from,
            "https://tikporntok.com/" + bok.hasil.video,
            monospace(
              `Process ${((Date.now() - boks) / 1000).toFixed(1)} Seconds`
            )
          );
        }
        break;
      //=================== RESTART =========================//
      case "restart":
        {
          if (!isCreator) throw `Lusiapa Anj,Mau Restart Bot...?`;
          await m.reply("Bot Akan Restart...").then(async () => {
            //await props.save()
            process.send("reset");
          });
        }
        break;
      //=================== PUSH MEM =========================//
      case "push":
        {
          if (!isCreator) return;
          if (!m.isGroup) return;
          if (!q) return m.reply(`text?`);
          m.reply(`gasss`);
          var mem = await participants
            .filter((v) => v.id.endsWith(".net"))
            .map((v) => v.id);
          m.reply(`dah mex`);
          for (let pler of mem) {
            ZassTdr.sendMessage(pler, { text: q });
          }
        }
        break;
      //=================== MTK =========================//
      case "tambah":
        if (!q)
          return m.reply(
            `Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`
          );
        var num_one = q.split(" ")[0];
        var num_two = q.split(" ")[1];
        if (!num_one)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${prefix + command} 1 2`
          );
        if (!num_two)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${prefix + command} 1 2`
          );
        var nilai_one = Number(num_one);
        var nilai_two = Number(num_two);
        m.reply(`${nilai_one + nilai_two}`);
        break;
      case "kurang":
        if (!q)
          return m.reply(
            `Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`
          );
        var num_one = q.split(" ")[0];
        var num_two = q.split(" ")[1];
        if (!num_one)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${prefix + command} 1 2`
          );
        if (!num_two)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${prefix + command} 1 2`
          );
        var nilai_one = Number(num_one);
        var nilai_two = Number(num_two);
        m.reply(`${nilai_one - nilai_two}`);
        break;
      case "kali":
        if (!q)
          return m.reply(
            `Gunakan dengan cara ${command} *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`
          );
        var num_one = q.split(" ")[0];
        var num_two = q.split(" ")[1];
        if (!num_one)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${prefix + command} 1 2`
          );
        if (!num_two)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${prefix + command} 1 2`
          );
        var nilai_one = Number(num_one);
        var nilai_two = Number(num_two);
        m.reply(`${nilai_one * nilai_two}`);
        break;
      case "bagi":
        if (!q)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${command} 1 2`
          );
        var num_one = q.split(" ")[0];
        var num_two = q.split(" ")[1];
        if (!num_one)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${prefix + command} 1 2`
          );
        if (!num_two)
          return m.reply(
            `Gunakan dengan cara ${
              prefix + command
            } *angka* *angka*\n\n_Contoh_\n\n${prefix + command} 1 2`
          );
        var nilai_one = Number(num_one);
        var nilai_two = Number(num_two);
        m.reply(`${nilai_one / nilai_two}`);
        break;
      //=================== JADI ANIME =========================//
      case "jadianime":
        {
          if (!quoted)
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          if (!/image/.test(mime))
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          m.reply("Anj Ada Wibu,Sabar Lagi Dibuat...");
          let { TelegraPh } = require("../ZassTdrjs/lib/uploader");
          let media = await ZassTdr.downloadAndSaveMediaMessage(quoted);
          let anu = await TelegraPh(media);
          try {
            let linknya = `https://api.caliph.biz.id/api/animeai?img=${anu}&apikey=caliphkey`;
            let bocor = await ZassTdr.sendMessage(
              m.chat,
              { image: { url: linknya }, caption: "Ih Wibu..." },
              { quoted: m }
            );
          } catch (e) {
            m.reply("Eror Anj Wajah Lu Kek Binatang...");
          }
        }
        break;
      //=================== GET =========================//
      case "get":
        if (!isCreator) return m.reply("Khusus Owner!!!");
        if (!q) return m.reply("linknya?");
        fetch(`${args[0]}`)
          .then((res) => res.text())
          .then((bu) => {
            m.reply(bu);
          });
        break;
      //=================== QC =========================//
      case "qc":
        {
          if (!text) throw `Example : ${prefix + command} hello`;
          try {
            ppuser = await ZassTdr.profilePictureUrl(m.sender, "image");
          } catch (err) {
            ppuser =
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
          }
          ppnyauser = await getBuffer(ppuser);
          let json = {
            type: "quote",
            format: "png",
            backgroundColor: "#FFFFFF",
            width: 768,
            height: 1152,
            scale: 2,
            messages: [
              {
                entities: [],
                avatar: true,
                from: {
                  id: 1,
                  name: `${pushname}`,
                  photo: {
                    url: `${ppuser}`,
                  },
                },
                text: `${text}`,
                replyMessage: {},
              },
            ],
          };
          let res = await axios.post(
            "https://bot.lyo.su/quote/generate",
            json,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          let buffer = Buffer.from(res.data.result.image, "base64");
          //await riyan.sendMessage(m.chat, { image: buffer }, m)
          let encmedia = await ZassTdr.sendImageAsSticker(m.chat, buffer, m, {
            packname: global.packname,
            author: global.author,
          });
        }
        break;
      //=================== MODE SELEP =========================//
      case "soff":
        {
          if (!isCreator) return m.reply("Lu Sapa Njg");
          ZassTdr.public = true;
          m.reply("*Mode Selep Off*");
        }
        break;

      case "son":
        {
          if (!isCreator) return m.reply("Lu Sapa Njg");
          ZassTdr.public = false;
          m.reply('*Mode Selep Aktif Njg Gausa Menu"*');
        }
        break;
      //=================== TO MP3 =========================//
      case "toaud":
      case "tomp3":
      case "toaudio":
        {
          if (!/video/.test(mime) && !/audio/.test(mime))
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
              prefix + command
            }`;
          if (!quoted)
            throw `Kirim/Reply Video/Audio Yang Ingin Dijadikan Audio Dengan Caption ${
              prefix + command
            }`;
          m.reply("Sabar Anj!!!");
          //try {
          let media = await quoted.download();
          let { toAudio } = require("../ZassTdrjs/lib/converter");
          let audio = await toAudio(media, "mp4");
          ZassTdr.sendMessage(
            m.chat,
            {
              document: audio,
              mimetype: "audio/mpeg",
              fileName: `Convert By ZassTDR.mp3`,
            },
            { quoted: m }
          );
        }
        break;
      //=================== COSPLAY =========================//
      case "waifu":
      case "loli":
      case "husbu":
      case "milf":
      case "cosplay":
      case "wallml":
        m.reply(`Sabar Njg`);
        let wipu = (
          await axios.get(
            `https://raw.githubusercontent.com/Arya-was/endak-tau/main/${command}.json`
          )
        ).data;
        let wipi = wipu[Math.floor(Math.random() * wipu.length)];
        ZassTdr.sendMessage(
          m.chat,
          { image: { url: wipi }, caption: `${command}` },
          { quoted: m }
        );
        break;
      //=================== PINTRES =========================//
      case "pin":
      case "pinterest":
        {
          m.reply(`Jangan halu monyet`);
          let { pinterest } = require("../ZassTdrjs/lib/scraper");
          let anu = await pinterest(text);
          var result = anu[Math.floor(Math.random() * anu.length)];
          var buttons = [
            {
              buttonId: `pin ${text}`,
              buttonText: { displayText: "Next Image" },
              type: 1,
            },
          ];
          var buttonMessage = {
            image: { url: `${result}` },
            caption: `*-------「 GIMAGE SEARCH 」-------*\n
*Query* : ${text}`,
            footer: `ZassTdr Official`,
            /*buttons: buttons,*/
            headerType: 4,
          };
          ZassTdr.sendMessage(m.chat, buttonMessage, { quoted: m });
        }
        break;
      //=================== MP4 TO MP3 =========================//
      case "mp3":
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
          m.reply(`Sabar Anj!!!`);
          //try {
          let media = await quoted.download();
          let { toAudio } = require("../ZassTdrjs/lib/converter");
          let audio = await toAudio(media, "mp4");
          ZassTdr.sendMessage(
            m.chat,
            {
              document: audio,
              mimetype: "audio/mpeg",
              fileName: `Convert By ZassTdr.mp3`,
            },
            { quoted: m }
          );
          //} catch (e) {
          //m.reply(`Eror Bangsat`)}
        }
        break;
      //=================== OPEN AI =========================//
      case "ai":
        try {
          if (
            setting.keyopenai ===
            "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"
          )
            return;
          m.reply("Sabar Anj!!!");
          if (!text)
            return m.reply(
              `Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`
            );
          const configuration = new Configuration({
            apiKey: setting.keyopenai,
          });
          const openai = new OpenAIApi(configuration);
          const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.3,
            max_tokens: 2000,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
          });
          m.reply(`${response.data.choices[0].text}`);
        } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :" + error.message);
          }
        }
        break;
      //=================== DELETE CHAT WA =========================//
      case "delc":
        {
          if (!isCreator) return m.reply(`Dih Sianj,Fitur Only Admin`);
          if (!m.quoted) throw false;
          let { chat, fromMe, id, isBaileys } = m.quoted;
          if (!chat) throw "reply pesan yang ingin dihapus";
          ZassTdr.sendMessage(m.chat, {
            delete: {
              remoteJid: m.chat,
              fromMe: isBotAdmins ? false : true,
              id: m.quoted.id,
              participant: m.quoted.sender,
            },
          });
        }
        break;
      //=================== UP ADMIN / MEMBER =========================//
      case "demote":
        {
          if (!isAdmins) return m.reply(mess.admin);
          if (!isBotAdmins) return m.reply(mess.botAdmin);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await ZassTdr.groupParticipantsUpdate(m.chat, [users], "demote")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;

      case "promote":
        {
          if (!m.isGroup) return m.reply(mess.group);
          if (!isAdmins) return m.reply(mess.admin);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await ZassTdr.groupParticipantsUpdate(m.chat, [users], "promote")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      //=================== BACKUP BOT =========================//
      case "backup":
        {
          if (!isCreator) throw "Khusus Owner Anj!!!";
          if (m.isGroup) throw "fitur tidak dapat digunakan di grup";
          await m.reply("Sabar Sayang Lagi Ambil Data Backup!!!");
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
                pe != ""
            );
          const exec = await execSync(`zip -r backup_bot.zip ${ls.join(" ")}`);
          await ZassTdr.sendMessage(
            m.chat,
            {
              document: await fs.readFileSync("./backup_bot.zip"),
              mimetype: "application/zip",
              fileName: "backup_bot.zip",
            },
            { quoted: m }
          );
          await execSync("rm -rf backup_bot.zip");
        }
        break;
      //=================== KELUAR GC =========================//
      case "leave":
        {
          if (!isCreator) return;
          await ZassTdr.groupLeave(m.chat)
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      //=================== TURU =========================//
      case "afk":
        {
          let user = global.db.data.users[m.sender];
          user.afkTime = +new Date();
          user.afkReason = text;
          m.reply(`${m.pushName} \nSEDANG AFK ${text ? ": " + text : ""}`);
        }
        break;
      //=================== COUPLE =========================//
      case "couple":
      case "cp":
        {
          await axios
            .get(
              "https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json"
            )
            .then(({ data }) => {
              var random = data[Math.floor(Math.random() * data.length)];
              ZassTdr.sendMessage(
                m.chat,
                { image: { url: random.male }, caption: `Couple Male` },
                { quoted: m }
              );
              ZassTdr.sendMessage(
                m.chat,
                { image: { url: random.female }, caption: `Couple Female` },
                { quoted: m }
              );
            });
        }
        break;
      //=================== IMAGE =========================//
      case "toimage":
      case "toimg":
      case "img":
        {
          if (!quoted) return `Ngetik Yg Bener Dek!! ${prefix + command}`;
          if (!quoted) return "Reply Image";
          if (!/webp/.test(mime))
            throw `Balas sticker dengan caption ${prefix + command}`;
          let media = await ZassTdr.downloadAndSaveMediaMessage(quoted);
          let ran = await getRandom(".png");
          exec(`ffmpeg -i ${media} ${ran}`, (err) => {
            fs.unlinkSync(media);
            if (err) return err;
            let buffer = fs.readFileSync(ran);
            ZassTdr.sendMessage(m.chat, { image: buffer }, { quoted: m });
            fs.unlinkSync(ran);
          });
        }
        break;
      //=================== SMEME =========================//
      case "smeme":
      case "stickermeme":
      case "stickmeme":
        {
          let respond = `Kirim/reply image/sticker dengan caption ${
            prefix + command
          } text1|text2`;
          if (!/image/.test(mime)) throw respond;
          if (!text) throw respond;
          m.reply(`Tunggu Sayang Lagi DiBuatin Stickernya 😘`);
          let atas = text.split("|")[0] ? text.split("|")[0] : "-";
          let bawah = text.split("|")[1] ? text.split("|")[1] : "-";
          let { TelegraPh } = require("./lib/uploader");
          try {
            let mee = await ZassTdr.downloadAndSaveMediaMessage(quoted);
            let mem = await TelegraPh(mee);
            let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(
              atas
            )}/${encodeURIComponent(bawah)}.png?background=${mem}`;
            let awikwok = await ZassTdr.sendImageAsSticker(m.chat, smeme, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(awikwok);
            db.data.users[m.sender].limit -= 1;
          } catch (e) {
            m.reply(`Error\nHarus Pakai Gambar!`);
          }
        }
        break;

      case "sticker":
      case "s":
      case "stickergif":
      case "sgif":
        {
          if (!quoted)
            throw `Balas Video/Image Dengan Caption ${prefix + command}`;
          if (/image/.test(mime)) {
            let media = await quoted.download();
            let encmedia = await ZassTdr.sendImageAsSticker(from, media, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else if (/video/.test(mime)) {
            if ((quoted.msg || quoted).seconds > 11)
              return m.reply("Maksimal 10 detik!");
            let media = await quoted.download();
            let encmedia = await ZassTdr.sendVideoAsSticker(from, media, m, {
              packname: global.packname,
              author: global.author,
            });
            await fs.unlinkSync(encmedia);
          } else {
            throw `Kirim Gambar/Video Dengan Caption ${
              prefix + command
            }\nDurasi Video 1-9 Detik`;
          }
        }
        break;
      //=================== BLOCKIR =========================//
      case "block":
        {
          if (!isCreator) return m.reply(mess.owner);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await ZassTdr.updateBlockStatus(users, "block")
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
          await ZassTdr.updateBlockStatus(users, "unblock")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      //=================== FOTO JADI LINK =========================//
      case "url":
        {
          if (!isCreator) return;
          if (!quoted)
            throw `Kirim/Reply Image Dengan Caption ${prefix + command}`;
          let { TelegraPh } = require("./lib/uploader");
          m.reply(`Sabar Blok LG Gua Proses`);
          if (/image/.test(mime)) {
            let media = await ZassTdr.downloadAndSaveMediaMessage(quoted);
            let anu = await TelegraPh(media);
            let encmedia = await ZassTdr.sendMessage(m.chat, {
              text: `${anu}\n\n Makan tuh link`,
            });
          } else if (/video/.test(mime)) {
            let y = await quoted.download();
            let anu1 = await TelegraPh(y);
            let link = await ZassTdr.sendMessage(m.chat, {
              text: `${anu1}\n\n Makan tuh link`,
            });
          } else {
            m.reply(
              `Mohon Maaf Kemungkinan Server Telegraph Sedang Eror\nCoba Lakukan Beberapa Menit Lagi`
            );
          }
        }
        break;
      //=================== ANTILINK =========================//
      case "antilink":
        {
          if (!m.isGroup) return m.reply(`Harus Didalam Group`);
          if (!isBotAdmins) return m.reply(`Bot Bukan Admin`);
          if (!isAdmins) return m.reply(`Lu Gk Admin Bego`);
          if (args[0] === "on") {
            if (db.data.chats[m.chat])
              return m.reply(`Sudah Aktif kak Sebelumnya`);
            db.data.chats[m.chat] = true;
            m.reply(`Antilink Sekarang Aktif !`);
          } else if (args[0] === "off") {
            if (!db.data.chats[m.chat])
              return m.reply(`Sudah Tidak Aktif Sebelumnya`);
            db.data.chats[m.chat] = false;
            m.reply(`Antilink Sekarang Tidak Aktif !`);
          } else {
            await ZassTdr.sendButtonText(
              m.chat,
              buttons,
              `Mode Antilink`,
              ZassTdr.user.name,
              m
            );
          }
        }
        break;
      //=================== ADD AKUN PANEL =========================//
      case "usr":
        {
          if (!isCreator) return;
          let s = text.split(",");
          if (s.length < 3)
            return m.reply(`usr usernya,paswordnya,mailnya@mail.com`);
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
          let p = await ZassTdr.sendMessage(m.chat, {
            text: `BERIKUT DETAIL AKUN PANEL ANDA
🤺ID USER: ${user.id}
🦖USERNAME: ${username}
🔐PASSWORD: ${passlog}
📬EMAIL : ${mailnya}

🎋LOGIN: ${domain}

🗿TUTORIAL PAKAI SILAHKAN CEK :
youtu.be/TByh5qh43wo`,
          });
        }
        break;

      case "del":
        {
          if (!isCreator)
            return m.reply(
              `Maaf Command Tersebut Khusus Developer Bot WhatsApp`
            );
          let usr = args[0];
          if (!usr) return m.reply("ID nya mana?");
          let f = await fetch(domain + "/api/application/users/" + usr, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res = f.ok
            ? {
                errors: null,
              }
            : await f.json();
          if (res.errors) return m.reply("USER NOT FOUND");
          m.reply("SUCCESSFULLY DELETE THE USER");
        }
        break;
      case "detusr":
        {
          if (!isCreator)
            return m.reply(
              `Maaf Command Tersebut Khusus Developer Bot WhatsApp`
            );
          let usr = args[0];
          let f = await fetch(domain + "/api/application/users/" + usr, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res = await f.json();
          if (res.errors) return m.reply("USER NOT FOUND");
          let u = res.attributes;
          m.reply(`${u.username.toUpperCase()} USER DETAILS

\`\`\`ID: ${u.id}
UUID: ${u.uuid}
USERNAME: ${u.username}
EMAIL: ${u.email}
NAME: ${u.first_name} ${u.last_name}
LANGUAGE: ${u.language}
ADMIN: ${u.root_admin}
CREATED AT: ${u.created_at}\`\`\``);
        }
        break;

      case "srv":
        {
          if (!isCreator) return;
          let cpr = `ZassTdr`;
          let s = text.split(",");
          if (s.length < 4) return m.reply(`srvid,desk,ram,cpu`);
          let desc = s[1] || "";
          let name = cpr;
          let egg = "15";
          let disk = "0";
          let memo = s[2];
          let cpu = s[3];
          let loc = "1";
          let usr_id = s[0];

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
                CMD_RUN: "npm install",
              },
              limits: {
                memory: memo,
                swap: 0,
                disk: disk,
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
          m.reply(`SUCCESSFULLY ADD SERVER

TYPE: ${res.object}

ID: ${server.id}
UUID: ${server.uuid}
NAME: ${server.name}
DESCRIPTION: ${server.description}
MEMORY: ${server.limits.memory === 0 ? "Unlimited" : server.limits.memory} MB
DISK: ${server.limits.disk === 0 ? "Unlimited" : server.limits.disk} MB
CPU: ${server.limits.cpu}%`);
        }
        break;

      case "dels":
        {
          if (!isCreator)
            return m.reply(
              `Maaf Command Tersebut Khusus Developer Bot WhatsApp`
            );
          let srv = args[0];
          if (!srv) return m.reply("ID nya mana?");
          let f = await fetch(domain + "/api/application/servers/" + srv, {
            method: "DELETE",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res = f.ok
            ? {
                errors: null,
              }
            : await f.json();
          if (res.errors) return m.reply("SERVER NOT FOUND");
          m.reply("SUCCESSFULLY DELETE THE SERVER");
        }
        break;
      //=================================================//
      case "detsrv":
        {
          let srv = args[0];
          let f = await fetch(domain + "/api/application/servers/" + srv, {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + apikey,
            },
          });
          let res = await f.json();
          if (res.errors) return m.reply("SERVER NOT FOUND");
          let s = res.attributes;
          let f2 = await fetch(
            domain + "/api/client/servers/" + s.uuid.split`-`[0] + "/resources",
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
          m.reply(`${s.name.toUpperCase()} SERVER DETAILS

STATUS: ${t.current_state}

ID: ${s.id}
UUID: ${s.uuid}
NAME: ${s.name}
DESCRIPTION: ${s.description}
MEMORY: ${await format(t.resources.memory_bytes).toString()} / ${
            s.limits.memory === 0 ? "Unlimited" : s.limits.memory + "MB"
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
      //=================== KICK MEMBER =========================//
      case "k":
      case "kick":
        {
          if (!isGroupAdmins)
            return m.reply("Perintah ini hanya bisa digunakan oleh Admin Grup");
          m.reply(`otw kick`);
          let users = m.mentionedJid[0]
            ? m.mentionedJid[0]
            : m.quoted
            ? m.quoted.sender
            : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
          await ZassTdr.groupParticipantsUpdate(m.chat, [users], "remove")
            .then((res) => m.reply(jsonformat(res)))
            .catch((err) => m.reply(jsonformat(err)));
        }
        break;
      //=================== HIDE TAG =========================//
      case "h":
      case "hidetag":
      case "tag":
        {
          if (!isGroupAdmins)
            return m.reply("Perintah ini hanya bisa digunakan oleh Admin Grup");
          ZassTdr.sendMessage(
            m.chat,
            { text: q ? q : "", mentions: participants.map((a) => a.id) },
            { quoted: m }
          );
        }
        break;

      case "tagall":
        if (!isGroupAdmins && !isCreator)
          return m.reply(`hanya bisa digunakan admin`);
        if (!q) return m.reply(`Teks?`);
        let teks_tagall = `══✪〘 👥 Tag All 〙✪══\n\n${q ? q : ""}\n\n`;
        for (let mem of participants) {
          teks_tagall += `⚘ @${mem.id.split("@")[0]}\n`;
        }
        ZassTdr.sendMessage(from, {
          text: teks_tagall,
          mentions: participants.map((a) => a.id),
        });
        break;
      //=================== VN =========================//
      case "hai":
      case "halo":
      case "kak":
      case "bang":
      case "bng":
      case "hi":
      case "alo":
      case "zass":
      case "min":
      case "mas":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/vn/kenapa.mp3");
          await ZassTdr.sendMessage(
            m.chat,
            { audio: menump3, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;
      case "p":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/vn/nanya.mp3");
          await ZassTdr.sendMessage(
            m.chat,
            { audio: menump3, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;

      case "kamu":
      case "gitu":
      case "gak boleh":
      case "gak jadi":
      case "gak mau":
      case "gak usah":
      case "gak jadi":
      case "gpp":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/vn/Iyakah.mp3");
          await ZassTdr.sendMessage(
            m.chat,
            { audio: menump3, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;

      case "assalamualaikum":
      case "asalamualaikum":
      case "salam":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/vn/salam.mp3");
          await ZassTdr.sendMessage(
            m.chat,
            { audio: menump3, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;
      case "lusiapa":
      case "siapa":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/vn/lusiapaanjir.mp3");
          await ZassTdr.sendMessage(
            m.chat,
            { audio: menump3, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;
      case "mau":
      case "minta":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/vn/gamau.mp3");
          await ZassTdr.sendMessage(
            m.chat,
            { audio: menump3, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;

      case "desah":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/sound/desah.mp3");
          await ZassTdr.sendMessage(
            m.chat,
            { audio: menump3, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;

      case "desah1":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/sound/desah1.mp3");
          await ZassTdr.sendMessage(
            m.chat,
            { audio: menump3, mimetype: "audio/mpeg", ptt: true },
            { quoted: m }
          );
        }
        break;
      //=================== SOUND MENU =========================//
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
        var xeony_buffer = await getBuffer(
          `https://github.com/DGXeon/Tiktokmusic-API/raw/master/tiktokmusic/${command}.mp3`
        );
        await ZassTdr.sendMessage(
          m.chat,
          { audio: xeony_buffer, mimetype: "audio/mp4", ptt: true },
          { quoted: m }
        );
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
      case "sad36":
      case "sad37":
        var xeony_buffer = await getBuffer(
          `https://github.com/ZassTdr/Sound-Sad/raw/main/Sad-Music/${command}.mp3`
        );
        await ZassTdr.sendMessage(
          m.chat,
          { audio: xeony_buffer, mimetype: "audio/mp4", ptt: true },
          { quoted: m }
        );
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
      case "kane10":
        var xeony_buffer = await getBuffer(
          `https://github.com/ZassTdr/Sound-Sad/raw/main/Kane-Music/${command}.mp3`
        );
        await ZassTdr.sendMessage(
          m.chat,
          { audio: xeony_buffer, mimetype: "audio/mp4", ptt: true },
          { quoted: m }
        );
        break;
      //=================== LINK LOGIN PANEL =========================//
      case "llog":
        {
          m.reply(`LINK LOGIN PANEL
https://cs.zass.site`);
        }
        break;
      case "11":
        {
          m.reply(`Jangan Lupa Di Simpan Bukti Tranfer Kalo Panel Modar Bisa Garansi

Tidak Ada Bukti Tranfer = Panel Hangus No Garansi!!`);
        }
        break;
      //=================== LINK GROUP KU =========================//
      case "gcku":
        {
          m.reply(`LINK GROUP KU
https://chat.whatsapp.com/JrlwQ1R2a4aC8JKbQaRFXB`);
        }
        break;
      //=================== RESET LINK GROUP =========================//
      case "r":
        if (!isCreator) return;
        await ZassTdr.groupRevokeInvite(from)
          .then((res) => {
            m.reply(`Sukses menyetel tautan undangan grup ini`);
          })
          .catch(() => m.reply(mess.error.api));
        break;
      //=================== OPEN / CLOSE GROUP =========================//
      case "gc":
      case "group":
        if (!isGroupAdmins)
          return m.reply("Perintah ini hanya bisa digunakan oleh Admin Grup");
        if (!q)
          return m.reply(
            `Kirim perintah #${command} options\nOptions : close & open\nContoh : #${command} close`
          );
        if (args[0] == "c") {
          ZassTdr.groupSettingUpdate(from, "announcement");
          m.reply(
            `Sukses mengizinkan hanya admin yang dapat mengirim pesan ke grup ini`
          );
        } else if (args[0] == "o") {
          ZassTdr.groupSettingUpdate(from, "not_announcement");
          m.reply(
            `Sukses mengizinkan semua peserta dapat mengirim pesan ke grup ini`
          );
        } else {
          m.reply(
            `Kirim perintah #${command} options\nOptions : close & open\nContoh : #${command} close`
          );
        }
        break;
      //=================== LINK GROUP =========================//
      case "lgc":
      case "linkgc":
        if (!isGroupAdmins)
          return m.reply("Perintah ini hanya bisa digunakan oleh Admin Grup");
        var url = await ZassTdr.groupInviteCode(from).catch(() =>
          m.reply(mess.error.api)
        );
        url = "BERIKUT ADALAH LINK GROUP INI\nhttps://chat.whatsapp.com/" + url;
        m.reply(url);
        break;
      //=================== OWNER =========================//
      case "owner":
        {
          ZassTdr.sendContact(m.chat, owner, m);
        }
        break;
      //=================== WEBSITE GW =========================//
      case "web":
        {
          m.reply(
            `HAI KAK BERIKUT ADALAH WESITE RESMI SAYA\nhttps://zassxd.com`
          );
        }
        break;
      //=================== REPLY MASAL =========================//
      case "f":
        {
          await m.reply(`Sok Asik Lu Bgst`);
          await m.reply(`Canda Ngab Lu Asik Kok :v`);
        }
        break;
      //=================================================//
      case "y":
        {
          m.reply(`Si Kntl Ya Ye Ya Ye`);
        }
        break;
      //=================================================//
      case "bot":
        {
          m.reply(`Apa njg mangil" sok asik bat`);
        }
        break;
      //=================================================//
      case "promo":
        {
          m.reply(`Gada Promo`);
        }
        break;
      //=================== PAYMENT =========================//
      case "gopay":
        ZassTdr.sendMessage(
          from,
          {
            image: { url: "https://telegra.ph/file/56fa801ab95ca38c12473.jpg" },
            caption:
              "Silahkan Scan Code Qr Diatas Jangan Lupa Kirim Bukti Transaksinya Ya",
          },
          { quoted: ZassTdr.chat }
        );
        break;

      case "dana":
        ZassTdr.sendMessage(
          from,
          {
            image: { url: "https://telegra.ph/file/c6760a9122c7b3419af3f.jpg" },
            caption:
              "Silahkan Scan Code Qr Diatas Jangan Lupa Kirim Bukti Transaksinya Ya",
          },
          { quoted: ZassTdr.chat }
        );
        break;

      case "shoopepay":
        ZassTdr.sendMessage(
          from,
          {
            image: { url: "https://telegra.ph/file/5c4889c0813f6e96d0d4a.jpg" },
            caption:
              "Silahkan Scan Code Qr Diatas Jangan Lupa Kirim Bukti Transaksinya Ya",
          },
          { quoted: ZassTdr.chat }
        );
        break;

      case "qris":
      case "qr":
        ZassTdr.sendMessage(
          from,
          {
            image: { url: "https://telegra.ph/file/242a212312d2883f12971.jpg" },
            caption:
              "Silahkan Scan Code Qr Diatas +1K Jangan Lupa Kirim Bukti Transaksinya Ya",
          },
          { quoted: ZassTdr.chat }
        );
        break;
      //=================== COUPLE =========================//
      case "i1":
        {
          m.reply(`HARAP DI ISI TERLEBIH DAHULU

TANGAL PEMBELIAN :
RAM YG DI BELI :
SS BUKTI TRANSFER`);
        }
        break;
      //=================================================//
      case "isi":
        {
          await m.reply(`HARAP SALIN DAN ISI DATA DI BAWAH`);
          await m.reply(`usernya,passwordnya,gmailnya`);
          await m.reply(
            `CONTOH:\nzass,zasstdr,zass@gmail.com\n\nJANGAN LUPA PAKAI KOMA ,\nJANGAN ADA SPASI`
          );
        }
        break;
      //=================== LIST PANEL =========================//
      case "listpanel":
      case "buypanel":
      case "panel":
        {
          m.reply(`LIST HARGA PANEL ZASS
📮1 GB 30% CPU 3K/1BULAN
📮2 GB 60% CPU 8K/1BULAN
📮3 GB 80% CPU 13K/1BULAN 
📮4 GB 110% CPU 18K/1BULAN
📮5 GB 140% CPU 23K/1BULAN
📮6 GB 170% CPU 28K/1BULAN
📮7 GB 180% CPU 33K/1BULAN
📮8 GB 190% CPU 53K/1BULAN
📮UNLIMITED GB UNLIMITED% CPU 63k/1BULAN`);
        }
        break;
      //=================== ID GROUP =========================//
      case "idgroup":
      case "idgc":
        {
          if (!isCreator) return m.reply(`Ngapain?`);
          let getGroups = await ZassTdr.groupFetchAllParticipating();
          let groups = Object.entries(getGroups)
            .slice(0)
            .map((entry) => entry[1]);
          let anu = groups.map((v) => v.id);
          let teks = `⬣ *LIST GROUP DI BAWAH*\n\nTotal Group : ${anu.length} Group\n\n`;
          for (let x of anu) {
            let metadata2 = await ZassTdr.groupMetadata(x);
            teks += `◉ Nama : ${metadata2.subject}\n◉ ID : ${metadata2.id}\n◉ Member : ${metadata2.participants.length}\n\n────────────────────────\n\n`;
          }
          m.reply(
            teks +
              `Untuk Penggunaan Silahkan Ketik Command ${prefix}pushkontak idgroup|teks\n\nSebelum Menggunakan Silahkan Salin Dulu Id Group Nya Di Atas`
          );
        }
        break;
      //=================== MENU UTAMA NYA =========================//
      case "menu":
        {
          let me = m.sender;
          m.reply(`✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬
🔰 ${ucapanWaktu}
🔰 Owner : ẉZassTdr.to/VCJ
🔰 Name : ${pushname}
🔰 Number : wa.me/${me.split("@")[0]}
✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬
ʜᴀʟᴏ ᴋᴀᴋ ᴋᴇᴛɪʟ " ᴀʟʟᴍᴇɴᴜ "
ᴊɪᴋᴀ ɪɴɢɢɪɴ ᴍᴇʟɪʜᴀᴛ ᴍᴇɴᴜ ʙᴏᴛ
✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬

*BOT AKTIF SELAMA:*\n*${runtime(process.uptime())}*`);
        }
        break;
      //=================================================//
      case "allmenu":
        {
          var menump3 = fs.readFileSync("./ZassTdrjs/vn/ZassTdrjs.mp3");
          var PHOTO = fs.readFileSync("./llogo.png");
          let me = m.sender;
          let anu = `━━━[✬ 𝙸𝙽𝙵𝙾 𝚄𝚂𝙴𝚁 ✬]━━━
🔰 ${ucapanWaktu}
🔰 Owner : ẉZassTdr.to/VCJ
🔰 Name : ${pushname}
🔰 Number : wa.me/${me.split("@")[0]}
🔰 Runing : Panel
🔰 Version : last update
✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬
ʙᴏᴛ ɪɴɪ ᴍᴀꜱɪ ᴅɪ ᴛᴀʜᴀᴘ ᴘᴇᴍʙᴀʀᴜᴀɴ ᴊᴀᴅɪ
ʜᴀʀᴀᴘ ᴅɪ ᴍᴀᴋʟᴜᴍɪ, ᴋᴀʟᴀᴜ ᴀɴᴅᴀ ᴛɪᴅᴀᴋ ʙɪꜱᴀ
ᴍᴇᴍᴀᴋʟᴜᴍɪ ʀɪʙᴜᴛ ᴀᴊᴀ ꜱɪɴɪ ɴᴊɢ
✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬✬
${readmore}
*NEW FITURE*
🌺: totalfiture
🌺: tiktok
🌺: weton
🌺: hneko
🌺: nwaifu 
◦•●◉✿ ᧁׁᨵׁׅᨵׁׅᧁׁᥣׁׅ֪ꫀׁׅܻ ✿◉●•◦
🌺: openai/ai
🌺: pinterest
🌺: waifu
🌺: loli
🌺: husbu
🌺: milf
🌺: cosplay
🌺: wallml
🌺: hneko
»»————-————-««
◦•●◉✿ ᛕꪖꪶᛕꪊꪶꪖꪻꪮ᥅ ✿◉●•◦
🌺: kali
🌺: kurang
🌺: bagi
🌺: tambah
»»————-————-««
◦•●◉✿ ꪀׁׅꫀׁׅܻᨰׁׅ ✿◉●•◦
🌺: push
»»————-————-««
◦•●◉✿ tׁׅᨵׁׅᨵׁׅᥣׁׅ֪𝒮 ✿◉●•◦
🌺: mp3
🌺: toaudio
🌺: jadianime
🌺: couple
»»————-————-««
◦•●◉✿ ᦓꪻꪮ᥅ꫀ ✿◉●•◦
🌺: panel
🌺: promo
»»————-————-««
◦•●◉✿ ᦓꪻ꠸ᥴᛕꫀ᥅ ✿◉●•◦
🌺: sticker
🌺: smeme
🌺: toimage
🌺: ttp
🌺: qc
»»————-————-««
◦•●◉✿ ꪮ᭙ꪀꫀ᥅ ✿◉●•◦
🌺: i1
🌺: isi
🌺: llog
🌺: url
🌺: get
🌺: afk
🌺: backup
🌺: son
🌺: soff
🌺: restart
»»————-————-««
◦•●◉✿ ᧁ᥅ꪮꪊρ ✿◉●•◦
🌺: idgc
🌺: infogc
🌺: linkgc
🌺: gc c/o
🌺: r
🌺: tagall text
🌺: hidetag
🌺: kick
🌺: antiwame on/off
🌺: antilink on/off
🌺: block
🌺: unblock
🌺: afk
🌺: promote
🌺: demote
🌺: delc
»»————-————-««
◦•●◉✿ ꯱ׁׅ֒ᨵׁׅυׁׅꪀׁׅժׁׅ݊ ✿◉●•◦
🌺: desah
🌺: sound1
contoh :
sound1 sampai sound161
»»————-————-««
◦•●◉✿ ꯱ׁׅ֒ɑׁׅ֮ժׁׅ݊ ✿◉●•◦
🌺: sad1
contoh :
sad1 sampai sad35
»»————-————-««
◦•●◉✿ ƙׁׅ֑ɑׁׅ֮ꪀׁׅꫀׁׅܻ ✿◉●•◦
🌺: kane1
contoh :
kane1 sampai kane8
»»————-————-««
╔═══《 *ᥴ᥅ꫀꪖꪻꪮ᥅* 》═══⊱
╠❏ ZassTdr Official { VCJ }
╚════[ ᄃﾘﾑﾑ ]══════`;
          ZassTdr.sendMessage(m.chat, {
            text: anu,
            contextInfo: {
              externalAdReply: {
                showAdAttribution: true,
                renderLargerThumbnail: true,
                title: "ZassOfc",
                body: "ZassOfficial",
                previewType: PHOTO,
                containsAutoReply: true,
                mediaType: 1,
                thumbnail: fs.readFileSync("./llogo.png"),
                mediaUrl: "https://youtube.com/@zassofficiall",
                sourceUrl: "https://chat.whatsapp.com/IDAgK6rgYuS2WtsM9VfNYH",
              },
            },
          }),
            ZassTdr.sendMessage(
              m.chat,
              { audio: menump3, mimetype: "audio/mpeg", ptt: true },
              { quoted: m }
            );
        }
        break;
      //=================================================//
      default:
        if (budy.startsWith("=>")) {
          if (!isCreator)
            return m.reply(
              `Maaf Command Tersebut Khusus Developer Bot WhatsApp`
            );
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
              util.format(eval(`(async () => { return ${budy.slice(3)} })()`))
            );
          } catch (e) {
            m.reply(String(e));
          }
        }
        if (budy.startsWith(">")) {
          if (!isCreator)
            return m.reply(
              `Maaf Command Tersebut Khusus Developer Bot WhatsApp`
            );
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
          if (!isCreator)
            throw `Maaf Command Tersebut Khusus Developer Bot WhatsApp`;
          exec(budy.slice(2), (err, stdout) => {
            if (err) return m.reply(err);
            if (stdout) return m.reply(stdout);
          });
        }
        if (m.chat.endsWith("@s.whatsapp.net") && isCmd) {
          this.anonymous = this.anonymous ? this.anonymous : {};
          let room = Object.values(this.anonymous).find(
            (room) =>
              [room.a, room.b].includes(m.sender) && room.state === "CHATTING"
          );
          if (room) {
            if (/^.*(next|leave|start)/.test(m.text)) return;
            if (
              [
                ".next",
                ".leave",
                ".stop",
                ".start",
                "Cari Partner",
                "Keluar",
                "Lanjut",
                "Stop",
              ].includes(m.text)
            )
              return;
            let other = [room.a, room.b].find((user) => user !== m.sender);
            m.copyNForward(
              other,
              true,
              m.quoted && m.quoted.fromMe
                ? {
                    contextInfo: {
                      ...m.msg.contextInfo,
                      forwardingScore: 0,
                      isForwarded: true,
                      participant: other,
                    },
                  }
                : {}
            );
          }
          return !0;
        }
        if (isCmd && budy.toLowerCase() != undefined) {
          if (m.chat.endsWith("broadcast")) return;
          if (m.isBaileys) return;
          let msgs = global.db.data.database;
          if (!(budy.toLowerCase() in msgs)) return;
          ZassTdr.copyNForward(m.chat, msgs[budy.toLowerCase()], true);
        }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
