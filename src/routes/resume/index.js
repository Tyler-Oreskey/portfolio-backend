const path = require('path');

const { getCacheItem, setCacheItem } = require('../../helpers/cache');
const { getPDF } = require('../../aws');
const { ErrorHandler } = require('../../helpers/error');

module.exports = {
  getPDF: async (req, res, next) => {
    try {

      let resumeBlob = getCacheItem('resume');

      if (resumeBlob === undefined) {
        const file = await getPDF({
          s3Path: 'pdf',
          fileName: 'resume.pdf',
          pathToSave: path.resolve('src/pdf')
        });
  
        if (file.Body === undefined || file.Body === '') {
          throw new ErrorHandler(404, 'File Buffer Not Found.');
        }
        const blob = `data:application/pdf;base64,${Buffer.from(file.Body).toString('base64')}`;
        resumeBlob = setCacheItem('resume', { blob }, 2592000);
      }
      return res.status(200).json(resumeBlob);
    } catch (error) {
      next(error);
    }
  }
}