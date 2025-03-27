import { motion } from 'framer-motion';
import { UseFormRegister, FieldErrors, Control } from 'react-hook-form';
import { CreateUserFormData, UpdateUserFormData } from '../../types/user';
import { Controller } from 'react-hook-form';

interface AcademicsStepProps {
  register: UseFormRegister<CreateUserFormData | UpdateUserFormData>;
  errors: FieldErrors<CreateUserFormData | UpdateUserFormData>;
  control: Control<CreateUserFormData | UpdateUserFormData>;
}

interface PastSchool {
  name: string;
  year: string;
}

export const AcademicsStep: React.FC<AcademicsStepProps> = ({
  register,
  errors,
  control,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Academic Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Past Schools
          </label>
          <Controller
            name="academics.pastSchools"
            control={control}
            defaultValue={[{ name: '', year: '' }]}
            render={({ field }) => (
              <div className="space-y-4">
                {field.value.map((school: PastSchool, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={school.name}
                        onChange={(e) => {
                          const newSchools = [...field.value];
                          newSchools[index] = { ...school, name: e.target.value };
                          field.onChange(newSchools);
                        }}
                        placeholder="School name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={school.year}
                        onChange={(e) => {
                          const newSchools = [...field.value];
                          newSchools[index] = { ...school, year: e.target.value };
                          field.onChange(newSchools);
                        }}
                        placeholder="Year"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    {index === field.value.length - 1 && (
                      <button
                        type="button"
                        onClick={() => field.onChange([...field.value, { name: '', year: '' }])}
                        className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                      >
                        Add School
                      </button>
                    )}
                    {field.value.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newSchools = field.value.filter((_, i) => i !== index);
                          field.onChange(newSchools);
                        }}
                        className="mt-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </motion.div>
  );
};