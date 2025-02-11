import react from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MedicamentosList from './pages/MedicamentosList';
import CadastroMedicamento from './pages/CadastroMedicamentos';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/medicamentos' element= {<MedicamentosList/>}/>
        <Route path="/cadastro-medicamentos" element={<CadastroMedicamento />} />
      </Routes>
    </Router>
  );
};

export default App
