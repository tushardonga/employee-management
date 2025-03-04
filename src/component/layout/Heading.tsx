import { useState } from 'react';
import Modal from 'react-modal';
import EmployeeModal from '../../Employee/AddEmployeeForm';
import { customModalStyles } from '../../utils/constant';

const Heading = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <header className='sticky top-0 bg-white shadow-md z-10 p-4 w-full'>
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-2xl font-semibold text-blue-700'>
          Employee Management
        </h1>
        <button
          className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded'
          onClick={openModal}
        >
          Add Employee
        </button>
      </div>
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel='Example Modal'
          style={customModalStyles}
        >
          <EmployeeModal onRequestClose={closeModal} />
        </Modal>
      )}
    </header>
  );
};

export default Heading;
