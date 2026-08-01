
const ENV_CONFIG = {
  PORT:process.env.PORT,
  DB_URI:process.env.DB_URI!,
  JWT_SECRET:process.env.JWT_SECRET!,
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
  NODE_ENV:process.env.NODE_ENV,
  COOKIE_EXPIRY:Number(process.env.COOKIE_EXPIRY),
  
  MAIL_HOST: process.env.MAIL_HOST!,
  MAIL_SERVICE: process.env.MAIL_SERVICE!,
  MAIL_PORT: Number(process.env.MAIL_PORT),
  MAIL_SECURE: process.env.MAIL_SECURE === "true",
  MAIL_USER: process.env.MAIL_USER!,
  MAIL_PASS: process.env.MAIL_PASS!,
};

export default ENV_CONFIG;