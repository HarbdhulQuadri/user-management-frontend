import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserList from './pages/UserList';
import SimpleUserForm from './pages/SimpleUserForm';
import EditUserForm from './pages/EditUserForm';
import UserView from './pages/UserView';
import './index.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-2xl hover:text-indigo-100 transition-colors">
          User Management
        </Link>
        <Link 
          to="/create" 
          className="bg-white text-indigo-600 px-6 py-2 rounded-full font-medium hover:bg-indigo-50 transition-all transform hover:scale-105 shadow-md"
        >
          Add New User
        </Link>
      </div>
    </nav>
    <main className="container mx-auto px-4 py-8">
      {children}
    </main>
    <footer className="bg-gray-800 text-gray-400 py-8 mt-auto">
      <div className="container mx-auto px-6 text-center">
        <p>© 2024 User Management System. All rights reserved.</p>
      </div>
    </footer>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/create" element={<SimpleUserForm />} />
          <Route path="/edit/:id" element={<EditUserForm />} />
          <Route path="/user/:id" element={<UserView />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;