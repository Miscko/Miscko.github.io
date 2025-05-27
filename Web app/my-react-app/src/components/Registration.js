import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
  const [form, setForm] = useState({ name: '', surname: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, surname, email, password } = form;
    if (!name || !surname || !email || !password) {
      return setError("Всі поля обов'язкові");
    }
    // Simulate backend: store in localStorage and navigate
    localStorage.setItem('attendanceUser', JSON.stringify(form));
    navigate('/capture');
  };

  return (
    <div className="form-container">
      <h2>Реєстрація студента</h2>
      {error && <p className="error-msg">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Ім'я" value={form.name} onChange={handleChange} />
        <input name="surname" placeholder="Прізвище" value={form.surname} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Пароль" value={form.password} onChange={handleChange} />
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}