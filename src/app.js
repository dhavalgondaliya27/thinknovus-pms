const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const userRoutes = require('./routes/user.route');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);

app.options('*', cors());

app.use(
  session({
    secret: 'PMS',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.static('public'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('PMS is running ...');
});
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(compression());

app.use('/api/users', userRoutes);

module.exports = { app };
