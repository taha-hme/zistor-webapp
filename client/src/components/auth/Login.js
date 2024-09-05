import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Login</h1>
      <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
