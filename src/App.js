import './App.css';
import Navbar from './components/Navbar';
import Upload from './components/Upload';
import Download from './components/Download';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path='/' element={<Upload/>}/>
      <Route path='/download' element={<Download/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
