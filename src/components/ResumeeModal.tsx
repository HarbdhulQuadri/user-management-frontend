import { Dialog } from '@headlessui/react';
import { motion } from 'framer-motion';
import { User } from '../types/user';

interface ResumeeModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeeModal: React.FC<ResumeeModalProps> = ({ user, isOpen, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">User Information</h3>
                
                {/* Personal Details */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Personal Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Name</p>
                      <p className="text-gray-600">{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Date of Birth</p>
                      <p className="text-gray-600">{user.dob}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Occupation</p>
                      <p className="text-gray-600">{user.occupation}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Gender</p>
                      <p className="text-gray-600">{user.gender}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Contact Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600">{user.contact.email}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-gray-600">{user.contact.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Fax</p>
                      <p className="text-gray-600">{user.contact.fax || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">LinkedIn</p>
                      <p className="text-gray-600">
                        {user.contact.linkedInUrl ? (
                          <a href={user.contact.linkedInUrl} className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">
                            View Profile
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-2">Address</h4>
                  <div className="space-y-2">
                    <p className="text-gray-600">{user.address.street}</p>
                    <p className="text-gray-600">
                      {`${user.address.city}, ${user.address.state} ${user.address.zipCode}`}
                    </p>
                    <p className="text-gray-600">{user.address.country}</p>
                  </div>
                </div>

                {/* Academic Background */}
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-2">Academic Background</h4>
                  {user.academics.pastSchools.length > 0 && (
                    <div>
                      <p className="font-medium text-gray-900">Past Schools</p>
                      <ul className="list-disc list-inside space-y-1">
                        {user.academics.pastSchools.map((school, index) => (
                          <li key={index} className="text-gray-600">
                            {school.name} ({school.year})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};