let fs = require("fs");

exports.cmdAllMenu = `
╔══╾ *𝙵𝚞𝚗𝚗 𝙼𝚎𝚗𝚞*
╟⪼ artinama
╟⪼ artimimpi
╟⪼ jjmeryani
╟⪼ kalkulator
╠══╾ *𝙲𝚎𝚛𝚒𝚝𝚊 𝙿𝚎𝚗𝚍𝚎𝚔*
╟⪼ cerpen_sejarah 
╟⪼ cerpen_sedih 
╟⪼ cerpen_sastra 
╟⪼ cerpen_romantis 
╟⪼ cerpen_rohani 
╟⪼ cerpen_rindu 
╟⪼ cerpen_remaja 
╟⪼ cerpen_ramadhan 
╟⪼ cerpen_petualangan 
╟⪼ cerpen_persahabatan 
╟⪼ cerpen_perpisahan 
╟⪼ cerpen_perjuangan 
╟⪼ cerpen_penyesalan 
╟⪼ cerpen_pengorbanan 
╟⪼ cerpen_pengalaman 
╟⪼ cerpen_pendidikan 
╟⪼ cerpen_penantian 
╟⪼ cerpen_patahhati 
╟⪼ cerpen_olahraga 
╟⪼ cerpen_nasionalisme 
╟⪼ cerpen_nasihat 
╟⪼ cerpen_motivasi 
╟⪼ cerpen_misteri 
╟⪼ cerpen_mengharukan 
╟⪼ cerpen_malaysia 
╟⪼ cerpen_liburan 
╟⪼ cerpen_kristen 
╟⪼ cerpen_korea 
╟⪼ cerpen_kisahnyata 
╟⪼ cerpen_keluarga 
╟⪼ cerpen_kehidupan 
╟⪼ cerpen_jepang 
╟⪼ cerpen_inspiratif 
╟⪼ cerpen_gokil 
╟⪼ cerpen_galau 
╟⪼ cerpen_cintasejati 
╟⪼ cerpen_cintasegitiga 
╟⪼ cerpen_cintasedih 
╟⪼ cerpen_cintaromantis 
╟⪼ cerpen_cintapertama 
╟⪼ cerpen_cintaislami 
╟⪼ cerpen_cinta 
╟⪼ cerpen_budaya 
╟⪼ cerpen_bahasasunda 
╟⪼ cerpen_bahasajawa 
╟⪼ cerpen_bahasainggris 
╟⪼ cerpen_bahasadaerah 
╟⪼ cerpen_anak 
╠══╾ *𝚁𝚊𝚗𝚍𝚘𝚖 𝙸𝚖𝚊𝚐𝚎*
╟⪼ hentai
╟⪼ kopi
╟⪼ couple 
╟⪼ wallpaper-anime
╠══╾ *𝙼𝚊𝚒𝚗 𝙼𝚎𝚗𝚞*
╟⪼ stats
╟⪼ openai 
╟⪼ ai2
╟⪼ chatgpt [on/off]
╟⪼ aiimg
╟⪼ runtime
╟⪼ google [keyword]
╟⪼ ringtone
╟⪼ infogempa (api eror)
╠══╾ *𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚎𝚛*
╟⪼ mediafire [link]
╟⪼ tiktok [link]
╟⪼ tiktokmp3 [link]
╟⪼ play [query]
╟⪼ playmp4 [query]
╟⪼ playmp3 [query]
╟⪼ ytmp4 [link]
╟⪼ ytmp3 [link]
╟⪼ ytv [link]
╟⪼ yta [link]
╟⪼ photo [link]
╠══╾ *𝚃𝚘𝚘𝚕 𝙼𝚎𝚗𝚞*
╟⪼ ttp [text]
╟⪼ ttp2 [text] (fix)
╟⪼ tovn
╟⪼ tomp3
╟⪼ tomp4
╟⪼ tovideo
╟⪼ toimg
╟⪼ togif
╟⪼ tourl
╟⪼ volume  ( fix )
╟⪼ colong/wm [reply sticker]
╟⪼ resize (fix)
╟⪼ totext (Image)
╟⪼ translate/tr <lang> [text]
╟⪼ bass
╟⪼ blown
╟⪼ earrape
╟⪼ deep
╟⪼ fast
╟⪼ fat 
╟⪼ nightcore
╟⪼ robot
╟⪼ reverse
╟⪼ slow
╟⪼ smooth
╟⪼ tupai
╠══╾ *𝚂𝚑𝚘𝚛𝚝 𝙻𝚒𝚗𝚔*
╟⪼ tinyurl
╠══╾ *𝙼𝚊𝚔𝚎𝚛 𝙼𝚎𝚗𝚞*
╟⪼ smeme
╟⪼ jadianime [img]
╟⪼ unblur [img]
╟⪼ drawme[img]
╟⪼ carton [img] (fix)
╟⪼ qc [text]
╟⪼ sticker [image]
╟⪼ stickergif [video <10 sec]
╟⪼ emojimix [emote+emote]
╟⪼ removebg [image]
╟⪼ ssweb [link]
╠══╾ *𝚃𝚎𝚡𝚝 𝚃𝚘 𝚂𝚙𝚎𝚌𝚑*
╟⪼ tts [kode bahasa] [Text]
╟⪼ daftar-kode-bahasa
╠══╾ *𝚂𝚘𝚞𝚗𝚍 𝙼𝚎𝚗𝚞*
╟⪼ sound1 - sound160
╟⪼ sad1 - Sad55
╟⪼ kane1 - kane9
╟⪼ bagus
╟⪼ taqwa
╟⪼ pahala
╠══╾ *𝙶𝚛𝚘𝚞𝚙 𝙼𝚎𝚗𝚞*
╟⪼ kick/k [@user]
╟⪼ hidetag/h [text]
╟⪼ setname
╟⪼ setdesc
╟⪼ setppgc
╟⪼ promote
╟⪼ demote
╟⪼ tagall
╟⪼ grup [open/close]
╟⪼ setopen [waktu]
╟⪼ setclose [waktu]
╟⪼ listonline
╟⪼ infogc
╟⪼ linkgc
╟⪼ antilink [on/off]
╟⪼ antilink2 [on/off]
╟⪼ antiviewonce [on/off]
╟⪼ wellcome [on/off]
╟⪼ revoke/resetlinkgrup
╟⪼ delete [reply pesan]
╠══╾ *𝙾𝚠𝚗𝚎𝚛 𝙼𝚎𝚗𝚞*
╟⪼ package
╟⪼ exec
╟⪼ uninstall (fixbutton)
╟> delcache
╟⪼ rcache
╟⪼ restart
╟⪼ afk
╟⪼ backup
╟⪼ setppbot
╟⪼ setpp
╟⪼ block
╟⪼ unblock
╟⪼ autosw [on/off]
╟⪼ leave
╟⪼ join [link group]
╟⪼ payment
╟⪼ donasi
╟⪼ proses
╟⪼ done 
╟⪼ yt
╟⪼ ig
╟⪼ createadmin
╟⪼ addusr
╟⪼ addsrv
╟⪼ delusr
╟⪼ delsrv
╟⪼ listusr
╟⪼ listsrv
╟⪼ detusr
╟⪼ detsrv
╟⪼ domain1
╟⪼ domain2
╟⪼ domain3
╟⪼ domain4
╟⪼ domain5
╟⪼ domain6
╚════════╾`;

exports.cmdMenu = `
╔══╾ *MENU*
╟⪼ main
╟⪼ funn
╟⪼ image
╟⪼ downloader
╟⪼ tools
╟⪼ shortlink
╟⪼ maker
╟⪼ soundmenu
╟⪼ groupmenu
╟⪼ texttospeech
╟⪼ ownermenu
╟⪼ Allmenu
╚════════╾`;
