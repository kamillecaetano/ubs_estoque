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

    res.status(200).json({ 
      mensagem: 'Login bem-sucedido',
      tipo: usuario.tipo
    });

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

server.post('/medicamentos/retirar', async (req, res) => {
  const { medicamentoId, quantidade } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM medicamentos WHERE id = $1', [medicamentoId]);
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Medicamento não encontrado' });
    }

    const medicamento = rows[0];
    if (medicamento.quantidade < quantidade) {
      return res.status(400).json({ erro: 'Quantidade insuficiente em estoque' });
    }

    await pool.query('UPDATE medicamentos SET quantidade = quantidade - $1 WHERE id = $2', [quantidade, medicamentoId]);

    res.status(200).json({ mensagem: 'Retirada realizada com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

server.get('/medicamentos/estoque-baixo', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM medicamentos WHERE quantidade < 10 ORDER BY quantidade ASC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

server.post('/solicitacoes', async (req, res) => {
  const { usuarioId, medicamentoId, quantidade } = req.body;

  try {
    await pool.query(
      'INSERT INTO solicitacoes_retirada (usuario_id, medicamento_id, quantidade) VALUES ($1, $2, $3)',
      [usuarioId, medicamentoId, quantidade]
    );

    res.status(201).json({ mensagem: 'Solicitação enviada com sucesso!' });
  } catch (err) {
    console.error('Erro ao registrar solicitação:', err);
    res.status(500).send('Erro no servidor');
  }
});

server.get('/solicitacoes', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT sr.id, u.nome AS usuario, m.nome AS medicamento, sr.quantidade, sr.status
      FROM solicitacoes_retirada sr
      JOIN usuarios u ON sr.usuario_id = u.id
      JOIN medicamentos m ON sr.medicamento_id = m.id
      WHERE sr.status = 'pendente'
      ORDER BY sr.id ASC
    `);
    res.json(rows);
  } catch (err) {
    console.error('Erro ao buscar solicitações:', err);
    res.status(500).send('Erro no servidor');
  }
});

server.listen(port);