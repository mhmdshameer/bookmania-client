import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Form from './components/form';

function App() {
  return (
   <div>
    <BrowserRouter>
    <Navbar/>
      <Routes>
       <Route path='/' element={<Home/>}/>
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/form' element={<Form/>} />
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
