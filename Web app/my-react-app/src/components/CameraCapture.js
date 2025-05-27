import React, { useRef, useEffect, useState } from 'react';

export default function CameraCapture() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [error, setError] = useState('');
  const [capturedUrl, setCapturedUrl] = useState('');

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => { videoRef.current.srcObject = stream; videoRef.current.play(); })
      .catch(err => setError('Не вдалося отримати доступ до камери'));
  }, []);

  const capturePhoto = () => {
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    setCapturedUrl(dataUrl);
    // Для тесту: підтвердити успіх без відправки
    alert('Фото успішно збережено.');
    setError('');
  };

  return (
    <div className="camera-container">
      <h2>Зробіть фото для підтвердження присутності</h2>
      {error && <p className="error-msg">{error}</p>}
      <video ref={videoRef} className="video-preview" />
      <button onClick={capturePhoto}>Захопити фото</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {capturedUrl && <img src={capturedUrl} alt="Captured" className="preview-img" />}
    </div>
  );
}