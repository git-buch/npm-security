// Datei: mwa/api/server.js
const express = require("express"),
  bodyParser = require('body-parser'),
  routes = require('./routes'),
  sqlite = require('sqlite3'),
  app = express();

const port = process.env.PORT || 3001;

app.use(bodyParser.json());

const db = new sqlite.Database('pictures.db');
db.run("CREATE TABLE IF NOT EXISTS pic (id TEXT, date TEXT, thumbnail BLOB, mime TEXT, size TEXT, filename TEXT, hasExif NUMBER)");

app.set("db", db);
app.use('/', express.static('./'));
app.use('/api', routes);
app.listen(port, () => {
  console.log("API-Server auf Port ", port);
});
