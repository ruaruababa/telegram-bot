import cron from 'node-cron';
import TelegramBot from 'node-telegram-bot-api';
import { assistantCurrentWeather } from './response';
import { getCurrentWeather } from './serivce';
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
  const weather = await getCurrentWeather();
  console.log('weather', weather);
  bot.sendMessage(chatId, 'Weather');
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  console.log('msg', chatId);

  const answer = await assistantCurrentWeather();

  bot.sendMessage(chatId, answer);
});

// function sendMessage() {
//   const message = 'This is a test message sent every 5 seconds.';

//   const wellWishes = [
//     'Chúc em có một ngày vui vẻ và đầy năng lượng!',
//     'Mong em sẽ tận hưởng mọi khoảnh khắc trong chuyến đi!',
//     'Hãy tận hưởng những trải nghiệm mới và thú vị khi đi chơi nhé!',
//     'Chúc em luôn an toàn và hạnh phúc trên mọi hành trình!',
//     'Hy vọng em sẽ tìm thấy niềm vui và hạnh phúc ở mọi nơi em đến!',
//     'Chúc em gặp nhiều bạn mới và tạo ra những kỷ niệm đáng nhớ!',
//     'Hãy tận hưởng từng phút giây ở bất kỳ đâu em đến!',
//     'Chúc em có một chuyến đi thú vị và đáng nhớ!',
//     'Mong em sẽ tìm thấy sự thư giãn và hạnh phúc trong chuyến đi của mình!',
//     'Hãy cảm nhận và tận hưởng mọi điều tuyệt vời mà cuộc sống mang lại cho em!',
//   ];

//   bot
//     .sendMessage(
//       -1002062766625,
//       wellWishes[Math.floor(Math.random() * wellWishes.length)]
//     )
//     .then((message) => {
//       console.log('Success');
//     })
//     .catch((error) => {
//       console.log('Error', error);
//     });
// }

const cronWeather = async () => {
  const answer = await assistantCurrentWeather();
  bot.sendMessage(-1002062766625, answer);
};

// cron.schedule('*/5 * * * * *', cronWeather);

cron.schedule('0 8 * * *', cronWeather);

// Schedule task for 6:00 PM every day
cron.schedule('0 18 * * *', cronWeather);
