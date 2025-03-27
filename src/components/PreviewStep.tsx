import { motion } from 'framer-motion';
import { UseFormWatch } from 'react-hook-form';
import { CreateUserFormData, UpdateUserFormData, PastSchool } from '../types/user';

interface PreviewStepProps {
  watch: UseFormWatch<CreateUserFormData | UpdateUserFormData>;
}

export const PreviewStep: React.FC<PreviewStepProps> = ({ watch }) => {
  const formData = watch();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Preview Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <p className="font-medium">{`${formData.firstName} ${formData.lastName}`}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <p className="font-medium">{formData.dob}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Occupation
          </label>
          <p className="font-medium">{formData.occupation}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <p className="font-medium">{formData.gender}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Information
          </label>
          <p className="font-medium">{formData.contact.email}</p>
          <p className="font-medium">{formData.contact.phone}</p>
          {formData.contact.fax && <p className="font-medium">{formData.contact.fax}</p>}
          {formData.contact.linkedInUrl && <p className="font-medium">{formData.contact.linkedInUrl}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <p className="font-medium">{formData.address.street}</p>
          <p className="font-medium">{`${formData.address.city}, ${formData.address.state} ${formData.address.zipCode}`}</p>
          <p className="font-medium">{formData.address.country}</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Academic Information
          </label>
          <ul className="list-disc pl-5">
            {formData.academics.pastSchools.map((school: PastSchool, index: number) => (
              <li key={index} className="font-medium">
                {school.name} ({school.year})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};