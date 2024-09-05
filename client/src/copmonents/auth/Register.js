import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const Register = () => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Author'
  });

  const { username, password, role } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    register(formData);
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Register</h1>
      <input type="text" name="username" value={username} onChange={onChange} placeholder="Username" />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" />
      <select name="role" value={role} onChange={onChange}>
        <option value="Author">Author</option>
        <option value="Editor">Editor</option>
        <option value="Admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
