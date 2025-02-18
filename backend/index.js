const express = require('express');
const bodyParser = require('body-parser');
const {Pool} = require('pg');

const server = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ubs_estoque',
  password: '2804',
  port: 5432,
});

const cors = require('cors');
server.use(cors());

server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.send('Sistema de Estoque da UBS');
});

server.post('/registro', async (req, res) => {
  const {nome, email, telefone, senha} = req.body;
  try{
    const {rows} = await pool.query(
      'INSERT INTO usuarios (nome, email, telefone, senha) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome, email, telefone, senha]
    );
    res.status(201).json(rows[0]);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

server.post('/login', async (req, res) => {
  const {email, senha} = req.body;
  try{
    const {rows} = await pool.query(
      'SELECT * FROM usuarios WHERE email = $1', [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ erro: 'E-mail incorreto' });
    }

    const usuario = rows[0];

    if (senha !== usuario.senha) {
      return res.status(401).json({ erro: 'Senha incorreta' });
    }

    res.status(200).json({ mensagem: 'Login bem-sucedido'});
  }catch(err){
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

server.get('/medicamentos', async (req, res) => {
  try{
    const {rows} = await pool.query('SELECT * FROM medicamentos');
    res.json(rows);
  }catch (err){
    console.error(err.message);
    res.status(500).send('Erro do servidor!');
  }
})

server.post('/cadastro-medicamentos', async (req, res) => {
  const {nome, quantidade, descricao} = req.body;
  try{
    const {rows} = await pool.query(
      'INSERT INTO medicamentos (nome, quantidade, descricao) VALUES ($1, $2, $3) RETURNING *',
      [nome, quantidade, descricao]
    );
    res.status(201).json(rows[0]);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

server.put('/medicamentos/:id', async (req, res) => {
  const {id} = req.params;
  const {nome, quantidade, descricao} = req.body;
  try {
    const {rows} = await pool.query(
      'UPDATE medicamentos SET nome = $1, quantidade = $2, descricao = $3 WHERE id = $4 RETURNING *',
      [nome, quantidade, descricao, id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send('Medicamento não encontrado');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

server.delete('/medicamentos/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const {rows} = await pool.query('DELETE FROM medicamentos WHERE id = $1 RETURNING *', [id]);
    if (rows.length > 0) {
      res.status(204).send();
    } else {
      res.status(404).send('Medicamento não encontrado');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});










server.listen(port);