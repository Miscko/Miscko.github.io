import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QRScanner from './components/QRScanner';
import Registration from './components/Registration';
import CameraCapture from './components/CameraCapture';

export default function App() {
  return (
    <div className="app-container">
      <header className='header'>
        <h3>
          NULP StarVerify
        </h3>
      </header>
      <Routes>
        <Route path="/" element={<QRScanner />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/capture" element={<CameraCapture />} />
      </Routes>
      <footer className='footer'>
        <p> NULP StarVerify </p>
      </footer>
    </div>
  );
}