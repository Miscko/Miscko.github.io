import React from 'react';
import '../css/style.css';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

class ShowSinLin extends React.Component {
  state = {
    mode: 'register',
    regLogin: '',
    regEmail: '',
    regPassword: '',
    regConfirmPassword: '',
    loginEmail: '',
    loginPassword: '',
    error: '',
  };

  handleModeSwitch = () => this.setState(prev => ({ mode: prev.mode === 'register' ? 'login' : 'register', error: '' }));

  handleChange = e => this.setState({ [e.target.name]: e.target.value, error: '' });

  handleRegister = async e => {
    e.preventDefault();
    const { regEmail, regPassword, regConfirmPassword } = this.state;
    if (!regEmail || !regPassword || !regConfirmPassword) return this.setState({ error: 'Заповніть усі поля.' });
    if (regPassword !== regConfirmPassword) return this.setState({ error: 'Паролі не співпадають.' });
    try {
      await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      this.setState({ regLogin: '', regEmail: '', regPassword: '', regConfirmPassword: '', error: '' });
      if (this.props.onAuthSuccess) this.props.onAuthSuccess();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleLogin = async e => {
    e.preventDefault();
    const { loginEmail, loginPassword } = this.state;
    if (!loginEmail || !loginPassword) return this.setState({ error: 'Заповніть усі поля.' });
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      this.setState({ loginEmail: '', loginPassword: '', error: '' });
      if (this.props.onAuthSuccess) this.props.onAuthSuccess();
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const { mode, regLogin, regEmail, regPassword, regConfirmPassword, loginEmail, loginPassword, error } = this.state;
    return (
      <div className="auth-container">
        {mode === 'register' ? (
          <form className="auth-form" onSubmit={this.handleRegister}>
            <h2>Реєстрація</h2>
            {error && <div className="error">{error}</div>}
            <label>Логін<input type="text" name="regLogin" value={regLogin} onChange={this.handleChange} placeholder="Ваш логін" /></label>
            <label>Email<input type="email" name="regEmail" value={regEmail} onChange={this.handleChange} placeholder="example@domain.com" /></label>
            <label>Пароль<input type="password" name="regPassword" value={regPassword} onChange={this.handleChange} placeholder="Введіть пароль" /></label>
            <label>Підтвердіть пароль<input type="password" name="regConfirmPassword" value={regConfirmPassword} onChange={this.handleChange} placeholder="Повторіть пароль" /></label>
            <button type="submit">Зареєструватися</button>
            <p className="mode-switch-line">Вже зареєстровані? <button type="button" className="mode-switch" onClick={this.handleModeSwitch}>Увійти</button></p>
          </form>
        ) : (
          <form className="auth-form" onSubmit={this.handleLogin}>
            <h2>Вхід</h2>
            {error && <div className="error">{error}</div>}
            <label>Email<input type="email" name="loginEmail" value={loginEmail} onChange={this.handleChange} placeholder="example@domain.com" /></label>
            <label>Пароль<input type="password" name="loginPassword" value={loginPassword} onChange={this.handleChange} placeholder="Введіть пароль" /></label>
            <button type="submit">Увійти</button>
            <p className="mode-switch-line">Ще немає акаунту? <button type="button" className="mode-switch" onClick={this.handleModeSwitch}>Зареєструватися</button></p>
          </form>
        )}
      </div>
    );
  }
}

export default ShowSinLin;