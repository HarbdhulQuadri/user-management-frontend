import { motion } from 'framer-motion';

interface FormProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const FormProgress: React.FC<FormProgressProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-indigo-600">Step {currentStep} of {totalSteps}</span>
        <span className="text-sm font-medium text-indigo-600">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-indigo-600"
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-xs text-gray-500">Personal Details</span>
        <span className="text-xs text-gray-500">Contact Info</span>
        <span className="text-xs text-gray-500">Address</span>
        <span className="text-xs text-gray-500">Academics</span>
        <span className="text-xs text-gray-500">Preview</span>
      </div>
    </div>
  );
}; 