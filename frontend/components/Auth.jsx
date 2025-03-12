// Auth.jsx
import { useState } from 'react';
import axios from 'axios';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('/api/signup', { email, password });
      alert('Inscription réussie !');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>S'inscrire</button>
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};