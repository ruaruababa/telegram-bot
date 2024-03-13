module.exports = {
  apps: [
    {
      name: 'Telegram Bot',
      script: 'ts-node index.ts',
      out_file: './out.log',
      error_file: './error.log',
    },
    // {
    //   script: './service-worker/',
    //   watch: ['./service-worker'],
    // },
  ],
};
