const express = require('express');
connectMongo = require('./config/db');
const cookie = require('cookie-session');
const config = require('config');

const app = express();

connectMongo();

app.use(
  cookie({
    name: 'session',
    keys: [config.get('cookie')],
    maxAge: 1350 * 1000
  })
);

app.use(express.json({ extended: false }));

app.use('/api/members', require('./api/members'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/groups', require('./api/groups'));
app.use('/api/dashboard', require('./api/dashboard'));

const port = process.env.port || 4000;

app.listen(port, () => console.log(`server started on port ${port}`));
