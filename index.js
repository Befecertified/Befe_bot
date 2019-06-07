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
 * This example demonstrates setting up webhook on Zeit Now platform.
 * Attention: You have to use webhook with Zeit Now only, polling doesn't
 * work.
 */


const TOKEN = process.env.TELEGRAM_TOKEN || '832236376:AAGaNyoPiP3fDV6yMuvT7Z511X0nf_uGKzw';
const TelegramBot = require('../..');
const options = {
  webHook: {
    // Just use 443 directly
    port: 443
  }
};
// You can use 'now alias <your deployment url> <custom url>' to assign fixed
// domain.
// See: https://zeit.co/blog/now-alias
// Or just use NOW_URL to get deployment url from env.
const url = 'https://smartbot.deekorbaribefe.now.sh' || process.env.NOW_URL;
const bot = new TelegramBot(TOKEN, options);


// This informs the Telegram servers of the new webhook.
// Note: we do not need to pass in the cert, as it already provided
bot.setWebHook(`${url}/bot${TOKEN}`);


// Just to ping!
bot.on('message', function onMessage(msg) {
  bot.sendMessage(msg.chat.id, 'I am alive on Zeit Now!');
});
