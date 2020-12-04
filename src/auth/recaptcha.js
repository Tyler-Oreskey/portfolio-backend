const fetch = require('node-fetch');

const { recaptchaSecret } = require('../config');

const validateRecaptchaToken = async (token) => {
  const res = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`, {
      method: 'POST'
  });
  const data = await res.json();
  return data.success;
};

module.exports = { validateRecaptchaToken };