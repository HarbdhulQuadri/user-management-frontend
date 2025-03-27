import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CreateUserFormData, UpdateUserFormData } from '../../types/user';

interface ContactInfoStepProps {
  register: UseFormRegister<CreateUserFormData | UpdateUserFormData>;
  errors: FieldErrors<CreateUserFormData | UpdateUserFormData>;
}

export const ContactInfoStep: React.FC<ContactInfoStepProps> = ({ register, errors }) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600">Contact Info</h2>
      <div>
        <input
          {...register('contact.email')}
          placeholder="Email"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.contact?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.contact.email.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('contact.phone')}
          placeholder="Phone"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.contact?.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.contact.phone.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('contact.fax')}
          placeholder="Fax (optional)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.contact?.fax && (
          <p className="text-red-500 text-sm mt-1">{errors.contact.fax.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('contact.linkedInUrl')}
          placeholder="LinkedIn (optional)"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.contact?.linkedInUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.contact.linkedInUrl.message}</p>
        )}
      </div>
    </motion.div>
  );
}; 