import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CreateUserFormData, UpdateUserFormData } from '../../types/user';

interface AddressStepProps {
  register: UseFormRegister<CreateUserFormData | UpdateUserFormData>;
  errors: FieldErrors<CreateUserFormData | UpdateUserFormData>;
}

export const AddressStep: React.FC<AddressStepProps> = ({ register, errors }) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
      <h2 className="text-2xl font-bold text-indigo-600">Address</h2>
      <div>
        <input
          {...register('address.street')}
          placeholder="Street Address"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.address?.street && (
          <p className="text-red-500 text-sm mt-1">{errors.address.street.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('address.city')}
          placeholder="City"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.address?.city && (
          <p className="text-red-500 text-sm mt-1">{errors.address.city.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('address.state')}
          placeholder="State"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.address?.state && (
          <p className="text-red-500 text-sm mt-1">{errors.address.state.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('address.country')}
          placeholder="Country"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.address?.country && (
          <p className="text-red-500 text-sm mt-1">{errors.address.country.message}</p>
        )}
      </div>
      <div>
        <input
          {...register('address.zipCode')}
          placeholder="Zip Code"
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        />
        {errors.address?.zipCode && (
          <p className="text-red-500 text-sm mt-1">{errors.address.zipCode.message}</p>
        )}
      </div>
    </motion.div>
  );
};