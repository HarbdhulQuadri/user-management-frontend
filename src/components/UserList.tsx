import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUsers, deleteUser } from '../store/userSlice';
import { Link } from 'react-router-dom';
import UserCard from '../components/UserCard';
import { motion } from 'framer-motion';

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // Use typed dispatch
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
        {users.map((user) => (
          <UserCard key={user.id} user={user} onDelete={(id: number) => dispatch(deleteUser(id))} />
        ))}
      </div>
    </div>
  );
};

export default UserList;