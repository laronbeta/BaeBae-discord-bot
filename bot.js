const { Client, RichEmbed } = require('discord.js');
const weather = require('weather-js');
const client = new Client();

client.login('YOUR_FCKING_TOKEN');

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`)
 client.user.setStatus('Idle')
 client.user.setActivity('=help | Jisoo 💖 | zephyrxj')
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

 if (message.content === '=ping') {
    const embed = new RichEmbed()
      .setTitle('PONG 🏓')
      .setColor(0xc4005a)
      .setDescription("Ping: " + Math.round(client.ping) + ' ms')
      message.channel.send(embed);
 }

  if (message.content === '=avatar') {
    const embed = new RichEmbed()
      .setTitle('Avatar ditemukan!')
      .setColor(0xFF0000)
      .setDescription('Silahkan di-unduh');
      message.channel.send(embed);
  }
  if (message.content === '=avatar') {
    message.channel.send(message.author.avatarURL);
  }


 if (message.content === '=help') {
   const embed = new RichEmbed()
     .setTitle('📎 Daftar perintah yang tersedia: 📎')
     .setColor(0xFF0000)
     .addField('=ping', 'Untuk mengecek status ping dari bot ini.')
     .addField('=avatar', 'Untuk mengunduh avatar.')
     .addField('=help', 'Untuk menampilkan pesan ini.');
     message.channel.send(embed);
 }

});
