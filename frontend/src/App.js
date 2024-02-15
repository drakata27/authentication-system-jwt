/* eslint-disable no-unused-vars */
import './App.css';
import React from 'react'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoute from '../src/utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext';

import HomePage from '../src/views/HomePage'
import RegisterPage from '../src/views/RegisterPage'
import LoginPage from '../src/views/LoginPage'
import Dashboard from '../src/views/Dashboard'
import Navbar from '../src/views/Navbar'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Routes>

          <Route exact path='/dashboard' element={<PrivateRoute/>}>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
          </Route>

          <Route exact path='/login' element={<LoginPage/>}/>
          <Route exact path='/register' element={<RegisterPage/>}/>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
