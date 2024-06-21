import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Unsubscribe = () => {
  const { id } = useParams(); // Use useParams hook to get route parameters
  const [subscribedUser, setSubscribedUser] = useState(null);

  useEffect(() => {
    console.log('Component mounted or ID changed', { id });

    const fetchSubscriptionDetails = async () => {
      console.log('Fetching subscription details for ID:', id);

      try {
        const response = await axios.get(`https://witjabtechnologiescombo.onrender.com/newsletterbyid/${id}`);
        console.log('Fetched subscription details:', response.data);

        setSubscribedUser(response.data); // Assuming server returns details of subscribed user
      } catch (error) {
        console.error('Error fetching subscription details:', error);
      }
    };

    fetchSubscriptionDetails();
  }, [id]);

  const handleUnsubscribe = async () => {
    console.log('Handle unsubscribe clicked');

    if (!subscribedUser) {
      console.error('No subscription details found.');
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to unsubscribe ${subscribedUser.email}?`);
    if (confirmed) {
      console.log('User confirmed unsubscribe');
      
      try {
        await axios.delete(`https://witjabtechnologiescombo.onrender.com/newsletterunsubscribe/${id}`);
        console.log('Successfully unsubscribed');
      } catch (error) {
        console.error('Error unsubscribing:', error);
      }
    } else {
      console.log('User canceled unsubscribe');
    }
  };

  console.log('Render:', { id, subscribedUser });

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h2>You are about to unsubscribe.</h2>
      <p>Subscription ID: {id}</p>
      {subscribedUser ? (
        <>
          <p>You are subscribed with email: {subscribedUser.email}</p>
          <button onClick={handleUnsubscribe}>Confirm Unsubscribe</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Unsubscribe;
