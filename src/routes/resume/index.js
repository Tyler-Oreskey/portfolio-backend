const path = require('path');

const { getPDF } = require('../../aws');
const { ErrorHandler } = require('../../helpers/error');

module.exports = {
  getPDF: async (req, res, next) => {
    try {
      const fileDefinition = {
        s3Path: 'pdf',
        fileName: 'resume.pdf',
        pathToSave: path.resolve('src/pdf')
      };
      const file = await getPDF(fileDefinition);

      if (file.Body === undefined || file.Body === '') {
        throw new ErrorHandler(404, 'File Buffer Not Found.');
      }

      return res.status(200).json({ buffer: file.Body });
    } catch (error) {
      next(error);
    }
  }
}