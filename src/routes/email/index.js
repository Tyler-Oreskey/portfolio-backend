const aws = require('../../aws');

const { ErrorHandler } = require('../../helpers/error');
const {validateRecaptchaToken } = require('../../auth/recaptcha');

module.exports = {
  sendEmail: async (req, res, next) => {
    const { name, email, message, recaptchaToken } = req.body;

    const validEmailRegex = RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );
    try {
      if (recaptchaToken === undefined || recaptchaToken === '') {
        throw new ErrorHandler(400, 'Invalid token provided!');
      }
      const isHuman = await validateRecaptchaToken(recaptchaToken);

      if (!isHuman) {
        throw new ErrorHandler(400, 'You are not a human!');
      }
    
      if (!name || name.length < 3) {
        throw new ErrorHandler(400, 'Invalid name provided!');
      }
    
      if (!email || !validEmailRegex.test(email)) {
        throw new ErrorHandler(400, 'Invalid email provided!');
      }
    
      if (!message || message.length < 15) {
        throw new ErrorHandler(400, 'Invalid message provided!');
      }

      const fields = { name, email, message };

      await aws.sendEmail(fields);
      return res.status(200).json({ message: 'Email Sent!' });
    } catch (error) {
      next(error);
    }
  }
};