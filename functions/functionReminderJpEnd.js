const {onRequest} = require("firebase-functions/v2/https");
const {Client, Events, GatewayIntentBits, EmbedBuilder, bold} = require("discord.js");
const title = `${bold("STEP by STEP!")}`;
const imageUrl = "https://pbs.twimg.com/media/Fy9xvwiaYAAFzYp?format=jpg&name=900x900";
const {token} = require("./config.json");
const {JP_PLAYER_ROLE, JP_CHANNEL} = require("./constant");
const functionReminderJpEnd = onRequest({region: "asia-southeast2", maxInstances: 1}, (request, response) => {
  const client = new Client({intents: [GatewayIntentBits.Guilds]});
  client.once(Events.ClientReady, async (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    const embedBuilder = new EmbedBuilder()
        .setImage(imageUrl)
        .setTitle(title)
        .setDescription("EVENT TELAH BERAKHIR, JANGAN LUPA MASUK KEDALAM LIVE UNTUK MENGAMBIL REWARDS");
    await client.channels.cache.get(JP_CHANNEL).send({embeds: [embedBuilder]});
    await client.channels.cache.get(JP_CHANNEL).send(`<@${JP_PLAYER_ROLE}>`);
    response.status(200).send("200");
  });
  // Log in to Discord with your client's token
  client.login(token);
});

module.exports = functionReminderJpEnd;
