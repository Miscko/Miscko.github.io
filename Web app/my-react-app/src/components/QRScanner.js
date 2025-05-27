import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QRScanner() {
  const qrRegionId = 'html5qr-code-full-region';
  const navigate = useNavigate();
  const scannerRef = useRef(null);

  useEffect(() => {
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const scanner = new Html5QrcodeScanner(qrRegionId, config, false);

    scanner.render(
      (decodedText) => {
        scanner.clear().then(() => navigate('/register'));
      },
      (errorMessage) => { console.warn('QR error', errorMessage); }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [navigate]);

  return (
    <div className="scanner-container">
      <h2>Скануйте QR-код аудиторії</h2>
      <div id={qrRegionId} ref={scannerRef} style={{ width: '100%' }} />
    </div>
  );
}