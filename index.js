const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./src/config');
const { handleError } = require('./src/helpers/error');

const allowedOrigins = config.siteURLs.split(',').map((siteURL) => {
  if (siteURL.includes('localhost')) {
    return `http://${siteURL}`;
  }
  return `https://${siteURL}`;
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: allowedOrigins }));
app.get('/health', (req, res) => res.send('OK!'))
app.use(require('./src/controllers')(router));
app.use((err, req, res, next) => handleError(err, res));

app.listen(config.port, () => console.log(`Listening at http://localhost:${config.port}`));