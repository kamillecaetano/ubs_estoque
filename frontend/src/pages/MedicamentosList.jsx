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

  const handleRetirar = async (medicamentoId, nome) => {

    const quantidadeStr = prompt(`Quantos unidades deseja retirar de "${nome}"?`);
    if (!quantidadeStr || isNaN(quantidadeStr) || parseInt(quantidadeStr) <= 0) {
      alert("Quantidade inválida!");
      return;
    }
    const quantidade = parseInt(quantidadeStr);

    const confirmacao = window.confirm(`Tem certeza que deseja retirar ${quantidade} unidade(s) de "${nome}"?`);
    if (!confirmacao) return;

    try {
      const response = await api.post('/medicamentos/retirar', { medicamentoId, quantidade });
      if (response.status === 200) {
        alert('Retirada realizada com sucesso');
        const updatedResponse = await api.get('/medicamentos');
        setMedicamentos(updatedResponse.data);
      }
    } catch (error) {
      console.error('Erro ao retirar medicamento:', error);
      alert(error.response.data.erro);
    }
  };

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
              <td><button onClick={() => handleRetirar(medicamento.id, medicamento.nome, medicamento.quantidade )}>Retirar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedicamentosList;