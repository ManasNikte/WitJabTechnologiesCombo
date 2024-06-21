import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Unsubscribe = () => {
  const { id } = useParams(); // Use useParams hook to get route parameters
  const [subscribedUser, setSubscribedUser] = useState(null);

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await axios.get(`https://witjabtechnologiescombo.onrender.com/newsletterbyid/${id}`);
        setSubscribedUser(response.data); // Assuming server returns details of subscribed user
      } catch (error) {
        console.error('Error fetching subscription details:', error);
      }
    };

    fetchSubscriptionDetails();
  }, [id]);

  const handleUnsubscribe = async () => {
    if (!id) {
      console.error('No subscription details found.');
      return;
    }
  
    const confirmed = window.confirm(`Are you sure you want to unsubscribe ${subscribedUser.email}?`);
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
        console.log({id});
      {subscribedUser && (
        <>
          <p>You are subscribed with email: {subscribedUser.email}</p>
          <button onClick={handleUnsubscribe}>Confirm Unsubscribe</button>
        </>
      )}
      {!subscribedUser && <p>Loading...</p>}
    </div>
  );
};

export default Unsubscribe;
