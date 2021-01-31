const {
    Client,
    RichEmbed,
    Attachment
} = require("discord.js");
// const GoogleImages = require("google-images");
// const googleImages = new GoogleImages("", "");
const weather = require("weather-js");
const client = new Client();
const prefix = '.';
const ytdl = require("ytdl-core");
const dbl = require("dbl.js");
const http = require("http");
const express = require("express");
const app = express();
const cor = "https://corona-stats.online/id";
const ram = "http://api.aladhan.com/v1/timingsByCity?city=Tangerang&country=Indonesia&method=3"
const propertiesObject = {
    format: "json"
};

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

client.on('ready', () => {
    client.user.setPresence({
        game: {
            name: 'Aüxide Syndicate',
            type: "Watching",
            url: "https://www.youtube.com/watch?v=Ujb-gvqsoi0"
        }
    });
});


function randomRange(min, max) {
    // returns an int >= min and <= max
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


client.on("message", message => {
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    let msg = message.content;
    var parts = message.content.split(" ");

    
if(message.content === prefix+'test'){
    if(!message.guild) return;
    if(!message.guild.member(client.user).hasPermission('MANAGE_ROLES')) return;
    var colors = ['#8585ff','#fff681','#a073fd','#fd73b9'];
    for(let i = 0; i<= colors.length;i++){
    var role = message.guild.roles.find(role => role.name === "color");
    setInterval(() => {
        role.edit({
            color: colors[i]
        })
    }, 5000);
  }
}
    
    if (message.content.includes(".k")) {
        message.delete(100);
        message.channel.send(message.content.replace('.k', ''));
    }

    if (msg.startsWith(prefix + "info")) {
        var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
        message.channel.send(msg1).then((msg1) => {
            const embed = new RichEmbed()
                .setAuthor(`${message.guild.name}`)
                .setColor("#d17eff")
                .addField("Nama Server", `${message.guild.name}`)
                .addField("Owner", `${message.guild.owner.user}`)
                .addField("Server ID", message.guild.id)
                .addField("Jumlah user", `${message.guild.memberCount}`)
                .addField("User yang online", `${message.guild.approximatePresenceCount}`)
                .addField("jumlah roles", `${message.guild.roles.size}`);
            setTimeout(function() {
                msg1.delete(1);
            }, 2000)
            message.channel.send(embed);
        })
    }

    if (message.content.includes("<@257474897398333440>")) {
        var link = "http://discordapp.com/channels/" + message.guild.id + "/" + message.channel.id + "/" + message.id;
        var msg1 = '𝙋𝙚𝙨𝙖𝙣 𝙩𝙚𝙡𝙖𝙝 𝙙𝙞𝙠𝙞𝙧𝙞𝙢.';
        message.channel.send(msg1).then((msg1) => {
            const embed = new RichEmbed()
                .setColor(0xd17eff)
                .setTitle("Hai! ada yg mention kamu tuh!")
                .setFooter(`${datetime}`)
                .setDescription(
                    "[Klik di sini untuk menuju ke pesan tersebut]" + "(" + link + ")"
                );
            setTimeout(function() {
                msg1.delete(1);
            }, 2000)
            message.mentions.users.first().send(embed);
            message.react("👍");
        })
    }

    if (message.content.includes("berpulang")) {
        message.react("🙏");
    }

    if (message.content.includes("bergabung")) {
        message.react("👋");
    }

    if (msg.startsWith(prefix + "shalat")) {
        request({
            url: ram,
            qs: propertiesObject
        }, function(err, response, body) {
            if (err) {
                console.log(err);
                return;
            }
            let ramadhan = JSON.parse(body);
            var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
            message.channel.send(msg1).then((msg1) => {
                const embed = new RichEmbed()
                    .setColor(0xd17eff)
                    .setFooter("Menggunakan perhitungan dari Muslim World League")
                    .setDescription(`Pada tanggal ${ramadhan.data.date.readable}`)
                    .setAuthor(`Jadwal Shalat di kota Tangerang`)
                    .addField("Imsak", `${ramadhan.data.timings.Imsak}`, true)
                    .addField("Zuhur", `${ramadhan.data.timings.Dhuhr}`, true)
                    .addField("Azhar", `${ramadhan.data.timings.Asr}`, true)
                    .addField("Maghrib", `${ramadhan.data.timings.Maghrib}`, true)
                    .addField("Isya", `${ramadhan.data.timings.Isha}`, true)
                setTimeout(function() {
                    msg1.edit(embed);
                }, 1100)
            })
        })
    }

    // message.guild.fetchAuditLogs({type: 'mber', user: '564803680747126784'}).then(async (audit) => {
    //       let log = audit.entries.first().changes
    //       console.log(log)
    //   })

    if (msg.startsWith(prefix + "corona") || msg.startsWith(prefix + "c")) {
        request({
            url: cor,
            qs: propertiesObject
        }, function(err, response, body) {
            if (err) {
                console.log(err);
                return;
            }
            let corona = JSON.parse(body);
            var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
            message.channel.send(msg1).then((msg1) => {
                const embed = new RichEmbed()
                    .setColor(0xd17eff)
                    .setAuthor(`Statistik COVID-19 di Indonesia pada hari ini.`)
                    .setFooter("Menggunakan API dari https://corona-stats.online/id")
                    .addField("Total kasus", `${corona.data[0].cases} (+${corona.data[0].todayCases})`, true)
                    .addField("Telah sembuh", `${corona.data[0].recovered}`, true)
                    .addField("Meninggal", `${corona.data[0].deaths} (+${corona.data[0].todayDeaths})`, true)
                setTimeout(function() {
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
                .setColor(0xd17eff);
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
                .setColor(0xd17eff);
            message.channel.send(embed);
        } else {
            message.reply("Saya tidak ada di voice channel itu!");
        }
    }
    if (message.isMentioned(client.user)) {
        const embed = new RichEmbed()
            .setTitle("Ketik .help untuk info lebih lanjut.")
            .setColor(0xd17eff);
        message.channel.send(embed);
    }
    if (msg.startsWith(prefix + "ping") || msg.startsWith(prefix + "p")) {
        var ping = Date.now() - message.createdTimestamp + "ms";
        var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
        message.channel.send(msg1).then((msg1) => {
            const embed = new RichEmbed()
                .setTitle("Pong!")
                .setColor(0xd17eff)
                .setDescription('Latency: ' + `${ping}`);
            setTimeout(function() {
                msg1.edit(embed);
            }, 1100)
        })
    }
    if (msg.startsWith(prefix + "invite")) {
        const embed = new RichEmbed()
            .setColor(0xd17eff)
            .setDescription("[Klik atau copy link di sini](https://del.dog/aux)");
        message.channel.send(embed);
    }
    if (message.content.startsWith(prefix + "dp")) {
        const user = message.mentions.users.first() || message.author;
        var msg1 = '𝙈𝙚𝙣𝙜𝙝𝙪𝙗𝙪𝙣𝙜𝙠𝙖𝙣, 𝙢𝙤𝙝𝙤𝙣 𝙩𝙪𝙣𝙜𝙜𝙪...';
        message.delete(100);
        message.channel.send(msg1).then((msg1) => {
            const avatarEmbed = new RichEmbed()
                .setColor(0xd17eff)
                .setImage(user.avatarURL);
            setTimeout(function() {
                msg1.edit(avatarEmbed);
            }, 1100)
        })
    }

    if (msg.startsWith(prefix + "cuaca")) {
        weather.find({
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
                message.channel.send(msg1).then((msg1) => {
                    const embed = new RichEmbed()
                        .setDescription("**" + skytext + "**")
                        .setAuthor(
                            `Cuaca untuk daerah ${current.observationpoint} pada ${current.date}`
                        )
                        .setThumbnail(current.imageUrl)
                        .setColor(0xd17eff)
                        .addField("Waktu bagian", `UTC${location.timezone}`, true)
                        .addField("Skala suhu", location.degreetype, true)
                        .addField("Suhu", `${current.temperature}℃`, true)
                        .addField("Terasa seperti", `${current.feelslike}℃`, true)
                        .addField("Kecepatan angin", `${current.winddisplay}`, true)
                        .addField("Kelembapan", `${current.humidity}%`, true);
                    setTimeout(function() {
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
            message.channel.send(msg1).then((msg1) => {
                const embed = new RichEmbed()
                    .setTitle("Gambar telah ditemukan!")
                    .setColor(0xd17eff)
                    .setImage(urls[0]);
                setTimeout(function() {
                    msg1.edit(embed);
                }, 1100)
            })
        });
    }

    if (msg.startsWith(prefix + "help")) {
        const embed = new RichEmbed()
            .setTitle("Daftar Command")
            .setColor(0xd17eff)
            .addField(".ping", "Untuk mengecek status ping anda.")
            .addField(".dp [username]", "Untuk mengunduh avatar seseorang.")
            .addField(".cuaca [nama kota]", "Untuk menampilkan info cuaca di kota anda.")
            // .addField(
            //   ".gambar [keyword]",
            //   "Untuk menampilkan gambar yg ingin anda cari."
            // )
            .addField(".invite", "Untuk menampilkan link server Auxide.")
            .addField("@username [message]", "Untuk memberitahu user yang di-mention.")
            .addField(".corona", "Untuk menampilkan info statistik corona di indonesia.")
            .addField(".shalat", "Untuk menampilkan jadwal shalat di Tangerang.")
            .addField(".help", "Untuk menampilkan pesan ini.")
            .setFooter("Developed by ronaldichdr);
        message.channel.send(embed);
    }
});
