import React, { useEffect } from 'react';
import axios from 'axios';

const Unsubscribe = ({ match }) => {
  const { email } = match.params;

  useEffect(() => {
    const unsubscribe = async () => {
      try {
        await axios.delete(`https://witjabtechnologiescombo.onrender.com/newsletterunsubscribe/${email}`);
        console.log('Successfully unsubscribed');
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    };

    unsubscribe();
  }, [email]);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h2>You have been unsubscribed.</h2>
      <p>We are sorry to see you go.</p>
    </div>
  );
};

export default Unsubscribe;
