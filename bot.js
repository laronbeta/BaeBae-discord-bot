const { Client, RichEmbed } = require('discord.js');
const weather = require('weather-js');
const client = new Client();
const prefix = '>'

client.login('TOKKEN');

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`)
 client.user.setStatus('IDLE', 'Made by zephyrxj')
 client.user.setActivity('Kim Jisoo 💖| zephyrxj', {type: 'playing' })
});


client.on('guildMemberAdd', member => {
   const channel = member.guild.channels.find(ch => ch.name === 'general');
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
       .setTitle("Annyeonghaseyo, terima kasih telah mengundang saya ke server ini 💖")
       .setColor(0xff7da5)
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
        .setTitle("Ketik =help untuk menampilkan daftar perintah.")
        .setColor(0xff7da5)
        channel.send(embed);
  });

client.on('message', message => {

  let cont = message.content.slice(prefix.length).split(" ");
  let args = cont.slice(1);
  let msg = message.content;

  if (msg.startsWith(prefix + 'masuk')) {
    const channel = message.member.voiceChannel;
    channel.join()
    .then(connection => console.log('Connected!'))
    .catch(console.error);
     const embed = new RichEmbed()
     .setTitle('Channel ditemukan!')
     .setColor(0xc4005a)
     message.channel.send(embed);
  }

  if (msg.startsWith(prefix + 'keluar')) {
    if (message.guild.me.voiceChannel !== undefined) {
      message.guild.me.voiceChannel.leave();
      const embed = new RichEmbed()
      .setTitle('OK. Aku keluar!')
      .setColor(0xc4005a)
      message.channel.send(embed);
    } else {
      message.reply("Aku tidak ada di channel itu!");
    }
  }

  if (msg.startsWith(prefix + 'ping')) {
    const embed = new RichEmbed()
      .setTitle('PONG 🏓')
      .setColor(0xc4005a)
      .setDescription("Ping: " + Math.round(client.ping) + ' ms')
      message.channel.send(embed);
 }

  if (msg.startsWith(prefix + 'dp')) {
    const embed = new RichEmbed()
      .setTitle('Avatar ditemukan!')
      .setColor(0xFF0000)
      .setDescription('Silahkan di-unduh');
      message.channel.send(embed);
  }
  if (msg.startsWith(prefix + 'dp')) {
    message.channel.send(message.author.avatarURL);
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

if (msg.startsWith(prefix + 'help')) {
   const embed = new RichEmbed()
     .setTitle('📎 Daftar perintah yang tersedia: 📎')
     .setColor(0xFF0000)
     .addField('>ping', 'Untuk mengecek status ping dari aku.')
     .addField('>dp', 'Untuk mengunduh avatar kamu.')
     .addField('>cuaca [nama kota]', 'Untuk menampilkan info cuaca di kota kamu.')
     .addField('>help', 'Untuk menampilkan pesan ini.');
     message.channel.send(embed);
 }

});
