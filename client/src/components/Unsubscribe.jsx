import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Unsubscribe = () => {
  const { id } = useParams(); // Use useParams hook to get route parameters

  const handleUnsubscribe = async () => {
    const confirmed = window.confirm(`Are you sure you want to unsubscribe?`);
    if (confirmed) {
      try {
        await axios.delete(`https://witjabtechnologiescombo.onrender.com/newsletterunsubscribe/${id}`);
        console.log('Successfully unsubscribed');
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h2>You are about to unsubscribe.</h2>
      <p>You are subscribed with id: {id}</p>
      <button onClick={handleUnsubscribe}>Confirm Unsubscribe</button>
    </div>
  );
};

export default Unsubscribe;
