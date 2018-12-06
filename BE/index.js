const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/server.config');
const app = express();
const autoIncrement = require('mongoose-auto-increment');
// [CONFIGURE SERVER PORT]
const port = process.env.PORT || 3000;

// [RUN SERVER]
const server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});

mongoose.connect(config.dbUrl(), {
  useCreateIndex: true,
  useNewUrlParser: true
})

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongodb server');
});
autoIncrement.initialize(db);

// [CONFIGURE APP TO USE bodyParser]
app.use((req, res, next) =>{
  res.header("Access-Control-Allow-Origin", "*")
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "*")
  next()
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/',require('./router'));
app.use('/files', express.static(__dirname + '/files'));
module.exports = app;
