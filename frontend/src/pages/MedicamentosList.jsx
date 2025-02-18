import React, { useEffect, useState} from "react";
import './styles/MedicamentosList.css';
import api from "../api";

const MedicamentosList = () => {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const fetchMedicamentos = async() => {
      try{
        const response = await api.get('/medicamentos');
        setMedicamentos(response.data);
      }catch(error){
        console.error('Erro ao buscar medicamentos:', error);
      }
    };

    fetchMedicamentos();
  }, []);

  return(
    <div className="medicamentos-container">
      <div className="header">
        <h1>Medicamentos</h1>
      </div>
      <table className="medicamentos-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade</th>
            <th>Descrição</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((medicamento) => (
            <tr key={medicamento.id}>
              <td>{medicamento.nome}</td>
              <td>{medicamento.quantidade}</td>
              <td>{medicamento.descricao}</td>
              <td>
                <span className={`status ${medicamento.quantidade > 0 ? 'active' : 'inactive'}`}>
                  {medicamento.quantidade > 0 ? 'Disponível' : 'Indisponível'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicamentosList;