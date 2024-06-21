import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate('/login?logout=true');
  }, [navigate]);

  return null; // No need to render anything
};

export default Logout;
