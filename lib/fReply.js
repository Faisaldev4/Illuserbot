require("../dian");
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
      scansSidecar: "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw==",
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
