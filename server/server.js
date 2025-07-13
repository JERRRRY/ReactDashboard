import express from 'express'
import cors from 'cors'; // ✅ You missed this import originally
import helmet from 'helmet';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import schema from '../src/data/schema'
import dotenv from 'dotenv';
import config from './config';

dotenv.config();

const app = express();

// ✅ Allow cross-origin requests from your React frontend
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// ✅ Protect routes with JWT (but allow unauthenticated access too)
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);

app.post('/login', (req, res) => {
  let user = false;
  const login = req.body.login;
  const password = req.body.password;
  if (login === 'user' && password === 'password') {
    user = { user, login };
  }

  if (user) {
    const expiresIn = 60 * 60 * 24 * 180;
    const token = jwt.sign(user, config.auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, {
      maxAge: 1000 * expiresIn,
      httpOnly: false,
    });
    res.json({ id_token: token });
  } else {
    res.status(401).json({ message: 'To login use user: "user", password: "password".' });
  }
});

app.use(
  '/graphql',
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
  expressGraphQL(req => ({
    schema,
    graphiql: process.env.REACT_APP_NODE_ENV,
    rootValue: { request: req },
    pretty: process.env.REACT_APP_NODE_ENV,
  }))
);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running in ${process.env.REACT_APP_NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
