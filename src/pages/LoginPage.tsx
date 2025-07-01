import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './LoginPage.module.scss'
import { login } from '../services/api'
import logo from '../assets/images/logo.png'

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username);
      navigate('/profile');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <div style={{ padding: '35px 170px' }}>
        <img onClick={() => navigate('/')} src={logo} alt='logo' width={30} />
      </div>

      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <caption>Sign In</caption>
          {error && <p className={styles.error}>{error}</p>}
          <label style={{ fontSize: '12px' }}>Username</label>
          <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
          <button type='submit'>Sign In</button>
        </form>
      </div>
    </>
  )
}

export default LoginPage