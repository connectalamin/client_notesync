import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import { Toaster } from 'react-hot-toast';

function App() {
  const routes = (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/signup" exact element={<SignUp />} />
      </Routes>
    </Router>
  );
  return (
    <>
      {routes}
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          className: '',
          duration: 2000,
          style: {
            background: '#fff',
            color: '#000',
          },
        }}
      />
    </>
  );
}

export default App;
