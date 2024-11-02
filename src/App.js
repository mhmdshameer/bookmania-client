import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Form from './components/form';
import { useState } from 'react';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';

function App() {
  const [currentId, setCurrentId] = useState("")
  return (
   <div>
    <BrowserRouter>
   
      <Navbar/>
      <Routes>
       <Route path='/' element={<Home setCurrentId={setCurrentId}/>}/>
        <Route path='/adminpage' element={<AdminPage/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/form' element={<Form/>} />
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
