import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function Auth() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
    setForm({ name: '', surname: '', email: '', password: '' });
    setError('');
  };

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, surname, email, password } = form;
    if (!name || !surname || !email || !password) {
      return setError("Всі поля обов'язкові");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: `${name} ${surname}` });
      navigate('/capture');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (!email || !password) return setError('Email та пароль обов\'язкові');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/capture');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2>{mode === 'login' ? 'Вхід' : 'Реєстрація студента'}</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
        {mode === 'register' && (
          <>
            <input name="name" placeholder="Ім'я" value={form.name} onChange={handleChange} />
            <input name="surname" placeholder="Прізвище" value={form.surname} onChange={handleChange} />
          </>
        )}
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} />
        <button type="submit">{mode === 'login' ? 'Увійти' : 'Зареєструватися'}</button>
      </form>
      <p>
        {mode === 'login' ? "Ще не маєте акаунту?" : "Вже є акаунт?"}{' '}
        <button onClick={toggleMode} className="link-btn">
          {mode === 'login' ? 'Реєстрація' : 'Увійти'}
        </button>
      </p>
    </div>
  );
}