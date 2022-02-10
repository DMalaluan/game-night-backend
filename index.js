const express = require('express');
const bodyParser = require('body-parser');
const { dbConn, env, session } = require('./Functions');
const { api, client } = require('./Routers');

const app = express();

dbConn.connect();

app.set('json spaces', 2);
app.use(require('helmet')());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(session);

app.use('/api/v1', api);
app.use(client);

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

const listener = app.listen(3000, () => {
  console.log('Application is live on port 3000');
});
