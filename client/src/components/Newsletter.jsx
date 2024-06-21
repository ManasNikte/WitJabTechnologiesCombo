import React, { useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple email validation
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post('https://yourapiurl.com/api/newsletter', { email });
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-800 text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Subscribe to our Newsletter</h2>
      <p className="mb-4 text-center">We won't spam you, promise!</p>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          className="appearance-none border w-full max-w-xs py-2 px-3 mb-4 text-black leading-tight focus:outline-none focus:shadow-outline"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Subscribe
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Newsletter;
