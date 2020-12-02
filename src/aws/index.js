const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region
});

const sendEmail = async () => {
  const params = {
    Destination: {
      ToAddresses: [config.emailDestination]
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY"
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY"
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Portfolio Form Submission'
      }
    },
    Source: config.emailDestination
  };

  await new AWS.SES({ apiVersion: 'latest' })
    .sendEmail(params).promise();
};

module.exports = { sendEmail };