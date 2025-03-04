import React from 'react';
import Modal from 'react-modal';
import { customModalStyles } from '../utils/constant';

Modal.setAppElement('#root');

interface ProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  employee?: { id: number; name: string; role: string; email: string };
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onRequestClose, employee }) => {
  if (!employee) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customModalStyles}
    >
      <div className="bg-white p-8 rounded shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4">Employee Profile</h2>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{employee.name}</p>
            <p className="text-gray-600">{employee.role}</p>
            <p className="text-gray-600">{employee.email}</p>
          </div>
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mt-4"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ProfileModal;