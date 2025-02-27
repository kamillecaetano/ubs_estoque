import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import MedicamentosList from './pages/MedicamentosList';
import CadastroMedicamento from './pages/CadastroMedicamentos';
import Login from './pages/Login';
import EstoqueBaixo from './pages/EstoqueBaixo';
import HomeUser from './pages/HomeUser';
import Solicitacoes from './pages/Solicitacoes';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path='/medicamentos' element= {<MedicamentosList/>}/>
        <Route path="/cadastro-medicamentos" element={<CadastroMedicamento />} />
        <Route path="/estoque-baixo" element={<EstoqueBaixo />} />
        <Route path="/home-user" element={<HomeUser />} /> 
        <Route path="/solicitacoes" element={<Solicitacoes />} />

      </Routes>
    </Router>
  );
};

export default App
