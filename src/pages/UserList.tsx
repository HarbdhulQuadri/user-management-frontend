import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers, deleteUser } from '../store/userSlice';
import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { motion } from 'framer-motion';
import { User } from '../types/user';

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-600">User Directory</h1>
        <Link to="/create" className="btn-primary">Add New User</Link>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user: User) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={`http://localhost:8080/${user.photoPath}`}
                alt={user.firstName}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
              <div className="absolute top-0 right-0 mt-4 mr-4 space-x-2">
                <Link
                  to={`/user/${user.id}`}
                  className="inline-block bg-white p-2 rounded-full shadow-lg hover:bg-indigo-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </Link>
                <Link
                  to={`/edit/${user.id}`}
                  className="inline-block bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </Link>
                <button
                  onClick={() => dispatch(deleteUser(user.id))}
                  className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <Link to={`/user/${user.id}`} className="block hover:bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
                <p className="text-gray-600 mt-2">{user.occupation}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <p>{user.contact.email}</p>
                  <p>{user.contact.phone}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">{user.address.city}, {user.address.country}</p>
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserList;