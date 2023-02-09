const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 2000;

const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pokemonv3'
});

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// all pokemonss
app.get('/pokemons', (req, res) => {
  const sql = 'SELECT * FROM pokemons';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});

app.get('/pokemons/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM pokemons WHERE id = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

app.post('/add', (req, res) => {
  const sql = 'INSERT INTO pokemons SET ?';

  const pokemonsObj = {
    nombre: req.body.nombre,
    
  };

  connection.query(sql, pokemonsObj, error => {
    if (error) throw error;
    res.send('pokemons created!');
  });
});

app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const sql = `UPDATE pokemonss SET name = '${nombre}'' WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('pokemons updated!');
  });
});

app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM pokemons WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete pokemons');
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
