const { Client, RichEmbed } = require('discord.js');
 const client = new Client();

client.login('NTg5MzM0MDkwNDQ5Mjg5MjI2.XQSRAQ.L4vBQVZcJ9Xp68pB7rq3uCOd1l8');

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', message => {
 if (message.content === '=ping') {
    const embed = new RichEmbed()
      .setTitle('PONG 🏓')
      .setColor(0xc4005a)
      .setDescription("Ping saya: " + Math.round(client.ping) + ' ms')
      message.channel.send(embed);
 }
 });

 client.on('message', message => {
  if (message.content === '=avatar') {
    const embed = new RichEmbed()
      .setTitle('Avatar ditemukan!')
      .setColor(0xFF0000)
      .setDescription('Silahkan di-download :)');
      message.channel.send(embed);
  }
  if (message.content === '=avatar') {
    message.channel.send(message.author.avatarURL);
  }
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'general');
  let memberTag = member.user.username;
  if (!channel) return;
  const embed = new RichEmbed()
    .setTitle("Annyeonghaseyo, " + memberTag + ' selamat datang di server kami 💖')
    .setColor(0xc4005a)
    .setImage("https://media.giphy.com/media/Cmr1OMJ2FN0B2/giphy.gif");
    channel.send(embed);
});


client.on('message', message => {
 if (message.content === '=help') {
   const embed = new RichEmbed()
     .setTitle('📎 Daftar command yang tersedia: 📎')
     .setColor(0xFF0000)
     .addField('=ping', 'Untuk mengecek status ping dari bot ini.')
     .addField('=avatar', 'Untuk mengambil avatar');
     message.channel.send(embed);
 }
});
