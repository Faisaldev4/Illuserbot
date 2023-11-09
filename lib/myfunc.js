let {
   default: makeWASocket,
   makeWALegacySocket,
   extractMessageContent,
   makeInMemoryStore,
   proto,
   delay,
   prepareWAMessageMedia,
   downloadContentFromMessage,
   getBinaryNodeChild,
   jidDecode,
   areJidsSameUser,
   generateForwardMessageContent,
   generateWAMessageFromContent,
   WAMessageStubType,
   WA_DEFAULT_EPHEMERAL,
   getContentType,
} = require("@whiskeysockets/baileys");
let chalk = require("chalk");
let fs = require("fs");
let Crypto = require("crypto");
let axios = require("axios");
let fetch = require("node-fetch");
let moment = require("moment-timezone");
let { sizeFormatter } = require("human-readable");
let util = require("util");
let Jimp = require("jimp");
let { defaultMaxListeners } = require("stream");

let unixTimestampSeconds = (date = new Date()) =>
   Math.floor(date.getTime() / 1000);

exports.unixTimestampSeconds = unixTimestampSeconds;

exports.generateMessageTag = (epoch) => {
   let tag = (0, exports.unixTimestampSeconds)().toString();
   if (epoch) tag += ".--" + epoch; // attach epoch if provided
   return tag;
};

