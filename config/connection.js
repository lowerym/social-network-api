const { connect, connection } = require('mongoose');

const connectString = process.env.MONGODB_URI || 'mongodb://localhost:27017/socialDB';

connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
