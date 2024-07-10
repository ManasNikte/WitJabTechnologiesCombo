import React, { useState, useEffect } from 'react';
import Section from "./Section";
import { socials } from "../constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Define m, T, and S
  const [m, setM] = useState(new Map());
  const T = 'someKey';
  const S = 'someValue';

  useEffect(() => {
    // Initialize m with some initial data if not already set
    if (!m.has(T)) {
      const newM = new Map(m);
      newM.set(T, { toggle: null });
      setM(newM);
    }
  }, [T, m]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://witjabtechnologiescombo.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setIsSubmitted(true);
        toast.success('Message sent successfully', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      } else {
        const error = await response.json();
        toast.error(`Failed to send message: ${error.msg}`, {
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
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while sending your message', {
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

  useEffect(() => {
    if (m.get(T)) {
      const entry = m.get(T);
      if (entry && typeof entry === 'object') {
        const newM = new Map(m);
        newM.get(T).toggle = S;
        setM(newM);
      } else {
        console.error('m.get(T) is not an object');
      }
    } else {
      console.error('m.get(T) is undefined');
    }
  }, [m, T, S]);

  return (
    <Section id="contact" crosses={true}>
      <div className="container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-semibold text-center text-white mb-10">
          Contact Us
        </h2>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:pl-10">
            <h3 className="text-2xl font-semibold text-white mb-3">Get in Touch</h3>
            <ul className="flex gap-5 flex-wrap mb-4">
              {socials.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 rounded-full transition-colors hover:bg-gray-600"
                >
                  <img src={item.iconUrl} width={16} height={16} alt={item.title} />
                </a>
              ))}
            </ul>
            <div className="text-white space-y-2 mb-4">
              <p><strong>Email:</strong> contact@witjabtechnologies.com</p>
              <p><strong>Phone:</strong> (+91) 7021668646</p>
              <p><strong>Address:</strong> Thane, Maharashtra, India.</p>
            </div>
            <p className="text-white mb-10 ps-1">
              We would love to hear from you! Whether you have a question about
              our services, pricing, or anything else, our team is ready to
              answer all your questions.
            </p>
            <div className="mb-10 lg:pr-5">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120562.30067206293!2d73.0014603!3d19.213891949999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b8fcfe76fd59%3A0xcf367d85f7c50283!2sThane%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1718821884577!5m2!1sen!2sin"
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:pr-10 mb-10 lg:mb-0">
            {isSubmitted ? (
              <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg text-center">
                Contact form submitted successfully
              </div>
            ) : (
              <form className="bg-gray-800 p-8 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="name"
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400"
                    placeholder="Your Name"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="email"
                  >
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400"
                    placeholder="Your Email"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="subject"
                  >
                    Subject:
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400"
                    placeholder="Your Subject"
                  />
                </div>
                <div className="mb-6">
                  <label
                    className="block mb-2 text-sm font-medium text-white"
                    htmlFor="message"
                  >
                    Message:
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-600 bg-gray-700 text-white rounded-lg placeholder-gray-400"
                    rows="4"
                    placeholder="Your Message"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </Section>
  );
};

export default Contact;
