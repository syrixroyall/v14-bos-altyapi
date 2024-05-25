const { Client, GatewayIntentBits, Partials, EmbedBuilder, ActivityType } = require("discord.js");
const config = require("./config.js");
const Discord = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

client.once('ready', () => {
    console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);

    const statusList = [
        { name:  config && config.botDurum.length > 0 ? config.botDurum : "💖 SyrixRoyal", type: ActivityType.Streaming, url: "https://www.twitch.tv/directory" }
    ];

    let currentIndex = 0;

    setInterval(() => {
        if (currentIndex === statusList.length) {
            currentIndex = 0;
        }
        
        const currentStatus = statusList[currentIndex];
        client.user.setActivity(currentStatus);

        currentIndex++;
    }, 8000);
});


require("./events/message.js")
require("./events/ready.js")

process.on('SIGINT', async () => {
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  client.destroy();
  process.exit(0);
});

client.login(config.token)

process.on('uncaughtException', (error) => {
  console.error('Beklenmeyen bir hata oluştu:');
  console.error(error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Beklenmeyen bir promise hatası oluştu:');
  console.error('Promise:', promise);
  console.error('Hata:', reason);
});