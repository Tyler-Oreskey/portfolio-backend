require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  emailDestination: process.env.EMAIL_DESTINATION || 'toreskey@gmail.com',
  domainEmail: process.env.DOMAIN_EMAIL || 'mail.toreskey.com',
  region: process.env.REGION || 'us-east-1',
  bucket: process.env.BUCKET || 'portfolio-site-resume',
  siteURLs: process.env.SITE_URLS || 'http://localhost:3000',
  recaptchaSecret: process.env.RECAPTCHA_SECRET
};