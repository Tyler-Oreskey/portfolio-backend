const AWS = require('aws-sdk');
const config = require('../config');

AWS.config.update({
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey,
  region: config.region
});

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

  await new AWS.SES({ apiVersion: 'latest' })
    .sendEmail(params).promise();
};

module.exports = { sendEmail };