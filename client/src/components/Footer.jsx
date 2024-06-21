import React, { useState } from 'react';
import axios from 'axios';
import Section from "./Section";
import { socials } from "../constants";

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    try {
      await axios.post('https://witjabtechnologiescombo.onrender.com//api/newsletter', { email });
      setMessage('Thank you for subscribing!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-xl font-bold mb-2 text-center">Subscribe to our Newsletter</h2>
          <p className="mb-4 text-center text-n-4 text-sm">We won't spam you, promise!</p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-sm">
            <input
              className="appearance-none border w-full py-2 px-3 mb-4 text-white leading-tight focus:outline-none focus:shadow-outline text-sm"
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              type="submit"
            >
              Subscribe
            </button>
          </form>
          {message && <p className="mt-4 text-center text-sm">{message}</p>}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-10">
          <p className="text-center text-sm text-n-4 sm:order-2 lg:order-1">
            © {new Date().getFullYear()}. All rights reserved WitJab Technologies.
          </p>
          <ul className="flex gap-5 sm:order-1 lg:order-2">
            {socials.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
                >
                  <img src={item.iconUrl} width={16} height={16} alt={item.title} />
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/login" 
            className="text-center text-sm text-n-4 underline sm:order-3 lg:order-3"
          >
            Login
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
