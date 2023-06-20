const {onRequest} = require("firebase-functions/v2/https");

const eventsReminderEN = onRequest({region: "asia-southeast2", maxInstances: 1}, (_, response) => {
  response.status(200).end();
});

module.exports = eventsReminderEN;
