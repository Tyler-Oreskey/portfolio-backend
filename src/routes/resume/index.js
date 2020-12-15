const path = require('path');

const { getCacheItem, setCacheItem } = require('../../helpers/cache');
const { getPDF } = require('../../aws');
const { ErrorHandler } = require('../../helpers/error');

module.exports = {
  getPDF: async (req, res, next) => {
    try {
      let resumeBuffer = getCacheItem('resume');

      if (resumeBuffer === undefined) {
        const file = await getPDF({
          s3Path: 'pdf',
          fileName: 'resume.pdf',
          pathToSave: path.resolve('src/pdf')
        });
  
        if (file.Body === undefined || file.Body === '') {
          throw new ErrorHandler(404, 'File Buffer Not Found.');
        }
        const buffer = file.Body;
        resumeBuffer = setCacheItem('resume', { buffer }, 2592000);
      }
      return res.status(200).json(resumeBuffer);
    } catch (error) {
      next(error);
    }
  }
}