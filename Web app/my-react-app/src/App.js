import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import CameraCapture from './components/CameraCapture';

export default function App() {
  return (
    <div className="app-container">
      <header className='header'>
        NULP StarVerify
      </header>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/capture" element={<CameraCapture />} />
      </Routes>
      <footer className='footer'>
        Контакти: +380677777777         Адреса: Україна, Львівська область, Львів, вулиця Степана Бандери 28А
      </footer>
    </div>
  );
}