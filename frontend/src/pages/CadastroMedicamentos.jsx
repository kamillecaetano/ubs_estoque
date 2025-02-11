import React, { useState } from 'react';
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
    <div>
      <h1>Cadastrar Medicamento</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
        <input type="number" placeholder='Quantidade' value={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
        <textarea placeholder='Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroMedicamentos;