const express = require('express');
const app = express();
const router = express.Router();
const { port } = require('./src/config');
const { handleError } = require('./src/helpers/error');

app.use(require('./src/controllers')(router));

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});