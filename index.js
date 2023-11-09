require("./settings");
require("./dian");
const sessionName = "session";
const {
   default: makeWASocket,
   useMultiFileAuthState,
   DisconnectReason,
   fetchLatestBaileysVersion,
   generateForwardMessageContent,
   prepareWAMessageMedia,
   generateWAMessageFromContent,
   generateMessageID,
   downloadContentFromMessage,
   makeInMemoryStore,
   makeCacheableSignalKeyStore,
   jidDecode,
   areJidsSameUser,
   proto,
   PHONENUMBER_MCC,
   getContentType,
   getAggregateVotesInPollMessage,
   generateWAMessage,
} = require("@whiskeysockets/baileys");
const pino = require("pino");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const FileType = require("file-type");
const qrcode = require("qrcode-terminal");
const axios = require("axios");
const chalk = require("chalk");
const figlet = require("figlet");
const _ = require("lodash");
const yargs = require("yargs/yargs");
const PhoneNumber = require("awesome-phonenumber");
const moment = require("moment-timezone");
const { say } = require("cfonts");
const spinnies = new (require('spinnies'))()
const MAIN_LOGGER = require("./lib/logger")

const {
   imageToWebp,
   videoToWebp,
   writeExifImg,
   writeExifVid,
} = require("./lib/exif");
const {
   smsg,
   isUrl,
   generateMessageTag,
   getBuffer,
   getSizeMedia,
   fetchJson,
   await,
   sleep,
} = require("./lib/myfunc");

const color = (text, color) => {
   return !color ? chalk.green(text) : chalk.keyword(color)(text);
};

// MENGHUBUNGKAN DENGAN PAIRING KODE {
const NodeCache = require("node-cache");
const readline = require("readline");

const useStore = true;
const doReplies = false;
const usePairingCode = true;
const useMobile = false;

const logger = MAIN_LOGGER.child({})
logger.level = 'trace'

const msgRetryCounterCache = new NodeCache();

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
});
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const P = require("pino")({
   level: 'silent'
})
//end }

const store = useStore ? makeInMemoryStore({ logger }) : undefined;
store?.readFromFile('./sesi.json');

// Save every 1m
setInterval(() => {
    store?.writeToFile('./sesi.json');
}, 10000 * 6);

// Database {
var low;
try {
   low = require("lowdb");
} catch (e) {
   low = require("./lib/lowdb");
}

const { Low, JSONFile } = low;
const mongoDB = require("./lib/mongoDB");

global.opts = new Object(
   yargs(process.argv.slice(2)).exitProcess(false).parse()
);
global.db = new Low(
   /https?:\/\//.test(opts["db"] || "")
      ? new cloudDBAdapter(opts["db"])
      : /mongodb/.test(opts["db"])
         ? new mongoDB(opts["db"])
         : new JSONFile(`src/database.json`)
);
global.DATABASE = global.db; // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
   if (global.db.READ)
      return new Promise((resolve) =>
         setInterval(function () {
            !global.db.READ
               ? (clearInterval(this),
                  resolve(
                     global.db.data == null ? global.loadDatabase() : global.db.data
                  ))
               : null;
         }, 1 * 1000)
      );
   if (global.db.data !== null) return;
   global.db.READ = true;
   await global.db.read();
   global.db.READ = false;
   global.db.data = {
      chats: {},
      database: {},
      settings: {},
      others: {},
      ...global.db.datarequire,
   };
   global.db.chain = _.chain(global.db.data);
};
loadDatabase();
// save database every 30seconds
if (global.db)
   setInterval(async () => {
      if (global.db.data) await global.db.write();
   }, 30 * 1000);
// }

