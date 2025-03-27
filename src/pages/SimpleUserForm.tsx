import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { createUser } from '../store/userSlice';

const SimpleUserForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await dispatch(createUser(formData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New User</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <input name="firstName" type="text" placeholder="First Name" required className="w-full p-2 border rounded" />
          <input name="lastName" type="text" placeholder="Last Name" required className="w-full p-2 border rounded" />
          <input name="dob" type="date" required className="w-full p-2 border rounded" />
          <input name="occupation" type="text" placeholder="Occupation" required className="w-full p-2 border rounded" />
          <input name="gender" type="text" placeholder="Gender" required className="w-full p-2 border rounded" />
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Information</h2>
          <input name="contact[email]" type="email" placeholder="Email" required className="w-full p-2 border rounded" />
          <input name="contact[phone]" type="tel" placeholder="Phone" required className="w-full p-2 border rounded" />
          <input name="contact[fax]" type="text" placeholder="Fax (Optional)" className="w-full p-2 border rounded" />
          <input name="contact[linkedInUrl]" type="url" placeholder="LinkedIn URL (Optional)" className="w-full p-2 border rounded" />
        </div>

        {/* Address */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Address</h2>
          <input name="address[street]" type="text" placeholder="Street" required className="w-full p-2 border rounded" />
          <input name="address[city]" type="text" placeholder="City" required className="w-full p-2 border rounded" />
          <input name="address[state]" type="text" placeholder="State" required className="w-full p-2 border rounded" />
          <input name="address[country]" type="text" placeholder="Country" required className="w-full p-2 border rounded" />
          <input name="address[zipCode]" type="text" placeholder="Zip Code" required className="w-full p-2 border rounded" />
        </div>

        {/* Academics */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Academic History</h2>
          <div className="space-y-2">
            <input 
              name="academics[pastSchools][]" 
              type="text" 
              placeholder="School Name"
              className="w-full p-2 border rounded" 
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Photo</h2>
          <input
            name="photo"
            type="file"
            accept="image/*"
            required
            className="w-full p-2 border rounded"
          />
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
            {loading ? 'Creating...' : 'Create User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleUserForm;
