import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Container, Table, Button, Alert } from 'react-bootstrap';

const UserDashboard = () => {
  const [medicamentos, setMedicamentos] = useState([]);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await api.get('/medicamentos');
        setMedicamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar medicamentos:', error);
      }
    };

    fetchMedicamentos();
  }, []);

  const solicitarRetirada = async (medicamentoId) => {
    const usuarioId = localStorage.getItem('userId');
  
    try {
      await api.post('/solicitacoes', { usuarioId, medicamentoId, quantidade: 1 });
      setMensagem('Solicitação enviada! Aguarde a aprovação.');
      
      setTimeout(() => setMensagem(''), 3000);
    } catch (error) {
      console.error('Erro ao solicitar retirada:', error);
      setMensagem('Erro ao solicitar retirada.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userTipo');
    navigate('/');
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center">Painel do Usuário</h2>
      
      {mensagem && <Alert variant="info">{mensagem}</Alert>}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.id}>
              <td>{med.nome}</td>
              <td>{med.quantidade}</td>
              <td>{med.descricao}</td>
              <td>
                <Button 
                  variant="primary" 
                  onClick={() => solicitarRetirada(med.id)}
                  disabled={med.quantidade === 0}
                >
                  Solicitar Retirada
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </Container>
  );
};

export default UserDashboard;
