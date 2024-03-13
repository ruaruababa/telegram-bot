module.exports = {
  apps: [
    {
      name: 'Telegram Bot',
      script: 'tsc --watch "*.ts" --exec "ts-node" index.ts',
      out_file: './out.log',
      error_file: './error.log',
    },
    // {
    //   script: './service-worker/',
    //   watch: ['./service-worker'],
    // },
  ],
};
