module.exports = {
  apps: [
    {
      name: 'Telegram Bot',
      script: 'pm2 index.ts --watch',
      out_file: './out.log',
      error_file: './error.log',
    },
    // {
    //   script: './service-worker/',
    //   watch: ['./service-worker'],
    // },
  ],
};
