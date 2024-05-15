import React from 'react';
import './App.css';
import CryptoSearch from './components/CryptoSearch';
import CryptoPortfolio from './components/CryptoPorfolio';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';

function App() {
  return (
  <>
   <div>
   <BrowserRouter>
   <Header>
      <Routes>
      <Route path ='/' element = {<Home/>} />
        <Route path ='/Search' element = {<CryptoSearch/>} />
        <Route path ='/Portfolio' element = {<CryptoPortfolio/>} /> 
      </Routes>
      </Header>
      </BrowserRouter>
    </div>
   </>
  );
  
}

export default App;
