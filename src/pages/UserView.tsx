import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { getImageUrl } from '../config/config';

const UserView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setUserData(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!userData) return <div className="text-center py-8">User not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-8"
    >
      {/* Back button */}
      <div className="mb-6 flex items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Directory
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="relative h-64 bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white">
          <div className="flex items-center space-x-8">
            {!imageError ? (
              <img
                src={getImageUrl(userData.photoPath)}
                alt={userData.firstName}
                className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-40 h-40 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold">
                {userData.firstName} {userData.lastName}
              </h1>
              <p className="text-2xl mt-2 text-indigo-100">{userData.occupation}</p>
              <p className="mt-2 text-indigo-100">
                {userData.gender} · Born {new Date(userData.dob).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium">{userData.contact.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone</p>
                <p className="font-medium">{userData.contact.phone}</p>
              </div>
              {userData.contact.fax && (
                <div>
                  <p className="text-gray-600">Fax</p>
                  <p className="font-medium">{userData.contact.fax}</p>
                </div>
              )}
              {userData.contact.linkedInUrl && (
                <div>
                  <p className="text-gray-600">LinkedIn</p>
                  <a 
                    href={userData.contact.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                  >
                    View Profile
                  </a>
                </div>
              )}
            </div>
          </section>

          {/* Address */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4">
              Location
            </h2>
            <div className="space-y-2">
              <p className="text-lg">{userData.address.street}</p>
              <p className="text-lg">
                {userData.address.city}, {userData.address.state} {userData.address.zipCode}
              </p>
              <p className="text-lg">{userData.address.country}</p>
            </div>
          </section>

          {/* Education */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-2 mb-4">
              Education
            </h2>
            <ul className="space-y-4">
              {userData.academics.pastSchools.map((school: string, index: number) => (
                <li 
                  key={index}
                  className="flex items-center space-x-2 text-lg"
                >
                  <svg className="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                  </svg>
                  <span>{school}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 transition-colors"
        >
          Return to List
        </button>
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
        >
          Edit User
        </button>
      </div>
    </motion.div>
  );
};

export default UserView;
