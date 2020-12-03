const aws = require('../../aws');

const { ErrorHandler } = require('../../helpers/error');

module.exports = {
  sendEmail: async (req, res, next) => {
    try {
      const { name, email, message } = req.body;

      const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
    
      if (!name || name.length < 3) {
        throw new ErrorHandler(400, 'Invalid name provided.');
      }
    
      if (!email || !validEmailRegex.test(email)) {
        throw new ErrorHandler(400, 'Invalid email provided.');
      }
    
      if (!message || message.length < 15) {
        throw new ErrorHandler(400, 'Invalid message provided.');
      }

      await aws.sendEmail(req.body);
      return res.status(200).json({ message: 'Email Sent.' });
    } catch (error) {
      next(error);
    }
  }
};