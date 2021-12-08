import React from 'react';
import './config/axiosConfig';
import KeepNotes from './components/keep-notes/keep-notes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <KeepNotes />
    </div>
  );
}

export default App;
