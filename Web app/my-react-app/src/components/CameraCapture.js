import React, { useRef, useEffect, useState } from 'react';
import { storage, auth } from '../firebase.js';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

export default function CameraCapture() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [error, setError] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(() => setError('Не вдалося отримати доступ до камери'));
  }, []);

  const capturePhoto = async () => {
    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    const dataUrl = canvasRef.current.toDataURL('image/png');
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Користувач не авторизований');
      // Зберігаємо під шляхом uid/timestamp.png
      const storageRef = ref(storage, `attendance/${user.uid}/${Date.now()}.png`);
      await uploadString(storageRef, dataUrl, 'data_url');
      const downloadUrl = await getDownloadURL(storageRef);
      setPhotoUrl(downloadUrl);
      alert('Фото успішно завантажено');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="camera-container">
      <h2>Зробіть фото для підтвердження присутності</h2>
      {error && <p className="error-msg">{error}</p>}
      <video ref={videoRef} className="video-preview" />
      <button onClick={capturePhoto}>Захопити фото</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {photoUrl && (
        <div>
          <p>Ваше фото:</p>
          <img src={photoUrl} alt="Uploaded" className="preview-img" />
        </div>
      )}
    </div>
  );
}