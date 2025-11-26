import "dotenv/config";

const _config = {
  PORT: process.env.PORT || 5000,
  JWT_SEC: process.env.JWT_SEC,
  MONGO_URL: process.env.MONGO_URL,
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_TO: process.env.EMAIL_TO,
  NODE_ENV: process.env.NODE_ENV,
  EMAIL_CC_ADMISSION: process.env.EMAIL_CC_ADMISSION,
  EMAIL_CC_FRANCHISE: process.env.EMAIL_CC_FRANCHISE,
  EMAIL_CC_LOCATE: process.env.EMAIL_CC_LOCATE,
  EMAIL_CC_CAREERS: process.env.EMAIL_CC_CAREERS,
  EMAIL_CC_CONTACT: process.env.EMAIL_CC_CONTACT,
};

const config = Object.freeze(_config);

export default config;
