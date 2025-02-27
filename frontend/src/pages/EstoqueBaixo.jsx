import React, { useEffect, useState } from "react";
import api from "../api";
import './styles/EstoqueBaixo.css';

const EstoqueBaixo = () => {
  const [estoqueBaixo, setEstoqueBaixo] = useState([]);

  useEffect(() => {
    const fetchEstoqueBaixo = async () => {
      try {
        const response = await api.get('/medicamentos/estoque-baixo');
        setEstoqueBaixo(response.data);
      } catch (error) {
        console.error('Erro ao buscar estoque baixo:', error);
      }
    };

    fetchEstoqueBaixo();
  }, []);

  return (
    <div className="estoque-container">
      <h2>Medicamentos com Estoque Baixo</h2>
      {estoqueBaixo.length === 0 ? (
        <p>Todos os medicamentos estão com estoque adequado.</p>
      ) : (
        <table className="estoque-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {estoqueBaixo.map((med) => (
              <tr key={med.id}>
                <td>{med.nome}</td>
                <td className="alerta">{med.quantidade}</td>
                <td>{med.descricao}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EstoqueBaixo;
