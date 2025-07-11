const express = require('express');
const mongoose = require('mongoose');
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');

const app = express();

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('Error connecting to MongoDB:', error.message);
    });

app.use(express.json());
app.use(middleware.requestLogger);

//To test the API is running
app.get('/', (req, res) => {
  res.send('<h1>Blog API is running!</h1>');
});

app.use('/api/blogs', blogRouter);
app.use('/api/users', userRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;