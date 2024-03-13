import cron from 'node-cron';
import TelegramBot from 'node-telegram-bot-api';
import { assistantCurrentWeather } from './response';
// replace the value below with the Telegram token you receive from @BotFather
const token = '7078651175:AAHmmTohCdWTvLLzckLa23KGneEkX1Bi9jc';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.on('webhook_error', (error) => {
  console.error('Webhook error:', error);
});

// Function to get the bot's information and start the bot
bot
  .getMe()
  .then((botInfo) => {
    const botUsername = botInfo.username;
    console.log(`Bot @${botUsername} has started!`);

    // Get the bot's ID (which can be used as the chat ID)
    const botId = botInfo.id;
    const chatId = botId;
    console.log(`Bot ID (chat ID): ${botId}`);

    // Now you can use botId as the chat ID wherever you need it
  })
  .catch((error) => {
    console.error('Error getting bot information:', error);
  });

bot.getChat(-1002062766625).then((chat) => {
  console.log('chat', chat);
});
// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match ? match[1] : 'Not have msg'; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log('msg', chatId);
  const messageText = msg.text;

  if (messageText === '/start') {
    bot.sendMessage(chatId, 'Welcome to the bot!');
  }
});

const commands = [
  {
    command: '/start',
    description: 'Start the bot',
  },
  {
    command: '/help',
    description: 'Show help',
  },
  {
    command: '/weather',
    description: 'Show current weather in Hanoi',
  },
];

bot.setMyCommands(commands);

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  console.log('msg', chatId);
  // const message = `\n/start - to start bot\n/help - to show all options`;
  const messages_ = commands.reduce((acc, command) => {
    return `${acc}\n${command.command} - ${command.description}`;
  }, '');

  bot.sendMessage(chatId, messages_, {
    parse_mode: 'HTML',
  });
});

bot.onText(/\/weather/, async (msg) => {
  const chatId = msg.chat.id;
  const answer = await assistantCurrentWeather();
  bot.sendMessage(chatId, answer);
});

// bot.on('message', async (msg) => {
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, 'Still building this feature');
// });

const cronWeather = async () => {
  const answer = await assistantCurrentWeather();
  bot.sendMessage(-1002062766625, answer);
};

// cron.schedule('*/5 * * * * *', cronWeather);

cron.schedule('0 8 * * *', cronWeather);

// Schedule task for 12:00 PM every day
cron.schedule('0 14 * * *', cronWeather);

// Schedule task for 6:00 PM every day
cron.schedule('0 18 * * *', cronWeather);
