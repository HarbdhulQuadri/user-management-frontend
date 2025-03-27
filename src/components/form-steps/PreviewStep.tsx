import { motion } from 'framer-motion';
import { UseFormWatch } from 'react-hook-form';
import { CreateUserFormData, UpdateUserFormData } from '../../types/user';

interface PreviewStepProps {
  watch: UseFormWatch<CreateUserFormData | UpdateUserFormData>;
}

export const PreviewStep: React.FC<PreviewStepProps> = ({ watch }) => {
  const formData = watch();

  if (!formData) {
    return <div>Loading form data...</div>;
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <h2 className="text-2xl font-bold text-indigo-600">Preview Your Information</h2>
      
      {/* Personal Details */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Personal Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-medium">
              {formData.firstName && formData.lastName 
                ? `${formData.firstName} ${formData.lastName}`
                : 'Name not provided'}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Date of Birth</p>
            <p className="font-medium">{formData.dob || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-gray-600">Occupation</p>
            <p className="font-medium">{formData.occupation || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-gray-600">Gender</p>
            <p className="font-medium">{formData.gender || 'Not specified'}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Contact Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-medium">{formData.contact?.email || 'Email not provided'}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-medium">{formData.contact?.phone || 'Not specified'}</p>
          </div>
          <div>
            <p className="text-gray-600">Fax</p>
            <p className="font-medium">{formData.contact?.fax || 'N/A'}</p>
          </div>
          <div>
            <p className="text-gray-600">LinkedIn</p>
            <p className="font-medium">
              {formData.contact?.linkedInUrl ? (
                <a href={formData.contact.linkedInUrl} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              ) : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Address</h3>
        <div className="space-y-2">
          <p className="font-medium">{formData.address?.street || 'Not specified'}</p>
          <p className="font-medium">
            {formData.address ? 
              `${formData.address.city || ''}, ${formData.address.state || ''} ${formData.address.zipCode || ''}` :
              'Not specified'
            }
          </p>
          <p className="font-medium">{formData.address?.country || 'Not specified'}</p>
        </div>
      </div>

      {/* Academic Background */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Academic Background</h3>
        <div className="space-y-4">
          {formData.academics?.pastSchools?.length > 0 ? (
            <div>
              <p className="text-gray-600 mb-2">Past Schools</p>
              <ul className="list-disc list-inside space-y-1">
                {formData.academics.pastSchools.map((school, index) => (
                  <li key={index} className="font-medium">
                    {school.name} ({school.year || 'Year not specified'})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">No schools added</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};