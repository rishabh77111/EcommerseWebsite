
const ENV_CONFIG = {
  PORT:process.env.PORT,
  DB_URI:process.env.DB_URI!,
  JWT_SECRET:process.env.JWT_SECRET!,
  JWT_EXPIRES_IN:process.env.JWT_EXPIRES,
};

export default ENV_CONFIG;