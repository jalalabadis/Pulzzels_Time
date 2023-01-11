import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Games from './pages/Games';
import Sort from './pages/Sort';
import Category from './pages/Category';
import Register from './pages/Register';
import Create from './pages/admin/Create';
import NotFound from './pages/NotFound';
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (

  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/games/:id' element={<Games/>}></Route>
    <Route path='/category/:id' element={<Category/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/create' element={<Create/>}></Route>
    <Route path='/sort/:id' element={<Sort/>}></Route>
    <Route path="*" element={<NotFound/>}></Route>
  </Routes>
  </BrowserRouter>
  
  );
}

export default App;
