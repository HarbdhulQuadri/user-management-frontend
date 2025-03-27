import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUserForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`);
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError('Failed to fetch user data');
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await axios.put(`http://localhost:8080/users/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Update Success:', response.data);
      navigate('/');
    } catch (err) {
      console.error('Update Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <input
            name="firstName"
            type="text"
            defaultValue={userData.firstName}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="lastName"
            type="text"
            defaultValue={userData.lastName}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="dob"
            type="date"
            defaultValue={userData.dob?.split('T')[0]}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="occupation"
            type="text"
            defaultValue={userData.occupation}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="gender"
            type="text"
            defaultValue={userData.gender}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <input
            name="contact[email]"
            type="email"
            defaultValue={userData.contact.email}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="contact[phone]"
            type="tel"
            defaultValue={userData.contact.phone}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="contact[fax]"
            type="text"
            defaultValue={userData.contact.fax}
            className="w-full p-2 border rounded"
          />
          <input
            name="contact[linkedInUrl]"
            type="url"
            defaultValue={userData.contact.linkedInUrl}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Address</h2>
          <input
            name="address[street]"
            type="text"
            defaultValue={userData.address.street}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="address[city]"
            type="text"
            defaultValue={userData.address.city}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="address[state]"
            type="text"
            defaultValue={userData.address.state}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="address[country]"
            type="text"
            defaultValue={userData.address.country}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="address[zipCode]"
            type="text"
            defaultValue={userData.address.zipCode}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Academics */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Academic History</h2>
          <div className="space-y-2">
            {userData.academics.pastSchools.map((school: string, index: number) => (
              <input
                key={index}
                name="academics[pastSchools][]"
                type="text"
                defaultValue={school}
                className="w-full p-2 border rounded"
              />
            ))}
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Photo</h2>
          <input
            name="photo"
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded"
          />
          {userData.photoPath && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Current photo: {userData.photoPath}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Update User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserForm;
