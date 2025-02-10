import React from 'react';
import 'App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import MainProvider from 'context/MainContext';
import ThreeHoursOfLocation from 'pages/ThreeHoursOfLocation';
const basename = process.env.REACT_APP_PUBLIC_URL

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <MainProvider>
          <Routes>
            <Route path='/3hours' element={<ThreeHoursOfLocation />} />
            <Route path='/' element={<HomePage />} />
          </Routes>
        </MainProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
