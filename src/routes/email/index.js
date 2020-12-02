const aws = require('../../aws');

const { successHandler } = require('../../helpers/success');

module.exports = {
  sendEmail: async (req, res, next) => {
    try {
      await aws.sendEmail();
      return successHandler(res, 'Email Successfully Sent!');
    } catch (error) {
      error.statusCode = 500;
      next(error);
    }
  }
};