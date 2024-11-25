import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3000/api/auth/register', { username, password });
      // setMessage(data.message);
      toast.success(data.message)
      navigate('/');
    } catch (err) {
      // setMessage(err.response.data.error);
      toast.error(err.response.data.error)
    }
  };

  return (
    <div className='flex flex-col my-32 font-medium mx-auto content-center text-center border max-w-[680px] py-20 rounded shadow-xl'>
      <h2 className='text-3xl text-stone-600'>Regis<span className='text-blue-700'>ter</span></h2>
      <form onSubmit={handleSubmit}>
        <input
        className='border-2 p-2 my-2 max-w-[360px] w-1/2'
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
        <button type="submit" className='bg-blue-700 text-white w-1/2 text-base py-2 rounded hover:bg-white hover:text-blue-700 transition-all duration-500 border border-blue-700 mb-3'>Register</button>
        <p className='text-gray-500'>Already have an account? <span className='text-blue-500 underline'><Link to="/">Click here</Link></span></p>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default Register;
