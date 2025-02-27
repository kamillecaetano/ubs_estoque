import React, { useEffect, useState } from 'react';
import api from '../api';
import { Table, Button, Container } from 'react-bootstrap';

const Solicitacoes = () => {
  const [solicitacoes, setSolicitacoes] = useState([]);

  useEffect(() => {
    const fetchSolicitacoes = async () => {
      try {
        const response = await api.get('/solicitacoes');
        setSolicitacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
      }
    };

    fetchSolicitacoes();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Solicitações Pendentes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Usuário</th>
            <th>Medicamento</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {solicitacoes.map((s) => (
            <tr key={s.id}>
              <td>{s.usuario}</td>
              <td>{s.medicamento}</td>
              <td>{s.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Solicitacoes;
