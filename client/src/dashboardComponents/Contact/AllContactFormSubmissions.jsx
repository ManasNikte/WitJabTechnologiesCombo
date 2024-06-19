import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllContactFormSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('https://witjabtechnologiescombo.onrender.com/api/contact');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
        setError('Failed to fetch submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return <div className="container mx-auto p-4 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-white">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Contact Form Submissions</h1>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full bg-gray-800 text-white border border-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4 border-b border-gray-700 text-left">Name</th>
              <th className="py-3 px-4 border-b border-gray-700 text-left">Email</th>
              <th className="py-3 px-4 border-b border-gray-700 text-left">Subject</th>
              <th className="py-3 px-4 border-b border-gray-700 text-left">Message</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id} className="hover:bg-gray-700">
                <td className="py-3 px-4 border-b border-gray-700">{submission.name}</td>
                <td className="py-3 px-4 border-b border-gray-700">{submission.email}</td>
                <td className="py-3 px-4 border-b border-gray-700">{submission.subject}</td>
                <td className="py-3 px-4 border-b border-gray-700">{submission.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllContactFormSubmissions;
