const { Client, RichEmbed } = require('discord.js');
const weather = require('weather-js');
const client = new Client();
const prefix = '>'

const youtube = require("./youtube")
const ytdl = require("ytdl-core");

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Saya di sini!");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var cheerio = require("cheerio");
var request = require("request");

client.login(process.env.TOKEN);

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setStatus('IDLE', 'Made by deprometheus')
  client.user.setActivity('VLIVE', {type: 'Watching' })
});


client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'chit-chat');
  let memberTag = member.user.username;
  if (!channel) return;
  const embed = new RichEmbed()
  .setTitle("Annyeonghaseyo " + memberTag + ', selamat datang di server kami 💖')
  .setColor(0xc4005a)
  .setImage("https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif");
  channel.send(embed);
});

client.on("guildCreate", guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop:
  for (let c of channels) {
    let channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }

  let channel = client.channels.get(guild.systemChannelID || channelID);
  const embed = new RichEmbed()
  .setTitle("Annyeonghaseyo, terima kasih telah mengundang aku ke server ini 💖")
  .setColor(0xff487e)
  .setImage("https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif");
  channel.send(embed);
});

client.on("guildCreate", guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop:
  for (let c of channels) {
    let channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }

  let channel = client.channels.get(guild.systemChannelID || channelID);
  const embed = new RichEmbed()
  .setTitle("Ketik >help untuk menampilkan daftar perintah.")
  .setColor(0xff487e)
  channel.send(embed);
});

