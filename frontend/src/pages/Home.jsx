import React from "react";
import { useNavigate } from "react-router-dom";
import './styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleMedicamentosClick = () => {
    navigate('/medicamentos');
  };
  
  const handleCadastroMedicamentosClick = () => {
    navigate('/cadastro-medicamentos');
  };

  return(
    <div className="home-container">
      <h1>Sistema de Estoque da UBS</h1>
      <div className="button-container">
        <button onClick={handleMedicamentosClick}>Acessar Medicamentos</button>
        <button onClick={handleCadastroMedicamentosClick}>Cadastrar Medicamentos</button>
      </div>
    </div>
  );
};

export default Home;