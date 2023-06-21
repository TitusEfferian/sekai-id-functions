const {onRequest} = require("firebase-functions/v2/https");
const {Client, Events, GatewayIntentBits, EmbedBuilder, bold} = require("discord.js");
const dayjs = require("dayjs");
const {token} = require("./config.json");
const objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

const EN_CHANNEL = "1119110412714131497";
const endDate = dayjs("2023-06-29T11:00:00+07:00");
const isFirstDay = false;
const diff = endDate.diff(dayjs(), "day");
const title = `${bold("Desperate Times?! Island Panic")}`;
const imageUrl = "https://pbs.twimg.com/media/FzBIGF9WIAA8DE0?format=jpg&name=large";

const description = () => {
  if (isFirstDay) {
    return `Event ${title} telah dimulai`;
  }
  if (diff === 0) {
    return `Event telah dimulai dan akan ${bold("berakhir hari ini.")}`;
  }
  if (diff < 0) {
    return `Event telah berakhir.`;
  }
  return `Event telah dimulai dan akan berakhir dalam ${bold(`${diff} hari lagi.`)}`;
};

const eventsReminderEN = onRequest({region: "asia-southeast2", maxInstances: 1}, (_, response) => {
  const client = new Client({intents: [GatewayIntentBits.Guilds]});
  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    const embedBuilder = new EmbedBuilder()
        .setImage(imageUrl)
        .setTitle(title)
        .setDescription(description());
    client.channels.cache.get(EN_CHANNEL).send({embeds: [embedBuilder]}).then(() => {
      response.status(200).send("200");
    });
  });

  // Log in to Discord with your client's token
  client.login(token);
});

module.exports = eventsReminderEN;