async function startdian() {
   const { state, saveCreds } = await useMultiFileAuthState(global.sessionName);
   let { version, isLatest } = await fetchLatestBaileysVersion();
   console.log(chalk.redBright(`using WA v${version.join(".")}, isLatest: ${isLatest}`));
   const dian = makeWASocket({
      logger: P,
      version,
      printQRInTerminal: !usePairingCode,
      generateHighQualityLinkPreview: true,
      browser: ["chrome (linux)", "", ""],
      auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, P),
      },
      msgRetryCounterCache,
      getMessage: async (key) => {
         if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id);
            return msg.message || undefined;
         }
      },
   });

   store?.bind(dian.ev);

   // FUNGSI PAIRING KODE {

   if (usePairingCode && !dian.authState.creds.registered) {
      if (useMobile) {
         throw new Error("Tidak bisa menggunakan pairing kode di mobile api");
      }

      const phoneNumber = await question(
         "Silahkan Masukan Nomer WhatsApp Yang Aktif:\n"
      );
      const code = await dian.requestPairingCode(phoneNumber); // Jika ingin memasukkan manual nomer nya ganti array botNumber gunakan variabel phoneNumber
      console.log(`Kode Tautan: ${code}`);
   }

   //END }
   // Pendeteksian Member grup masuk/keluar {
   dian.ev.on("group-participants.update", async (anu) => {
      try {
         let urlGc = "https://chat.whatsapp.com/HIKjmiNKAtMBAEF3uOSiRl"
         let metadata = await dian.groupMetadata(anu.id);
         let member = anu.participants[0];
         let documents = [doc1, doc2, doc3, doc4, doc5, doc6];
         let docs = pickRandom(documents);
         let username = `@${member.split("@")[0]}`;
         const more = String.fromCharCode(8206);
         const readmore = more.repeat(4001);
         const waktu = moment.tz("Asia/Jakarta").format("HH:mm:ss");
         const tanggal = moment.tz("Asia/Jakarta").format("DD/MM/YYYY");
         const members = metadata.participants.length;
         let participants = anu.participants;
         for (let num of participants) {
            // Get Profile Picture
            try {
               ppuser = await dian.profilePictureUrl(num, "image");
            } catch {
               ppuser = "https://tinyurl.com/yx93l6da";
            }
            try {
               ppgroup = await dian.profilePictureUrl(anu.id, "image");
            } catch {
               ppgroup = "https://tinyurl.com/yx93l6da";
            }

            memb = metadata.participants.length;
            dianWlcm = await getBuffer(ppuser);
            dianLft = await getBuffer(ppuser);
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
                     thumbnail: dianWlcm,
                     surface: 200,
                     message: `Illuserbot`,
                     orderTitle: "developer",
                     sellerJid: "0@s.whatsapp.net",
                  },
               },
               contextInfo: { forwardingScore: 999, isForwarded: true },
               sendEphemeral: true,
            };
            if (anu.action == "remove") {
               let txlev = `*Halo ${username}*
*Selamat Tinggal Dari*${metadata.subject}
*Nama Grup* : ${metadata.subject}
*Jumlah Member Sekarang* : ${members}
*Keluar Pada* : ${tanggal},${waktu} Wib

  *Deskripsi Grup*
${readmore}
${metadata.desc}
`;
               dian.sendMessage(
                  anu.id,
                  {
                     document: fs.readFileSync("./src/doc.xlsx"),
                     jpegThumbnail: lft,
                     fileName: `Selamat Tinggal`,
                     mimetype: docs,
                     fileLength: 99999999999999,
                     pageCount: "100",
                     caption: txlev,
                     contextInfo: {
                        externalAdReply: {
                           showAdAttribution: true,
                           title: "Illuserbot",
                           body: "𝙹𝚊𝚗𝚐𝚊𝚗 𝙻𝚞𝚙𝚊 𝚂𝚞𝚋𝚜𝚌𝚛𝚒𝚋𝚎",
                           previewType: "PHOTO",
                           mediaType: 1,
                           thumbnail: potoo,
                           sourceUrl: global.yt,
                        },
                     },
                  },
                  { quoted: unicorn }
               );
            } else if (anu.action == "add") {
               let txwel = `Halo ${username}*
*Selamat Datang Di* ${metadata.subject}
*Nama Grup* : ${metadata.subject}
*Jumlah Member Sekarang* : ${members}
*Masuk Pada* : ${tanggal},${waktu} Wib
  *Deskripsi Grup*
${readmore}
${metadata.desc}
`;
               dian.sendMessage(
                  anu.id,
                  {
                     document: fs.readFileSync("./src/doc.xlsx"),
                     jpegThumbnail: wlcm,
                     fileName: `Selamat Datang`,
                     mimetype: docs,
                     fileLength: 99999999999999,
                     pageCount: "100",
                     caption: txwel,
                     contextInfo: {
                        externalAdReply: {
                           showAdAttribution: true,
                           title: "Illuserbot",
                           body: "𝙹𝚊𝚗𝚐𝚊𝚗 𝙻𝚞𝚙𝚊 𝚂𝚞𝚋𝚜𝚌𝚛𝚒𝚋𝚎",
                           previewType: "PHOTO",
                           mediaType: 1,
                           thumbnail: potoo,
                           sourceUrl: global.yt,
                        },
                     },
                  },
                  { quoted: unicorn }
               );
            } else if (anu.action == "promote") {
               const dianbuffer = await getBuffer(ppuser);
               let dianName = num;
               dianbody = `@${dianName.split("@")[0]
                  }, Kamu Sudah Di Promosikan Menjadi Admin`;
               dian.sendMessage(anu.id, {
                  text: dianbody,
                  contextInfo: {
                     mentionedJid: [num],
                     externalAdReply: {
                        showAdAttribution: true,
                        containsAutoReply: true,
                        title: `${metadata.subject}`,
                        body: `Group Notifications`,
                        previewType: `PHOTO`,
                        thumbnailUrl: ``,
                        thumbnail: dianWlcm,
                        sourceUrl: `${urlGc}`,
                     },
                  },
               });
            } else if (anu.action == "demote") {
               const dianbuffer = await getBuffer(ppuser);
               let dianName = num;
               dianbody = `@${dianName.split("@")[0]
                  }, Kamu Sudah Di BerhentiKan Menjadi Admin`;
               dian.sendMessage(anu.id, {
                  text: dianbody,
                  contextInfo: {
                     mentionedJid: [num],
                     externalAdReply: {
                        showAdAttribution: true,
                        containsAutoReply: true,
                        title: `${metadata.subject}`,
                        body: `Group Notifications`,
                        previewType: `PHOTO`,
                        thumbnailUrl: ``,
                        thumbnail: dianLft,
                        sourceUrl: `${urlGc}`,
                     },
                  },
               });
            }
         }
      } catch (err) {
         console.log(err);
      }
   });
   // }
   // Handle error {
   const unhandledRejections = new Map();
   process.on("unhandledRejection", (reason, promise) => {
      unhandledRejections.set(promise, reason);
      console.log("Unhandled Rejection at:", promise, "reason:", reason);
   });
   process.on("rejectionHandled", (promise) => {
      unhandledRejections.delete(promise);
   });
   process.on("Something went wrong", function (err) {
      console.log("Caught exception: ", err);
   });
    //}
   // Setting Chat {
   dian.decodeJid = (jid) => {
      if (!jid) return jid;
      if (/:\d+@/gi.test(jid)) {
         let decode = jidDecode(jid) || {};
         return (
            (decode.user && decode.server && decode.user + "@" + decode.server) ||
            jid
         );
      } else return jid;
   };

   dian.ev.on("contacts.update", (update) => {
      for (let contact of update) {
         let id = dian.decodeJid(contact.id);
         if (store && store.contacts)
            store.contacts[id] = { id, name: contact.notify };
      }
   });
   dian.autosw = true;
   dian.public = true;
   dian.sendsw = `${owner}@s.whatsapp.net`;
   dian.serializeM = (m) => smsg(dian, m, store);
   // }
   // Conection Update {
   dian.ev.on('connection.update', async (update) => {
      const {
         connection,
         lastDisconnect,
         qr
      } = update
      if (lastDisconnect == 'undefined') {
         startdian()
      }
      if (connection === 'connecting') {
         spinnies.add('start', {
            text: '[SYSTEM]: Menghubungkan....'
         })
      } else if (connection === 'open') {
         spinnies.succeed('start', {
            text: `[SYSTEM]: Terhubung Ke WhatsApp..\n Auth: ${dian.user.name || dian.user.verifiedName}`
         })
         await sleep(3000)
         spinnies.add("start", {
            text: "[SYSTEM]: Menunggu Pesan....",
         });
         dian.sendMessage(dian.sendsw, {
            text: `*Koneksi Terhubung*`,
         });
      } else if (connection === 'close') {
         if (lastDisconnect.error.output.statusCode == DisconnectReason.loggedOut) {
            spinnies.fail('start', {
               text: `[SYSTEM]: Tidak Bisa Terhubung Ke WhatsApp.`
            })
            console.log(chalk.redBright("[SYSTEM]: Tidak Bisa Terhubung"))
            dian.sendMessage(dian.sendsw, {
               text: `*Koneksi Terputus*`,
            });
            process.exit(0)
         } else {
            startdian().catch(() => startdian())
         }
      }
   })

   dian.ev.on("creds.update", saveCreds);
   // }
   //MESSAGE FUNCTION {
   dian.parseMention = (text = "") => {
      return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
         (v) => v[1] + "@s.whatsapp.net"
      );
   };

   dian.downloadAndSaveMediaMessage = async (
      message,
      filename,
      attachExtension = true
   ) => {
      let quoted = message.msg ? message.msg : message;
      let mime = (message.msg || message).mimetype || "";
      let messageType = message.mtype
         ? message.mtype.replace(/Message/gi, "")
         : mime.split("/")[0];
      const stream = await downloadContentFromMessage(quoted, messageType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
         buffer = Buffer.concat([buffer, chunk]);
      }
      let type = await FileType.fromBuffer(buffer);
      let trueFileName = attachExtension ? filename + "." + type.ext : filename;
      // save to file
      await fs.writeFileSync(trueFileName, buffer);
      return trueFileName;
   };
   dian.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path)
         ? path
         : /^data:.*?\/.*?;base64,/i.test(path)
            ? Buffer.from(path.split`,`[1], "base64")
            : /^https?:\/\//.test(path)
               ? await await getBuffer(path)
               : fs.existsSync(path)
                  ? fs.readFileSync(path)
                  : Buffer.alloc(0);
      let buffer;
      if (options && (options.packname || options.author)) {
         buffer = await writeExifImg(buff, options);
      } else {
         buffer = await imageToWebp(buff);
      }

      await dian.sendMessage(
         jid,
         { sticker: { url: buffer }, ...options },
         { quoted }
      );
      return buffer;
   };
   dian.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
      let buff = Buffer.isBuffer(path)
         ? path
         : /^data:.*?\/.*?;base64,/i.test(path)
            ? Buffer.from(path.split`,`[1], "base64")
            : /^https?:\/\//.test(path)
               ? await await getBuffer(path)
               : fs.existsSync(path)
                  ? fs.readFileSync(path)
                  : Buffer.alloc(0);
      let buffer;
      if (options && (options.packname || options.author)) {
         buffer = await writeExifVid(buff, options);
      } else {
         buffer = await videoToWebp(buff);
      }

      await dian.sendMessage(
         jid,
         { sticker: { url: buffer }, ...options },
         { quoted }
      );
      return buffer;
   };

   dian.getFile = async (PATH, save) => {
      let res;
      let data = Buffer.isBuffer(PATH)
         ? PATH
         : /^data:.*?\/.*?;base64,/i.test(PATH)
            ? Buffer.from(PATH.split`,`[1], "base64")
            : /^https?:\/\//.test(PATH)
               ? await (res = await getBuffer(PATH))
               : fs.existsSync(PATH)
                  ? ((filename = PATH), fs.readFileSync(PATH))
                  : typeof PATH === "string"
                     ? PATH
                     : Buffer.alloc(0);
      //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
      let type = (await FileType.fromBuffer(data)) || {
         mime: "application/octet-stream",
         ext: ".bin",
      };
      filename = path.join(
         __filename,
         "../src/" + new Date() * 1 + "." + type.ext
      );
      if (data && save) fs.promises.writeFile(filename, data);
      return {
         res,
         filename,
         size: await getSizeMedia(data),
         ...type,
         data,
      };
   };

   dian.sendMedia = async (
      jid,
      path,
      fileName = "",
      caption = "",
      quoted = "",
      options = {}
   ) => {
      let types = await dian.getFile(path, true);
      let { mime, ext, res, data, filename } = types;
      if ((res && res.status !== 200) || file.length <= 65536) {
         try {
            throw { json: JSON.parse(file.toString()) };
         } catch (e) {
            if (e.json) throw e.json;
         }
      }
      let type = "",
         mimetype = mime,
         pathFile = filename;
      if (options.asDocument) type = "document";
      if (options.asSticker || /webp/.test(mime)) {
         let { writeExif } = require("./lib/exif");
         let media = { mimetype: mime, data };
         pathFile = await writeExif(media, {
            packname: options.packname ? options.packname : global.packname,
            author: options.author ? options.author : global.author,
            categories: options.categories ? options.categories : [],
         });
         await fs.promises.unlink(filename);
         type = "sticker";
         mimetype = "image/webp";
      } else if (/image/.test(mime)) type = "image";
      else if (/video/.test(mime)) type = "video";
      else if (/audio/.test(mime)) type = "audio";
      else type = "document";
      await dian.sendMessage(
         jid,
         { [type]: { url: pathFile }, caption, mimetype, fileName, ...options },
         { quoted, ...options }
      );
      return fs.promises.unlink(pathFile);
   };
   dian.downloadMediaMessage = async (message) => {
      let mimes = (message.msg || message).mimetype || "";
      let messageType = mimes.split("/")[0].replace("application", "document")
         ? mimes.split("/")[0].replace("application", "document")
         : mimes.split("/")[0];
      let extension = mimes.split("/")[1];
      const stream = await downloadContentFromMessage(message, messageType);
      let buffer = Buffer.from([]);
      for await (const chunk of stream) {
         buffer = Buffer.concat([buffer, chunk]);
      }
      return buffer;
   };

   dian.getName = (jid, withoutContact = false) => {
      id = dian.decodeJid(jid);
      withoutContact = dian.withoutContact || withoutContact;
      let v;
      if (id.endsWith("@g.us"))
         return new Promise(async (resolve) => {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) v = dian.groupMetadata(id) || {};
            resolve(
               v.name ||
               v.subject ||
               PhoneNumber("+" + id.replace("@s.whatsapp.net", "")).getNumber(
                  "international"
               )
            );
         });
      else
         v =
            id === "0@s.whatsapp.net"
               ? {
                  id,
                  name: "WhatsApp",
               }
               : id === dian.decodeJid(dian.user.id)
                  ? dian.user
                  : store?.contacts[id] || {};
      return (
         (withoutContact ? "" : v.name) ||
         v.subject ||
         v.verifiedName ||
         PhoneNumber("+" + jid.replace("@s.whatsapp.net", "")).getNumber(
            "international"
         )
      );
   };

   dian.sendContact = async (jid, kon, quoted = "", opts = {}) => {
      let list = [];
      for (let i of kon) {
         list.push({
            displayName: await dian.getName(i + "@s.whatsapp.net"),
            vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await dian.getName(
               i + "@s.whatsapp.net"
            )}\nFN:${await dian.getName(
               i + "@s.whatsapp.net"
            )}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:${email}\nitem2.X-ABLabel:Email\nitem3.URL:${web}\nitem3.X-ABLabel:MyWeb\nitem4.ADR:;;${region};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
         });
      }
      dian.sendMessage(
         jid,
         {
            contacts: { displayName: `${list.length} Kontak`, contacts: list },
            ...opts,
         },
         { quoted: m }
      );
   };

   dian.sendImage = async (jid, path, caption = "", quoted = "", options) => {
      let buffer = Buffer.isBuffer(path)
         ? path
         : /^data:.*?\/.*?;base64,/i.test(path)
            ? Buffer.from(path.split`,`[1], "base64")
            : /^https?:\/\//.test(path)
               ? await await getBuffer(path)
               : fs.existsSync(path)
                  ? fs.readFileSync(path)
                  : Buffer.alloc(0);
      return await dian.sendMessage(
         jid,
         { image: buffer, caption: caption, ...options },
         { quoted }
      );
   };

   dian.sendText = (jid, text, quoted = "", options) =>
      dian.sendMessage(jid, { text: text, ...options }, { quoted });

   dian.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return dian.sendMessage(jid, { poll: { name, values, selectableCount } }) }

   dian.cMod = (jid, copy, text = "", sender = dian.user.id, options = {}) => {
      //let copy = message.toJSON()
      let mtype = Object.keys(copy.message)[0];
      let isEphemeral = mtype === "ephemeralMessage";
      if (isEphemeral) {
         mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
      }
      let msg = isEphemeral
         ? copy.message.ephemeralMessage.message
         : copy.message;
      let content = msg[mtype];
      if (typeof content === "string") msg[mtype] = text || content;
      else if (content.caption) content.caption = text || content.caption;
      else if (content.text) content.text = text || content.text;
      if (typeof content !== "string")
         msg[mtype] = {
            ...content,
            ...options,
         };
      if (copy.key.participant)
         sender = copy.key.participant = sender || copy.key.participant;
      else if (copy.key.participant)
         sender = copy.key.participant = sender || copy.key.participant;
      if (copy.key.remoteJid.includes("@s.whatsapp.net"))
         sender = sender || copy.key.remoteJid;
      else if (copy.key.remoteJid.includes("@broadcast"))
         sender = sender || copy.key.remoteJid;
      copy.key.remoteJid = jid;
      copy.key.fromMe = sender === dian.user.id;

      return proto.WebMessageInfo.fromObject(copy);
   };

   dian.appenTextMessage = async (text, chatUpdate) => {
      let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
         userJid: dian.user.id,
         quoted: m.quoted && m.quoted.fakeObj
      })
      messages.key.fromMe = areJidsSameUser(m.sender, dian.user.id)
      messages.key.id = m.key.id
      messages.pushName = m.pushName
      if (m.isGroup) messages.participant = m.sender
      let msg = {
         ...chatUpdate,
         messages: [proto.WebMessageInfo.fromObject(messages)],
         type: 'append'
      }
      dian.ev.emit('messages.upsert', msg)
   }

   //END OF MESSAGE FUNCTION 
   async function getMessage(key) {
      if (store) {
         const msg = await store.loadMessage(key.remoteJid, key.id)
         return msg?.message
      }
      return {
         conversation: "Hai Im There"
      }
   }
   
   dian.ev.on('messages.update', async chatUpdate => {
      for (const { key, update } of chatUpdate) {
         if (update.pollUpdates && key.fromMe) {
            const pollCreation = await getMessage(key)
            if (pollCreation) {
               const pollUpdate = await getAggregateVotesInPollMessage({
                  message: pollCreation,
                  pollUpdates: update.pollUpdates,
               })
               var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
               if (toCmd == undefined) return
               var prefCmd = toCmd
               dian.appenTextMessage(prefCmd, chatUpdate)
            }
         }
      }
   })
   dian.ev.on("messages.upsert", async (chatUpdate) => {
      try {
         mek = chatUpdate.messages[0];
         if(!mek.message) return;
         if(mek.key.remoteJid === "status@broadcast") {
            let bot = dian.decodeJid(dian.user.id);
            if(!dian.autosw) return;
            setTimeout(() => {
               dian.readMessages([mek.key]);
               let mt = getContentType(mek.message);
               console.log(chalk.green(
                  /protocolMessage/i.test(mt)
                     ? `${mek.key.participant.split("@")[0]} Telah menghapus sw`
                     : "[SYSTEM]: Melihat sw : " + mek.key.participant.split("@")[0]
               ));
               if(/protocolMessage/i.test(mt))
                  dian.sendMessage(dian.sendsw, {
                     text:
                        "sw @" + mek.key.participant.split("@")[0] + " Telah dihapus",
                     mentions: [mek.key.participant],
                  });
               if(/(imageMessage|videoMessage|extendedTextMessage)/i.test(mt)) {
                  let keke =
                     mt == "extendedTextMessage"
                        ? `\nSw erisi : ${mek.message.extendedTextMessage.text}`
                        : mt == "imageMessage"
                           ? `\nSw Gambar, Caption : ${mek.message.imageMessage.caption}`
                           : mt == "videoMessage"
                              ? `\nSw Video, Caption : ${mek.message.videoMessage.caption}`
                              : "\nTidak diketahui cek saja langsung!!!";
                  dian.sendMessage(dian.sendsw, {
                     text: "Melihat Sw @" + mek.key.participant.split("@")[0] + keke,
                     mentions: [mek.key.participant],
                  });
               }
            }, 500);
         }
         if(!mek.message) return;
         mek.message =
            Object.keys(mek.message)[0] === "ephemeralMessage"
               ? mek.message.ephemeralMessage.message
               : mek.message;
         if(!dian.public && !mek.key.fromMe && chatUpdate.type === "notify")
            return;
         if(mek.key.id.startsWith("BAE5") && mek.key.id.length === 16) return;
         m = smsg(dian, mek, store);
         require("./dian")(dian, m, chatUpdate, store);
      } catch(err) {
         console.log(err);
      }
   });
//}
   return dian;
}
startdian();

// Detect File Update {
let file = require.resolve(__filename);
fs.watchFile(file, () => {
   fs.unwatchFile(file);
   console.log(chalk.green(`[FILE]: Update ${__filename}`));
   delete require.cache[file];
   require(file);
});
//}