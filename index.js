const express = require('express');
const app = express();
const router = express.Router();
const { port } = require('./src/config');

app.use(require('./src/controllers')(router));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
});