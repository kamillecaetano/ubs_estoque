import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';


import api from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await api.post('/login', {email, senha});
      if (response.status === 200) {
        const tipoUsuario = response.data.tipo;
        localStorage.setItem("userTipo", tipoUsuario);

        if (tipoUsuario === "admin") {
          navigate('/home');
        } else {
          navigate('/home-user');
        }
      }

    }catch(error){
      console.error('Erro ao realizar login:', error);
      alert('E-mail ou senha incorretos');
    }

  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Login</Card.Title>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Check type="checkbox" label="Lembrar-me" />
              <a href="/forgot-password" className="text-body">Esqueci a senha?</a>
            </div>
            <div className="button-submit">

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>
            </div>

            <p className="text-center">
              Ainda não tem uma conta? <a href="/register" className="link-danger">Cadastre-se</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;