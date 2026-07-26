
const ENV_CONFIG = {
  PORT:process.env.PORT,
  DB_URI:process.env.DB_URI!,
  JWT_SECRET:process.env.JWT_SECRET!,
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES_IN,
  NODE_ENV:process.env.NODE_ENV,
  COOKIE_EXPIRY:Number(process.env.COOKIE_EXPIRY),
};

export default ENV_CONFIG;