import React, { useState } from 'react';
import './styles/CadastroMedicamentos.css';
import api from '../api';

const CadastroMedicamentos = () => {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [descricao, setDescricao] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      await api.post('/cadastro-medicamentos', {nome, quantidade, descricao});
      alert('Medicamento cadastrado com sucesso!');
    }catch(error){
      console.error('Erro ao cadastrar medicamento:', error);
    }
  };

  return(
    <div className="medicamento-cadastro-container">
    <div className="header">
      <h1>Cadastrar Medicamento</h1>
      <p>Preencha os detalhes abaixo para cadastrar um novo medicamento</p>
    </div>

    <form onSubmit={handleSubmit} className="medicamento-form">
      <input 
        type="text" 
        placeholder="Nome" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        className="form-input"
      />
      <input 
        type="number" 
        placeholder="Quantidade" 
        value={quantidade} 
        onChange={(e) => setQuantidade(e.target.value)} 
        className="form-input"
      />
      <textarea 
        placeholder="Descrição" 
        value={descricao} 
        onChange={(e) => setDescricao(e.target.value)} 
        className="form-textarea"
      />
      <button type="submit" className="form-button">Cadastrar</button>
    </form>
  </div>
  );
};

export default CadastroMedicamentos;