const aws = require('../../aws');

const { successHandler } = require('../../helpers/success');
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

      await aws.sendEmail();
      return successHandler(res, 'Email Successfully Sent!');
    } catch (error) {
      next(error);
    }
  }
};