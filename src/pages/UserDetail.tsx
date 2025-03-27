import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUser, updateUser } from '../store/userSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { ResumeeModal } from '../components/ResumeeModal';
import { UserForm } from '../components/UserForm';
import type { UpdateUserFormData, CreateUserFormData } from '../types/user';

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const user = useSelector((state: RootState) => state.users.currentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (id) {
          await dispatch(fetchUser(parseInt(id))).unwrap();
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const initialData: UpdateUserFormData = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    dob: user.dob,
    occupation: user.occupation,
    gender: user.gender,
    contact: {
      email: user.contact.email,
      phone: user.contact.phone,
      fax: user.contact.fax,
      linkedInUrl: user.contact.linkedInUrl,
    },
    address: {
      street: user.address.street,
      city: user.address.city,
      state: user.address.state,
      country: user.address.country,
      zipCode: user.address.zipCode,
    },
    academics: {
      pastSchools: user.academics.pastSchools,
    },
  };

  const handleSubmit = async (data: UpdateUserFormData | CreateUserFormData) => {
    try {
      console.log('=== Form Submission Debug ===');
      console.log('1. Raw form data:', JSON.stringify(data, null, 2));
      const formData = new FormData();

      // Add personal information as a JSON string
      const personalInfo = {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: data.dob,
        occupation: data.occupation,
        gender: data.gender,
        contact: data.contact,
        address: data.address,
        academics: data.academics
      };
      
      formData.append('data', JSON.stringify(personalInfo));

      // Add photo if it exists
      if ('photo' in data && data.photo instanceof FileList && data.photo.length > 0) {
        formData.append('photo', data.photo[0]);
        console.log('2. Photo file added:', data.photo[0].name);
      }

      // Log the FormData contents
      console.log('3. FormData contents:');
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value instanceof File ? `File: ${value.name}` : value);
      }

      if (id) {
        console.log('4. Dispatching updateUser action');
        await dispatch(updateUser({ id: parseInt(id), formData })).unwrap();
        console.log('7. Update successful');
        navigate('/');
      }
    } catch (error) {
      console.error('8. Error in form submission:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while updating the user');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        <div className="space-x-4">
          <button
            onClick={() => setIsResumeOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            View Resume
          </button>
        </div>
      </div>

      <ResumeeModal
        user={user}
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <UserForm onSubmit={handleSubmit} initialData={initialData} isUpdate={true} />
    </div>
  );
};

export default UserDetail;