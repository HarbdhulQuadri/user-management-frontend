import React from 'react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => Promise<void>;
  isSubmitting: boolean;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onSubmit,
  isSubmitting
}) => {
  return (
    <div className="mt-8 flex justify-between items-center">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1 || isSubmitting}
        className="px-4 py-2 text-sm font-medium text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {currentStep === totalSteps ? (
        <button
          type="button"
          disabled={isSubmitting}
          onClick={onSubmit}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      )}
    </div>
  );
};