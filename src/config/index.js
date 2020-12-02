require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  emailDestination: process.env.EMAIL_DESTINATION || 'toreskey@gmail.com',
  domainEmail: process.env.DOMAIN_EMAIL || 'mail.toreskey.com',
  region: process.env.region || 'us-east-1'
};