// const TelegramBot = require("node-telegram-bot-api");

// const TOKEN = "832236376:AAGaNyoPiP3fDV6yMuvT7Z511X0nf_uGKzw";

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(TOKEN, { polling: true });

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on("message", msg => {
//   const chatId = msg.chat.id;

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, "Welcome to Befebot v1.0.1");
// });

/**
 * This example demonstrates setting up webhook
 * on the Heroku platform.
 */

const TOKEN =
  process.env.TELEGRAM_TOKEN || "832236376:AAGaNyoPiP3fDV6yMuvT7Z511X0nf_uGKzw";
const TelegramBot = require("../..");
const options = {
  webHook: {
    // Port to which you should bind is assigned to $PORT variable
    // See: https://devcenter.heroku.com/articles/dynos#local-environment-variables
    port: process.env.PORT
    // you do NOT need to set up certificates since Heroku provides
    // the SSL certs already (https://<app-name>.herokuapp.com)
    // Also no need to pass IP because on Heroku you need to bind to 0.0.0.0
  }
};
// Heroku routes from port :443 to $PORT
// Add URL of your app to env variable or enable Dyno Metadata
// to get this automatically
// See: https://devcenter.heroku.com/articles/dyno-metadata
const url = process.env.APP_URL || "https://befebot.herokuapp.com:443";
const bot = new TelegramBot(TOKEN, options);

// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);

// Just to ping!
bot.on("message", function onMessage(msg) {
  bot.sendMessage(msg.chat.id, "I am alive!");
});
