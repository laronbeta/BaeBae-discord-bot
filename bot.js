 const { Client, RichEmbed, Attachment } = require("discord.js");
// const GoogleImages = require("google-images");
// const googleImages = new GoogleImages("", "");
const weather = require("weather-js");
const client = new Client();
const prefix = '.';
const ytdl = require("ytdl-core");
const queue = new Map();
const dbl = require("dbl.js");
const http = require("http");
const express = require("express");
const app = express();
const cor = "https://corona-stats.online/id";
const ram = "http://api.aladhan.com/v1/timingsByCity?city=Tangerang&country=Indonesia&method=3"
const propertiesObject = { format: "json" };
var currentdate = new Date();
var datetime =
  "Tanggal " +
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear();
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
const activities_list = [
 "VALORANT",
  "sama ronhyun",
  "follow ig @renebaebae"
];

client.on("ready", () => {
  console.log(`Masuk sebagai ${client.user.tag}!`);
  setInterval(() => {
    const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
    client.user.setActivity(activities_list[index], "playing");
  }, 2000);
});

function randomRange(min, max) {
  // returns an int >= min and <= max
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
client.on("guildMemberAdd", member => {
  const channel = member.guild.channels.find(ch => ch.name === "chit-chat");
  let memberTag = member.user.username;
  if (!channel) return;
  const embed = new RichEmbed()
    .setTitle(memberTag + " telah bergabung ke dalam server.")
    .setColor(0xff0000);
  channel.send(embed);
  setTimeout(function() {
    channel.send(`Halo ${member} 👋`);
  }, 1000);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.find(ch => ch.name === "chit-chat");
  let memberTag = member.user.username;
  if (!channel) return;
  const embed = new RichEmbed()
    .setTitle(memberTag + " telah meninggalkan server.")
    .setColor(0xff0000);
  channel.send(embed);
  setTimeout(function() {
    channel.send(`Selamat tinggal 👋`);
  }, 1000);
});
client.on("guildCreate", guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop: for (let c of channels) {
    let channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }
  let channel = client.channels.get(guild.systemChannelID || channelID);
  const embed = new RichEmbed()
    .setTitle("Hai, terima kasih telah mengundangku ke server ini.")
    .setColor(0x03f8fc);
  channel.send(embed);
});
client.on("guildCreate", guild => {
  let channelID;
  let channels = guild.channels;
  channelLoop: for (let c of channels) {
    let channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }
  let channel = client.channels.get(guild.systemChannelID || channelID);
  const embed = new RichEmbed()
    .setTitle("Ketik >help untuk menampilkan daftar perintah.")
    .setColor(0xff487e);
  channel.send(embed);
});


