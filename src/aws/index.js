const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region
});

const ses = new AWS.SES({ apiVersion: 'latest' });
const s3 = new AWS.S3({ apiVersion: 'latest' });

const sendEmail = async (body) => {
  const params = {
    Destination: {
      ToAddresses: [config.emailDestination]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <h4>Name: ${body.name}</h4>
            <h4>Email: ${body.email}</h4>
            <p>${body.message}</p>
          `
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Portfolio Form Submission'
      }
    },
    Source: config.emailDestination
  };

  await ses.sendEmail(params).promise();
};

const getPDF = async (fileDefinition) => {
  const params = {
    Bucket: `${config.bucket}/${fileDefinition.s3Path}`,
    Key: fileDefinition.fileName
  };

  return s3.getObject(params).promise();
};

module.exports = { sendEmail, getPDF };