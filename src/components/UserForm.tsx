import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalDetailsStep } from './form-steps/PersonalDetailsStep';
import { ContactInfoStep } from './form-steps/ContactInfoStep';
import { AddressStep } from './form-steps/AddressStep';
import { AcademicsStep } from './form-steps/AcademicsStep';
import { PreviewStep } from './form-steps/PreviewStep';
import { FormProgress } from './form-steps/FormProgress';
import { FormNavigation } from './form-steps/FormNavigation';
import { CreateUserFormData, UpdateUserFormData } from '../types/user';
import { Resolver } from 'react-hook-form';

const TOTAL_STEPS = 5;

const createUserSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dob: yup.string().required('Date of birth is required'),
  occupation: yup.string().required('Occupation is required'),
  gender: yup.string().required('Gender is required'),
  photo: yup.mixed<FileList>().required('Photo is required'),
  contact: yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    fax: yup.string().nullable(),
    linkedInUrl: yup.string().url('Invalid LinkedIn URL').nullable(),
  }),
  address: yup.object().shape({
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    zipCode: yup.string().required('Zip code is required'),
  }),
  academics: yup.object().shape({
    pastSchools: yup.array().of(
      yup.object().shape({
        name: yup.string().required('School name is required'),
        year: yup.string().required('Year is required'),
      })
    ),
  }),
}) as yup.ObjectSchema<CreateUserFormData>;

const updateUserSchema = yup.object().shape({
  id: yup.number().required(),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  dob: yup.string().required('Date of birth is required'),
  occupation: yup.string().required('Occupation is required'),
  gender: yup.string().required('Gender is required'),
  photo: yup.mixed<FileList>().nullable(),
  contact: yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone is required'),
    fax: yup.string().nullable(),
    linkedInUrl: yup.string().url('Invalid LinkedIn URL').nullable(),
  }),
  address: yup.object().shape({
    street: yup.string().required('Street address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    country: yup.string().required('Country is required'),
    zipCode: yup.string().required('Zip code is required'),
  }),
  academics: yup.object().shape({
    pastSchools: yup.array().of(
      yup.object().shape({
        name: yup.string().required('School name is required'),
        year: yup.string().required('Year is required'),
      })
    ),
  }),
}) as yup.ObjectSchema<UpdateUserFormData>;

interface UserFormProps {
  onSubmit: (data: CreateUserFormData | UpdateUserFormData) => Promise<void>;
  initialData?: UpdateUserFormData;
  isUpdate?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialData, isUpdate = false }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormData = CreateUserFormData | UpdateUserFormData;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: (isUpdate ? yupResolver(updateUserSchema) : yupResolver(createUserSchema)) as Resolver<FormData>,
    defaultValues: initialData,
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmitForm = async (data: CreateUserFormData | UpdateUserFormData) => {
    try {
      setIsSubmitting(true);
      console.group('Form Submission');
      console.log('Form data:', data);
      
      await onSubmit(data);
      console.log('Submission successful');
      console.groupEnd();
    } catch (error) {
      console.error('Form submission error:', error);
      alert(error instanceof Error ? error.message : 'An error occurred while submitting the form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalDetailsStep register={register} errors={errors} />;
      case 2:
        return <ContactInfoStep register={register} errors={errors} />;
      case 3:
        return <AddressStep register={register} errors={errors} />;
      case 4:
        return <AcademicsStep register={register} errors={errors} control={control} />;
      case 5:
        return <PreviewStep watch={watch} />;
      default:
        return null;
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmitForm)} 
      className="max-w-2xl mx-auto p-6"
      encType="multipart/form-data"
    >
      <FormProgress currentStep={currentStep} totalSteps={TOTAL_STEPS} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <FormNavigation
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onSubmit={handleSubmit(onSubmitForm)}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default UserForm;