client.on('message', message => {

  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);
  let msg = message.content;
  var parts = message.content.split(" ");
  
  if (message.content.startsWith(prefix + "play")){
    const streamOptions = { seek: 0, volume: 1};
    var searchTerm = message.content.split(/\s+/g).splice(1,message.content.length).join(" ");
    youtube.youtubeSearch(searchTerm, (vidLink) => {
      message.channel.send("https://www.youtube.com/watch?v=" + vidLink);
      var vidURL = "https://www.youtube.com/watch?v=" + vidLink;

      var stream = ytdl(vidURL, {filter: 'audioonly'});
      if (message.guild.channels.find("name","Karaoke") === null) {
            const channel = message.member.voiceChannel;
            channel.join()
              .then((connection) => {
                connection.playStream(stream,streamOptions);
              })
      } else {
        const channel = message.member.voiceChannel;
        channel.join()
          .then((connection) => {
            connection.playStream(stream,streamOptions);
          })
      }
    });
  }
  
   if (message.content.startsWith(prefix + 'kick')) {

  if (!message.member.roles.find("name", "Admin"))
        return;
    var member = message.mentions.members.first();
    member.kick().then((member) => {
        message.channel.send(member.displayName + " telah di-kick!");
    }).catch(() => {
        message.channel.send("Akses ditolak!");
    });
}

    if (message.content.startsWith(prefix + 'ban')) {

  if (!message.member.roles.find("name", "Admin"))
            return;
        var member = message.mentions.members.first();
        member.ban().then((member) => {
            message.channel.send(member.displayName + " telah di-banned!");
        }).catch(() => {
            message.channel.send("Akses ditolak!");
        });
    }


  
  if (msg.startsWith(prefix + 'masuk')) {
    if (message.guild.me.voiceChannel !== undefined) {
    const channel = message.member.voiceChannel
    channel.join();
    const embed = new RichEmbed()
    .setTitle('OK. Aku masuk ya!')
    .setColor(0x009975)
    message.channel.send(embed)
  } else {
      message.reply("Masuk ke voice channel dulu!");
    }
  }  

  if (msg.startsWith(prefix + 'keluar')) {
    if (message.guild.me.voiceChannel !== undefined) {
      message.guild.me.voiceChannel.leave();
      const embed = new RichEmbed()
      .setTitle('OK. Aku keluar!')
      .setColor(0x009975)
      message.channel.send(embed);
    } else {
      message.reply("Aku tidak ada di channel itu!");
    }
  }

  if (message.isMentioned(client.user)) {
      const embed = new RichEmbed()
      .setTitle('Ketik >help untuk info lebih lanjut.')
      .setColor(0x42f5ef)
      message.channel.send(embed);
}

  if (msg.startsWith(message.mentions.users.first())) {
    var link = "http://discordapp.com/channels/" + message.guild.id + "/" + message.channel.id + "/" + message.id;
    message.mentions.users.first().send("Hai, kamu di-mention di suatu server")
    const embed = new RichEmbed()
    .setColor(0xff0000)
    .setDescription("[Klik di sini untuk menuju ke pesannya]" + '(' + (link) + ')')
    message.mentions.users.first().send(embed);
    message.channel.send("Pesan telah di-kirim!")
  }

  if (msg.startsWith(prefix + 'ping')) {
    const embed = new RichEmbed()
    .setTitle('PONG 🏓')
    .setColor(0x28c3d4)
    .setDescription("Latency: " + Math.round(client.ping) + ' ms')
    message.channel.send(embed);
  }

  if (msg.startsWith(prefix + 'sumber')) {
    const embed = new RichEmbed()
    .setTitle('Source code 🔗')
    .setColor(0x28c3d4)
    .setDescription("https://github.com/rnldch/deprometheus-bot")
    message.channel.send(embed);
  }
  
  if (message.content.startsWith(prefix + 'dp')) {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new RichEmbed()
    .setTitle('Oke. foto profil telah di-ambil.')
    .setColor(0xfcf594)
    .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
  }

  if (msg.startsWith(prefix + 'cuaca')) {

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {
      if (err) message.channel.send(err);
      if (result === undefined || result.length === 0) {
        message.channel.send('**Lokasi tidak ditemukan!**')
        return;
      }

      var location = result[0].location;
      var current = result[0].current;

      switch(current.skytext){
        case "Mostly Sunny":
        var skytext = "Hampir cerah";
        break;
        case "Cloudy" :
        var skytext = "Berawan";
        break;
        case "Partly Cloudy":
        var skytext = "Cerah dan berawan";
        break;
        case "Sunny":
        var skytext = "Cerah";
        break;
        case "Clear" :
        var skytext = "Cerah";
        break;
        case "Mostly Clear":
        var skytext = "Hampir Cerah";
        break;
        case "Mostly Cloudy":
        var skytext = "Hampir mendung";
        break;
        case "Partly Sunny":
        var skytext = "Cerah sebagian";
        break;
        case "Light Rain":
        var skytext = "Hujan Ringan";
        break;
        case "Haze":
        var skytext = "Berkabut";
        break;
        default:
        var skytext = current.skytext;
        break
      }

      const embed = new RichEmbed()
      .setDescription('**' + skytext + '**')
      .setAuthor(`Cuaca untuk daerah ${current.observationpoint} pada ${current.date}`)
      .setThumbnail(current.imageUrl)
      .setColor(0xff7da5)
      .addField('Waktu bagian',`UTC${location.timezone}`, true)
      .addField('Jenis derajat',location.degreetype, true)
      .addField('Suhu',`${current.temperature}℃`, true)
      .addField('Terasa seperti', `${current.feelslike}℃`, true)
      .addField('Kecepatan angin',`${current.winddisplay}`, true)
      .addField('Kelembapan', `${current.humidity}%`, true)
      message.channel.send({embed});
    });
  }

  if (msg.startsWith(prefix + 'gambar')) {
    image(message, parts);
  }

  function image(message, parts) {
    var search = parts.slice(1).join(" ");
    var options = {
      url: "http://results.dogpile.com/serp?qc=images&q=" + search,
      method: "GET",
      headers: {
        "Accept": "text/html",
        "User-Agent": "Chrome"
      }
    };
    request(options, function(error, response, responseBody) {
      if (error) {
        return;
      }

      $ = cheerio.load(responseBody);
      var links = $(".image a.link");
      var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
      console.log(urls);
      if (!urls.length) {
        return;
      }
      message.channel.send();
      const embed = new RichEmbed()
      .setTitle('Gambar yg dimaksud telah ditemukan!')
      .setColor(0x538898)
      .setImage( urls[0] )
      message.channel.send(embed);
    });
  }

  if (msg.startsWith(prefix + 'help')) {
    const embed = new RichEmbed()
    .setTitle('📎 Daftar perintah yang tersedia: 📎')
    .setColor(0xff7a8a)
    .setImage("https://media1.tenor.com/images/0cd749fc22abb81da288cf99d6c4a870/tenor.gif?itemid=10720121")
    .addField('>ping', 'Untuk mengecek status ping aku.')
    .addField('>dp [username]', 'Untuk mengunduh avatar seseorang.')
    .addField('>cuaca [nama kota]', 'Untuk menampilkan info cuaca di kota kamu.')
    .addField('>gambar [objek]', 'Untuk menampilkan gambar yg ingin kamu cari.')
    .addField('>sumber', 'Untuk melihat kode sumber aku.')
    .addField('@username', 'Untuk memberitahu user yg di-mention.')
    .addField('>help', 'Untuk menampilkan pesan ini.')
    .setFooter('Dikembangkan oleh 𝚍𝚎𝚙𝚛𝚘𝚖𝚎𝚝𝚑𝚎𝚞𝚜');
    message.channel.send(embed);
  }

});
