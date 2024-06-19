import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email address</label>
            <input
              className="w-full p-2 border rounded"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              className="w-full p-2 border rounded"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
        </form>
        <button onClick={() => navigate("/")} className="w-full bg-gray-300 text-black p-2 rounded mt-4">Go to Home</button>
      </div>
    </div>
  );
};

export default Login;
