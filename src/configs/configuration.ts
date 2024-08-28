export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  resources: {
    website: process.env.APP_WEBSITE,
    appname: process.env.APP_NAME,
    description: process.env.DESCRIPTION,
    version: process.env.VERSION,
    logo: process.env.LOGO,
    primaryColor: process.env.PRIMARY_COLOR,
    secondaryColor: process.env.SECONDARY_COLOR,
  },
  mongoDb: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || 5432,
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    dbname: process.env.MONGO_DBNAME,
  },
  redisDb: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
    user: process.env.REDIS_USER,
    db: parseInt(process.env.REDIS_DB, 10),
  },
  googleMap: {
    key: process.env.GOOGLE_MAP_KEY,
  },
  mail: {
    enabled: !!parseInt(process.env.MAIL_ENABLED),
    transport: {
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT, 10) || 587,
      secure: !!parseInt(process.env.MAIL_SECURE),
    },
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    mailgen: {
      theme: process.env.MAILGEN_THEME,
      logoHeight: process.env.MAILGEN_LOGO_HEIGHT,
      logoWidth: process.env.MAILGEN_LOGO_WIDTH,
    },
  },
  sms: {
    sender: process.env.SMS_SENDER,
    provider1: {
      enabled: !!parseInt(process.env.SMS_ENABLED),
      provider: process.env.SMS_PROVIDER,
      url: process.env.SMS_URL,
      clientId: process.env.SMS_CLIENT_ID,
      apiKey: process.env.SMS_API_KEY,
    },
    provider2: {},
  },
  whatsapp: {},
});
