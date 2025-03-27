import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CreateUserFormData, UpdateUserFormData } from '../../types/user';

interface PersonalDetailsStepProps {
  register: UseFormRegister<CreateUserFormData | UpdateUserFormData>;
  errors: FieldErrors<CreateUserFormData | UpdateUserFormData>;
}

export const PersonalDetailsStep: React.FC<PersonalDetailsStepProps> = ({ register, errors }) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600">Personal Details</h2>
      <div>
        <input
          {...register('firstName')}
          placeholder="First Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('lastName')}
          placeholder="Last Name"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('dob')}
          type="date"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('occupation')}
          placeholder="Occupation"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.occupation && (
          <p className="text-red-500 text-sm mt-1">{errors.occupation.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('gender')}
          placeholder="Gender"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('photo')}
          type="file"
          className="w-full p-3"
        />
        {errors.photo && (
          <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
        )}
      </div>
    </motion.div>
  );
}; 