client.on("message", message => {
  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);
  let msg = message.content;
  var parts = message.content.split(" ");
 const serverQueue = queue.get(message.guild.id);
 
     if (msg.startsWith(prefix + "play")) {
    execute(message, serverQueue);
    return;
  } else if (msg.startsWith(prefix + "skip")) {
    skip(message, serverQueue);
    return;
  } else if (msg.startsWith(prefix + "stop")) {
    stop(message, serverQueue);
    return;
  } else {
    message.channel.send("You need to enter a valid command!");
  }

//   if (msg.startsWith(">")) {
//     message.channel.send("Pake simbol titik (.)")
//      message.channel.send("Contoh: .ping")
//   }
  
  if (message.content.includes("<@")) {
    var link =
      "http://discordapp.com/channels/" +
      message.guild.id +
      "/" +
      message.channel.id +
      "/" +
      message.id;
    var msg1 = '𝙋𝙚𝙨𝙖𝙣 𝙩𝙚𝙡𝙖𝙝 𝙙𝙞𝙠𝙞𝙧𝙞𝙢.';
    message.channel.send(msg1) .then((msg1)=>{
    const embed = new RichEmbed()
      .setColor(0xff0000)
      .setTitle("Hai! ada yg mention kamu tuh!")
      .setFooter(`${datetime}`)
      .setDescription(
        "[Klik di sini untuk menuju ke pesan tersebut]" + "(" + link + ")"
      );
    setTimeout(function(){
     msg1.delete(1);
  }, 2000)
    message.mentions.users.first().send(embed);
    message.react("🆗");
    message.react("✅");
    })
  }

  if (msg.startsWith(prefix + "shalat")) {
    request({ url: ram, qs: propertiesObject }, function(err, response, body) {
      if (err) {
        console.log(err);
        return;
      }
     let ramadhan = JSON.parse(body);
      var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
      message.channel.send(msg1) .then((msg1)=>{
      const embed = new RichEmbed()
        .setColor(0x00FF00)
        .setFooter("Menggunakan perhitungan dari Muslim World League")
        .setDescription(`Pada tanggal ${ramadhan.data.date.readable}`)
        .setAuthor(`Jadwal Shalat di kota Tangerang`)
        .addField("Imsak", `${ramadhan.data.timings.Imsak}`, true)
        .addField("Zuhur", `${ramadhan.data.timings.Dhuhr}`, true)
        .addField("Azhar", `${ramadhan.data.timings.Asr}`, true)
        .addField("Maghrib", `${ramadhan.data.timings.Maghrib}`, true)
        .addField("Isya", `${ramadhan.data.timings.Isha}`, true)
      setTimeout(function(){
         msg1.edit(embed);
        }, 1100)
      })
    })
}
  
  // message.guild.fetchAuditLogs({type: 'mber', user: '564803680747126784'}).then(async (audit) => {
  //       let log = audit.entries.first().changes
  //       console.log(log)
  //   })
  
  if (msg.startsWith(prefix + "corona")) {
    request({ url: cor, qs: propertiesObject }, function(err, response, body) {
      if (err) {
        console.log(err);
        return;
      }
      let corona = JSON.parse(body);
      var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
      message.channel.send(msg1) .then((msg1)=>{
      const embed = new RichEmbed()
        .setColor(0x00FFFF)
        .setAuthor(`Statistik COVID-19 di Indonesia pada hari ini.`)
        .setFooter("Menggunakan data dari https://corona-stats.online/id")
        .addField("Total kasus", `${corona.data[0].cases} (+${corona.data[0].todayCases})`, true)
        .addField("Telah sembuh", `${corona.data[0].recovered}`, true)
        .addField("Meninggal", `${corona.data[0].deaths} (+${corona.data[0].todayDeaths})`, true)
      setTimeout(function(){
         msg1.edit(embed);
        }, 1100)
    });
    })
  }

  if (msg.startsWith(prefix + "masuk")) {
    if (message.guild.me.voiceChannel !== undefined) {
      const channel = message.member.voiceChannel;
      channel.join();
      const embed = new RichEmbed()
        .setTitle("OK. Aku masuk ya!")
        .setColor(0x009975);
      message.channel.send(embed);
    } else {
      message.reply("Masuk ke voice channel dulu!");
    }
  }
  
  if (msg.startsWith(prefix + "keluar")) {
    if (message.guild.me.voiceChannel !== undefined) {
      message.guild.me.voiceChannel.leave();
      const embed = new RichEmbed()
        .setTitle("OK. Saya keluar!")
        .setColor(0x009975);
      message.channel.send(embed);
    } else {
      message.reply("Saya tidak ada di voice channel itu!");
    }
  }
  if (message.isMentioned(client.user)) {
    const embed = new RichEmbed()
      .setTitle("Ketik >help untuk info lebih lanjut.")
      .setColor(0x42f5ef);
    message.channel.send(embed);
  }
  if (msg.startsWith(prefix + "ping")) {
    var ping = Date.now() - message.createdTimestamp + "ms";
    var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
    message.channel.send(msg1) .then((msg1)=>{
      const embed = new RichEmbed()
        .setTitle("🏓 PONG")
        .setColor(0x009975)
        .setDescription('Latency: ' + `${ping}`);
    setTimeout(function(){
         msg1.edit(embed);
        }, 1100)
  })
}
  if (msg.startsWith(prefix + "invite")) { 
    const embed = new RichEmbed()
      .setColor(0x28c3d4)
      .setDescription("[Klik atau copy link di sini](https://del.dog/aux)");
    message.channel.send(embed);
  }
  // if (msg.startsWith(prefix + 'sumber')) {
  // 	const embed = new RichEmbed().setTitle('Source code').setColor(0x03f8fc).setDescription("https://github.com/ronhyun329/renebytes-discord-bot")
  // 	message.channel.send(embed);
  // }
  if (message.content.startsWith(prefix + "dp")) {
    const user = message.mentions.users.first() || message.author;
    var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
    message.channel.send(msg1) .then((msg1)=>{
    const avatarEmbed = new RichEmbed()
      .setTitle("Sikat bray")
      .setColor(0x03f8fc)
      .setImage(user.avatarURL);
    setTimeout(function(){
         msg1.edit(avatarEmbed);
        }, 1100)
    })
  }
                                     
  if (msg.startsWith(prefix + "cuaca")) {
    weather.find(
      {
        search: args.join(" "),
        degreeType: "C"
      },
      function(err, result) {
        if (err) message.channel.send(err);
        if (result === undefined || result.length === 0) {
          message.channel.send("**Lokasi tidak ditemukan!**");
          return;
        }
        var location = result[0].location;
        var current = result[0].current;
        switch (current.skytext) {
          case "Mostly Sunny":
            var skytext = "Hampir cerah";
            break;
          case "Cloudy":
            var skytext = "Berawan";
            break;
          case "Partly Cloudy":
            var skytext = "Cerah dan berawan";
            break;
          case "Sunny":
            var skytext = "Cerah";
            break;
          case "Clear":
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
            break;
        }
        var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
        message.channel.send(msg1) .then((msg1)=>{
        const embed = new RichEmbed()
          .setDescription("**" + skytext + "**")
          .setAuthor(
            `Cuaca untuk daerah ${current.observationpoint} pada ${current.date}`
          )
          .setThumbnail(current.imageUrl)
          .setColor(0x03f8fc)
          .addField("Waktu bagian", `UTC${location.timezone}`, true)
          .addField("Skala suhu", location.degreetype, true)
          .addField("Suhu", `${current.temperature}℃`, true)
          .addField("Terasa seperti", `${current.feelslike}℃`, true)
          .addField("Kecepatan angin", `${current.winddisplay}`, true)
          .addField("Kelembapan", `${current.humidity}%`, true);
        setTimeout(function(){
         msg1.edit(embed);
        }, 1100)
        })
      }
    );
  }
  if (msg.startsWith(prefix + "gamb")) {
    image(message, parts);
  }

  function image(message, parts) {
    var search = parts.slice(1).join(" ");
    var options = {
      url: "http://results.dogpile.com/serp?qc=images&q=" + search,
      method: "GET",
      headers: {
        Accept: "text/html",
        "User-Agent": "Chrome"
      }
    };
    request(options, function(error, response, responseBody) {
      if (error) {
        return;
      }
      $ = cheerio.load(responseBody);
      var links = $(".image a.link");
      var urls = new Array(links.length)
        .fill(0)
        .map((v, i) => links.eq(i).attr("href"));
      console.log(urls);
      if (!urls.length) {
        return;
      }
      message.channel.send();
      var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
      message.channel.send(msg1) .then((msg1)=>{
      const embed = new RichEmbed()
        .setTitle("Gambar telah ditemukan!")
        .setColor(0x03f8fc)
        .setImage(urls[0]);
      setTimeout(function(){
         msg1.edit(embed);
        }, 1100)
      })
    });
  }
  
  if (msg.startsWith(prefix + "help")) {
    const embed = new RichEmbed()
      .setTitle("📎 DAFTAR COMMANDS 📎")
      .setColor(0x03f8fc)
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/589334793699983362/651310354462408725/aaaasdsddas.jpg"
      )
      .addField(".ping", "Untuk mengecek status ping anda.")
      .addField(".dp [username]", "Untuk mengunduh avatar seseorang.")
      .addField(
        ".cuaca [nama kota]",
        "Untuk menampilkan info cuaca di kota anda."
      )
      // .addField(
      //   ".gambar [keyword]",
      //   "Untuk menampilkan gambar yg ingin anda cari."
      // )
      .addField(">invite", "Untuk menampilkan link server Auxide.")
      .addField(
        "@username [message]",
        "Untuk memberitahu user yang di-mention."
      )
      .addField(
        ".corona",
        "Untuk menampilkan info statistik corona di indonesia."
      )
    .addField(
        ".shalat",
        "Untuk menampilkan jadwal shalat di Tangerang."
      )
      .addField(">help", "Untuk menampilkan pesan ini.")
      .setFooter("Developed by ronhyun329");
    message.channel.send(embed);
  }
});

function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel)
    return message.channel.send(
      "You need to be in a voice channel to play music!"
    );
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send(
      "I need the permissions to join and speak in your voice channel!"
    );
  }

  const songInfo = ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title} has been added to the queue!`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  if (!serverQueue)
    return message.channel.send("There is no song that I could skip!");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send(
      "You have to be in a voice channel to stop the music!"
    );
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
}
