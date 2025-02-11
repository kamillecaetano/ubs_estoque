import React, { useEffect, useState} from "react";
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
    <div>
      <h1>Medicamentos</h1>
      <ul>
        {medicamentos.map((medicamento) => (
          <li key = {medicamento.id}>
            {medicamento.nome} - {medicamento.quantidade} unidades - Descrição: {medicamento.descricao}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicamentosList;