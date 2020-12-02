require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8000,
  emailDestination: process.env.EMAIL_DESTINATION || 'toreskey@gmail.com',
  fromEmail: process.env.FROM_EMAIL || 'mail.toreskey.com'
};