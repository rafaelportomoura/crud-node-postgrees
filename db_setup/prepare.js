'use strict';

var pg = require('pg');
var database = require('../server/config/database.js');
var conString = database.conString;

async function connect() {
  let client;
  try {
    client = new pg.Client(conString);
    await client.connect();

    await client.query(
      'CREATE TABLE todos(id serial not null primary key, text name, done boolean)'
    );
    await client.query("INSERT INTO todos(text, done) values('Hi!',true)");
    await client.query("INSERT INTO todos(text, done) values('Hello!', false)");

    var query = await client.query('SELECT * FROM todos');

    console.log(query.rows);
    console.log('DB Done!');
  } catch (error) {
    console.log('Error: ' + error.message);
  } finally {
    if (client) {
      client.end(); // workaround fix
    }
  }
}

(async function () {
  await connect();
})();
