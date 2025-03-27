import { User } from '../types/user';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getImageUrl } from '../config/config';
import { useState } from 'react';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        {!imageError ? (
          <img 
            src={getImageUrl(user.photoPath)}
            alt={user.firstName}
            className="w-full h-48 object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image not available</span>
          </div>
        )}
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
            onClick={() => onDelete(user.id)}
            className="bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-colors"
          >
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <Link to={`/user/${user.id}`} className="block">
        <div className="p-6 hover:bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-600 mt-2">{user.occupation}</p>
          <div className="mt-4 text-sm text-gray-500">
            <p>{user.contact.email}</p>
            <p>{user.contact.phone}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">{user.address.city}, {user.address.country}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default UserCard;