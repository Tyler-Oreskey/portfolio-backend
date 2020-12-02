const express = require('express');
const app = express();
const router = express.Router();

app.use(require('./controllers')(router));

app.listen(8000, () => {
  console.log(`Example app listening at http://localhost:${8000}`)
});