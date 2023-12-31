/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const eventsReminderEN = require("./reminder-en");
const functionReminderJpEnd = require("./functionReminderJpEnd");
// const logger = require("firebase-functions/logger");
const {Client, Events, GatewayIntentBits, EmbedBuilder, bold} = require("discord.js");
const dayjs = require("dayjs");
const {token} = require("./config.json");
const objectSupport = require("dayjs/plugin/objectSupport");
dayjs.extend(objectSupport);

const {JP_CHANNEL} = require("./constant");

const endDate = dayjs("2023-07-09T19:00:00+07:00");
const isFirstDay = false;
const diff = endDate.diff(dayjs(), "day");
const title = `${bold("一期一会な百鬼夜行！？")}`;
const imageUrl = "https://pbs.twimg.com/media/FzxNlSTacAAHknW?format=jpg&name=900x900";

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

const eventsReminderJP = onRequest({region: "asia-southeast2", maxInstances: 1}, (_, response) => {
  // logger.info("Hello logs!", { structuredData: true });
  const client = new Client({intents: [GatewayIntentBits.Guilds]});
  client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
    const embedBuilder = new EmbedBuilder()
        .setImage(imageUrl)
        .setTitle(title)
        .setDescription(description());
    client.channels.cache.get(JP_CHANNEL).send({embeds: [embedBuilder]}).then(() => {
      response.status(200).send("200");
    });
  });

  // Log in to Discord with your client's token
  client.login(token);
});


module.exports = {eventsReminderJP, eventsReminderEN, functionReminderJpEnd};
