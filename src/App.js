import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import './config/axiosConfig';
import KeepNotes from './components/keep-notes/keep-notes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<Navigate to='/keep-notes' />}/>
        <Route exact path='/keep-notes' element={<KeepNotes />}/>
      </Routes>
    </div>
  );
}

export default App;
