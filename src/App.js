import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Form from './components/form';
import { useState } from 'react';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage';
import Book from './pages/Book';
import User from './pages/user';

function App() {
  const [currentId, setCurrentId] = useState("")
  return (
   <div>
    <BrowserRouter>
   
      <Navbar/>
      <Routes>
       <Route path='/' element={<Home/>}/>
        <Route path='/adminpage' element={<AdminPage/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/form' element={<Form currentId={currentId} setCurrentId={setCurrentId} />} />
        <Route path='/book/:id' element={<Book setCurrentId={setCurrentId} />} />
        <Route path='/user/:id' element={<User/>} />
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
