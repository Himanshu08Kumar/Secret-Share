import React, { useState } from 'react';
import axios from 'axios';

const SecretForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:3000/api/secrets', { title, content }, {
      headers: { 'x-auth-token': token },
    });
    setContent('');
  };

  return (
    <div>
      <h2 className='text-2xl text-slate-700 font-semibold py-5'>Share a Secret</h2>
      <form onSubmit={handleSubmit}>
        <input type="text"
        className='border-2 p-2 mb-1 mt-4 max-w-[390px] w-1/2 '
          placeholder="Title of your secret"    
          value={title}     
          onChange={(e)=> setTitle(e.target.value)}
          />
          <br />
        <textarea
        className='border-2 p-2 mb-1 mt-4 max-w-[390px] w-1/2'
          placeholder="Write your secret"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <br />
        <button className='bg-blue-700 text-white w-1/2 text-base py-2 rounded hover:bg-white hover:text-blue-700 transition-all duration-500 border border-blue-700 mb-3' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SecretForm;
