const {EmbedBuilder} = require("discord.js");
const config = require("../config.js")

exports.run = async (client, message, args) => {
 
   const embed = new EmbedBuilder()
   .setTitle('Test Botu Yardım')
   .setDescription("!ping | Botun Pingini Gösterir");

   message.channel.send({embeds: [embed]})

};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "yardım"
};