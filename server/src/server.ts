import { connectMongo } from './db/db';
import express, { Application } from 'express';
import cookie from 'cookie-session';
import { get } from 'config';

const app: Application = express();

connectMongo();

app.use(
  cookie({
    name: 'session',
    keys: [get('cookie')],
    maxAge: 1350 * 1000
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/members', require('./api/members'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/groups', require('./api/groups'));
app.use('/api/dashboard', require('./api/dashboard'));

const port = process.env.port || 4000;

app.listen(port, () => console.log(`server started on port ${port}`));
