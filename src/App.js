import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Games from './pages/Games';
import Register from './pages/Register';
import Create from './pages/admin/Create';
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (

  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/games' element={<Games/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/create' element={<Create/>}></Route>
  </Routes>
  </BrowserRouter>
  
  );
}

export default App;