exports.processTime = (timestamp, now) => {
   return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

exports.getRandom = (ext) => {
   return `${Math.floor(Math.random() * 10000)}${ext}`;
};

exports.makeId = (length) => {
   let result = "";
   const characters =
      "0123456789";
   const charactersLength = characters.length;
   for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};

exports.getCase = (cases) => {
   let data = fs.readFileSync("./dian.js");
   try {
      return (
         "case " +
         `"${cases}"` +
         data
            .toString()
            .split('case "' + cases + '"')[1]
            .split("break")[0] +
         "break"
      );
   } catch {
      return (
         "case " +
         `"${cases}"` +
         data
            .toString()
            .split('case  "' + cases + '"')[1]
            .split("break")[0] +
         "break"
      );
   }
};

//1buff
exports.getBuffer = async (url, options) => {
   try {
      options ? options : {};
      const res = await axios({
         method: "get",
         url,
         headers: {
            DNT: 1,
            "Upgrade-Insecure-Request": 1,
         },
         ...options,
         responseType: "arraybuffer",
      });
      return res.data;
   } catch (e) {
      console.log(`Error : ${e}`);
   }
};

exports.generateProfilePicture = async (buffer) => {
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

exports.fetchJson = async (url, head = {}) => {
   try {
      let result = await (
         await fetch(url, {
            headers: head,
         })
      ).json();
      return result;
   } catch (err) {
      return err;
   }
};

exports.runtime = function (seconds) {
   seconds = Number(seconds);
   var d = Math.floor(seconds / (3600 * 24));
   var h = Math.floor((seconds % (3600 * 24)) / 3600);
   var m = Math.floor((seconds % 3600) / 60);
   var s = Math.floor(seconds % 60);
   var dDisplay = d > 0 ? d + (d == 1 ? " H, " : " H, ") : "";
   var hDisplay = h > 0 ? h + (h == 1 ? " J, " : " J, ") : "";
   var mDisplay = m > 0 ? m + (m == 1 ? " M, " : " M, ") : "";
   var sDisplay = s > 0 ? s + (s == 1 ? " D" : " D") : "";
   return dDisplay + hDisplay + mDisplay + sDisplay;
};

exports.clockString = (ms) => {
   let h = isNaN(ms) ? "--" : Math.floor(ms / 3600000);
   let m = isNaN(ms) ? "--" : Math.floor(ms / 60000) % 60;
   let s = isNaN(ms) ? "--" : Math.floor(ms / 1000) % 60;
   return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
};

exports.sleep = async (ms) => {
   return new Promise((resolve) => setTimeout(resolve, ms));
};

exports.isUrl = (url) => {
   return url.match(
      new RegExp(
         /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
         "gi"
      )
   );
};

exports.getTime = (format, date) => {
   if (date) {
      return moment(date).locale("id").format(format);
   } else {
      return moment.tz("Asia/Jakarta").locale("id").format(format);
   }
};

exports.formatDate = (n, locale = "id") => {
   let d = new Date(n);
   return d.toLocaleDateString(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
   });
};

exports.tanggal = (numer) => {
   myMonths = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
   ];
   myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"];
   var tgl = new Date(numer);
   var day = tgl.getDate();
   bulan = tgl.getMonth();
   var thisDay = tgl.getDay(),
      thisDay = myDays[thisDay];
   var yy = tgl.getYear();
   var year = yy < 1000 ? yy + 1900 : yy;
   const time = moment.tz("Asia/Jakarta").format("DD/MM HH:mm:ss");
   let d = new Date();
   let locale = "id";
   let gmt = new Date(0).getTime() - new Date("1 January 1970").getTime();
   let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor((d * 1 + gmt) / 84600000) % 5
   ];

   return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`;
};

exports.formatp = sizeFormatter({
   std: "JEDEC", //'SI' = default | 'IEC' | 'JEDEC'
   decimalPlaces: 2,
   keepTrailingZeroes: false,
   render: (literal, symbol) => `${literal} ${symbol}B`,
});

exports.jsonformat = (string) => {
   return JSON.stringify(string, null, 2);
};

function format(...args) {
   return util.format(...args);
}

exports.logic = (check, inp, out) => {
   if (inp.length !== out.length)
      throw new Error("Input and Output must have same length");
   for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i];
   return null;
};

exports.generateProfilePicture = async (buffer) => {
   const jimp = await Jimp.read(buffer);
   const min = jimp.getWidth();
   const max = jimp.getHeight();
   const cropped = jimp.crop(0, 0, min, max);
   return {
      img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
      preview: await cropped
         .scaleToFit(720, 720)
         .getBufferAsync(Jimp.MIME_JPEG),
   };
};

exports.bytesToSize = (bytes, decimals = 2) => {
   if (bytes === 0) return "0 Bytes";

   const k = 1024;
   const dm = decimals < 0 ? 0 : decimals;
   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

   const i = Math.floor(Math.log(bytes) / Math.log(k));

   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

exports.getSizeMedia = (path) => {
   return new Promise((resolve, reject) => {
      if (/http/.test(path)) {
         axios.get(path).then((res) => {
            let length = parseInt(res.headers["content-length"]);
            let size = exports.bytesToSize(length, 3);
            if (!isNaN(length)) resolve(size);
         });
      } else if (Buffer.isBuffer(path)) {
         let length = Buffer.byteLength(path);
         let size = exports.bytesToSize(length, 3);
         if (!isNaN(length)) resolve(size);
      } else {
         reject("error gatau apah");
      }
   });
};

exports.parseMention = (text = "") => {
   return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(
      (v) => v[1] + "@s.whatsapp.net"
   );
};

exports.getGroupAdmins = (participants) => {
   let admins = [];
   for (let i of participants) {
      i.admin === "superadmin"
         ? admins.push(i.id)
         : i.admin === "admin"
         ? admins.push(i.id)
         : "";
   }
   return admins || [];
};

exports.setStatus = (status) => {
   dian.query({
      tag: "iq",
      attrs: {
         to: "@s.whatsapp.net",
         type: "set",
         xmlns: "status",
      },
      content: [
         {
            tag: "status",
            attrs: {},
            content: Buffer.from(status, "utf-8"),
         },
      ],
   });
   return status;
};

/**
 * Serialize Message
 * @param {WAdianection} dian
 * @param {Object} m
 * @param {store} store
 */
exports.smsg = (dian, m, store) => {
   if (!m) return m;
   let M = proto.WebMessageInfo;
   m = M.fromObject(m);
   if (m.key) {
      m.id = m.key.id;
      m.isBaileys =
         (m.id && m.id.length === 16) ||
         (m.id.startsWith("3EB0") && m.id.length === 12) ||
         (m.id.startsWith("3EB0") && m.id.length === 20) ||
         (m.id.startsWith("B24E") && m.id.length === 20);
      m.chat = dian.decodeJid(
         m.key.remoteJid ||
            message.message?.senderKeyDistributionMessage?.groupId ||
            ""
      );
      m.isGroup = m.chat.endsWith("@g.us");
      m.sender = dian.decodeJid(
         (m.key.fromMe && dian.user.id) ||
            m.participant ||
            m.key.participant ||
            m.chat ||
            ""
      );
      m.fromMe = m.key.fromMe || areJidsSameUser(m.sender, dian.user.id);
   }
   if (m.message) {
      let mtype = Object.keys(m.message);
      m.mtype = getContentType(m.message);
      //Object.keys
      m.mtype =
         (!["senderKeyDistributionMessage", "messageContextInfo"].includes(
            mtype[0]
         ) &&
            mtype[0]) || // Sometimes message in the front
         (mtype.length >= 3 && mtype[1] !== "messageContextInfo" && mtype[1]) || // Sometimes message in midle if mtype length is greater than or equal to 3!
         mtype[mtype.length - 1]; // common case
      m.msg = m.message[m.mtype];
      if (m.mtype === "ephemeralMessage") {
         SerializeM(dian, m);
         m.mtype = m.msg.mtype;
         m.msg = m.msg.msg;
      }
      if (
         m.chat == "status@broadcast" &&
         ["protocolMessage", "senderKeyDistributionMessage"].includes(m.mtype)
      )
         m.chat =
            (m.key.remoteJid !== "status@broadcast" && m.key.remoteJid) ||
            m.sender;
      if (m.mtype == "protocolMessage" && m.msg.key) {
         if (m.msg.key.remoteJid == "status@broadcast")
            m.msg.key.remoteJid = m.chat;
         if (!m.msg.key.participant || m.msg.key.participant == "status_me")
            m.msg.key.participant = m.sender;
         m.msg.key.fromMe =
            dian.decodeJid(m.msg.key.participant) ===
            dian.decodeJid(dian.user.id);
         if (
            !m.msg.key.fromMe &&
            m.msg.key.remoteJid === dian.decodeJid(dian.user.id)
         )
            m.msg.key.remoteJid = m.sender;
      }
      m.text = m.msg.text || m.msg.caption || m.msg.contentText || m.msg || "";
      if (typeof m.text !== "string") {
         if (
            [
               "protocolMessage",
               "messageContextInfo",
               "stickerMessage",
               "audioMessage",
               "senderKeyDistributionMessage",
            ].includes(m.mtype)
         )
            m.text = "";
         else
            m.text =
               m.text.selectedDisplayText ||
               m.text.hydratedTemplate?.hydratedContentText ||
               m.text;
      }
      m.mentionedJid =
         (m.msg?.contextInfo?.mentionedJid?.length &&
            m.msg.contextInfo.mentionedJid) ||
         [];
      let quoted = (m.quoted = m.msg?.contextInfo?.quotedMessage
         ? m.msg.contextInfo.quotedMessage
         : null);
      if (m.quoted) {
         let type = Object.keys(m.quoted)[0];
         m.quoted = m.quoted[type];
         if (typeof m.quoted === "string") m.quoted = { text: m.quoted };
         m.quoted.mtype = type;
         m.quoted.id = m.msg.contextInfo.stanzaId;
         m.quoted.chat = dian.decodeJid(
            m.msg.contextInfo.remoteJid || m.chat || m.sender
         );
         m.quoted.isBaileys =
            (m.quoted.id && m.quoted.id.length === 16) ||
            (m.quoted.id && m.quoted.id.length === 12) ||
            (m.quoted.id && m.quoted.id.length === 20) ||
            (m.quoted.id && m.quoted.id.length === 20) ||
            false;
         m.quoted.sender = dian.decodeJid(m.msg.contextInfo.participant);
         m.quoted.fromMe = m.quoted.sender === dian.user.jid;
         m.quoted.text =
            m.quoted.text || m.quoted.caption || m.quoted.contentText || "";
         m.quoted.name = dian.getName(m.quoted.sender);
         m.quoted.mentionedJid =
            (m.quoted.contextInfo?.mentionedJid?.length &&
               m.quoted.contextInfo.mentionedJid) ||
            [];
         let vM = (m.quoted.fakeObj = M.fromObject({
            key: {
               fromMe: m.quoted.fromMe,
               remoteJid: m.quoted.chat,
               id: m.quoted.id,
            },
            message: quoted,
            ...(m.isGroup ? { participant: m.quoted.sender } : {}),
         }));
         m.getQuotedObj = m.getQuotedMessage = async () => {
            if (!m.quoted.id) return null;
            let q = M.fromObject((await dian.loadMessage(m.quoted.id)) || vM);
            return exports.smsg(dian, q);
         };
         if (m.quoted.url || m.quoted.directPath)
            m.quoted.download = (saveToFile = false) =>
               dian.downloadMediaMessage(
                  m.quoted,
                  m.quoted.mtype.replace(/message/i, ""),
                  saveToFile
               );

         /**
          * Reply to quoted message
          * @param {String|Object} text
          * @param {String|false} chatId
          * @param {Object} options
          */
         m.quoted.reply = (text, chatId, options) =>
            dian.reply(chatId ? chatId : m.chat, text, vM, options);

         /**
          * Copy quoted message
          */
         m.quoted.copy = () => exports.smsg(dian, M.fromObject(M.toObject(vM)));

         /**
          * Forward quoted message
          * @param {String} jid
          *  @param {Boolean} forceForward
          */
         m.quoted.forward = (jid, forceForward = false) =>
            dian.forwardMessage(jid, vM, forceForward);

         /**
          * Exact Forward quoted message
          * @param {String} jid
          * @param {Boolean|Number} forceForward
          * @param {Object} options
          */
         m.quoted.copyNForward = (jid, forceForward = true, options = {}) =>
            dian.copyNForward(jid, vM, forceForward, options);

         /**
          * Modify quoted Message
          * @param {String} jid
          * @param {String} text
          * @param {String} sender
          * @param {Object} options
          */
         m.quoted.cMod = (
            jid,
            text = "",
            sender = m.quoted.sender,
            options = {}
         ) => dian.cMod(jid, vM, text, sender, options);

         /**
          * Delete quoted message
          */
         m.quoted.delete = () =>
            dian.sendMessage(m.quoted.chat, { delete: vM.key });
      }
   }
   m.name = m.pushName || dian.getName(m.sender);
   if (m.msg.url) m.download = () => dian.downloadMediaMessage(m.msg);
   m.text =
      m.msg.text ||
      m.message.conversation ||
      m.msg.contentText ||
      m.msg.selectedDisplayText ||
      m.msg.title ||
      "";
   /**
    * Reply to this message
    * @param {String|Object} text
    * @param {String|false} chatId
    * @param {Object} options
    */
   //m.reply = (text, chatId, options) => dian.sendMedia(chatId ? chatId : m.chat, text, m, options)
   m.reply = (text, chatId = m.chat, options = {}) =>
      Buffer.isBuffer(text)
         ? dian.reply(chatId, text, "file", "", m, { ...options })
         : dian.sendText(chatId, text, m, { ...options });

   /**
    * Copy this message
    */
   m.copy = () => exports.smsg(dian, M.fromObject(M.toObject(m)));

   /**
    * Forward this message
    * @param {String} jid
    * @param {Boolean} forceForward
    */
   m.forward = (jid = m.chat, forceForward = false) =>
      dian.copyNForward(jid, m, forceForward, options);

   /**
    * Exact Forward this message
    * @param {String} jid
    * @param {Boolean} forceForward
    * @param {Object} options
    */
   m.copyNForward = (jid = m.chat, forceForward = true, options = {}) =>
      dian.copyNForward(jid, m, forceForward, options);

   /**
    * Modify this Message
    * @param {String} jid
    * @param {String} text
    * @param {String} sender
    * @param {Object} options
    */
   m.cMod = (jid, text = "", sender = m.sender, options = {}) =>
      dian.cMod(jid, m, text, sender, options);

   /**
    * Delete this message
    */
   m.delete = () => dian.sendMessage(m.chat, { delete: m.key });

   try {
      if (m.msg && m.mtype == "protocolMessage")
         dian.ev.emit("message.delete", m.msg.key);
   } catch (e) {
      console.error(e);
   }
   return m;
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
   fs.unwatchFile(file);
   console.log(chalk.redBright(`Update ${__filename}`));
   delete require.cache[file];
   require(file);
});
