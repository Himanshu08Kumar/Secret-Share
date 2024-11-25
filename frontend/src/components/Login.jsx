import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div className='flex flex-col my-32 font-medium mx-auto content-center text-center border max-w-[680px] py-20 rounded shadow-xl'>
      <h2 className='text-3xl text-stone-600'>Log<span className='text-blue-700'>in</span></h2>
      <form onSubmit={handleSubmit}>
        <input
        className='border-2 p-2 mb-1 mt-4 max-w-[360px] w-1/2'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
        className='border-2 p-2 my-2 max-w-[360px] w-1/2'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit" className='bg-blue-700 text-white w-1/2 text-base py-2 rounded hover:bg-white hover:text-blue-700 transition-all duration-500 border border-blue-700 mb-3'>Login</button>
        <p className='text-gray-500'>Don't have an account? <span className='text-blue-500 underline'><Link to="/register">Click here</Link></span></p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
