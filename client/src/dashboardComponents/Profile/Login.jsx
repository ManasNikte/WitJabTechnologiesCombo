import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('logout') === 'true') {
      toast.info('You have been logged out.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  }, [location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://witjabtechnologiescombo.onrender.com/api/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard?loginSuccess=true');
    } catch (error) {
      console.error('Login failed', error);
      toast.error('Invalid credentials. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">Email address</label>
            <input
              className="w-full p-2 border rounded bg-gray-700 text-white"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password">Password</label>
            <input
              className="w-full p-2 border rounded bg-gray-700 text-white"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
        </form>
        <button onClick={() => navigate("/")} className="w-full bg-gray-600 text-white p-2 rounded mt-4">Go to Home</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
