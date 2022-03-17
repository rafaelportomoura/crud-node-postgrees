/*================================================================
Server side Routing
Route Definitions

Depending on the REST route/endpoint the PostgreSQL database 
is Queried appropriately.

PostgreSQL DB table name is: 'todos'
=================================================================*/

var pg = require('pg');

var database = require('../config/database.js');
var conString = database.conString;
var results = [];

module.exports = {
  /*================================================================
	CREATE - $http post
	=================================================================*/
  //create todo and send back all todos after creation
  createTodo: async function (req, res) {
    results = [];

    //Data to be saved to the DB - taken from $http request packet
    var data = {
      text: req.body.text,
      done: false,
    };

    let client;
    try {
      client = new pg.Client(conString);
      await client.connect();

      await client.query('INSERT INTO todos(text, done) values($1, $2)', [data.text, data.done]);

      let query = await client.query('SELECT * FROM todos ORDER BY id ASC');

      results = query.rows;
    } catch (error) {
      console.log('Error: ' + error.message);
    } finally {
      if (client) {
        client.end(); // workaround fix
      }
    }

    return res.json(results);
  },

  /*================================================================
	READ - $http get
	=================================================================*/
  //Get all todos in the database
  getTodos: async function (req, res) {
    results = [];

    let client;
    try {
      client = new pg.Client(conString);
      await client.connect();

      let query = await client.query('SELECT * FROM todos ORDER BY id ASC');

      results = query.rows;
    } catch (error) {
      console.log('Error: ' + error.message);
    } finally {
      if (client) {
        client.end(); // workaround fix
      }
    }

    return res.json(results);
  },

  /*================================================================
	UPDATE - $http put
	=================================================================*/
  updateTodo: async function (req, res) {
    results = [];

    var id = req.params.todo_id;

    var data = {
      text: req.body.text,
      done: req.body.done,
    };

    console.log('ID= ' + id); //TEST

    let client;
    try {
      client = new pg.Client(conString);
      await client.connect();

      await client.query('UPDATE todos SET text=($1), done=($2) WHERE id=($3)', [
        data.text,
        data.done,
        id,
      ]);

      let query = await client.query('SELECT * FROM todos ORDER BY id ASC');

      results = query.rows;
    } catch (error) {
      console.log('Error: ' + error.message);
    } finally {
      if (client) {
        client.end(); // workaround fix
      }
    }

    return res.json(results);
  },

  /*================================================================
	DELETE - $http delete
	=================================================================*/
  deleteTodo: async function (req, res) {
    results = [];
    var id = req.params.todo_id;

    console.log('id= ' + id); //TEST

    let client;
    try {
      client = new pg.Client(conString);
      await client.connect();
      await client.query('DELETE FROM todos WHERE id=($1)', [id]);
      let query = await client.query('SELECT * FROM todos ORDER BY id ASC');

      results = query.rows;
    } catch (error) {
      console.log('Error: ' + error.message);
    } finally {
      if (client) {
        client.end(); // workaround fix
      }
    }

    return res.json(results);
  },
};
