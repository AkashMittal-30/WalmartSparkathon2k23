import './App.css';
import Login from './components/Login';
import {Chatbot} from './components/Chatbot';
import {Routes,Route} from 'react-router-dom';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<Chatbot/>}/>
      </Routes>
    </>
  );
}

export default App;
