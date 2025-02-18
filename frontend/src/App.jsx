import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import MedicamentosList from './pages/MedicamentosList';
import CadastroMedicamento from './pages/CadastroMedicamentos';
import Login from './pages/Login';



const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/home" element={<Home/>} />
        <Route path='/medicamentos' element= {<MedicamentosList/>}/>
        <Route path="/cadastro-medicamentos" element={<CadastroMedicamento />} />
        
      </Routes>
    </Router>
  );
};

export default App
