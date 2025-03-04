import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../features/employeeSlice';
import Modal from 'react-modal';
import EmployeeModal from './AddEmployeeForm';
import { Employee } from '../features/interface';
import { customModalStyles } from '../utils/constant';
import ProfileModal from './ProfileModal';

const EmployeeList: React.FC = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state.employees.employees);
  const loading = useSelector((state: any) => state.employees.loading);
  const error = useSelector((state: any) => state.employees.error);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteEmployee(id));
  };

  const onViewEmployee=(employee: Employee)=>{
    setIsProfileModalOpen(true);
    setSelectedEmployee(employee);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const onEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    openModal();
  };

  return (
    <div className='bg-white shadow-md rounded p-4 text-center'>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            <th className='py-2 px-4 border-b'>Name</th>
            <th className='py-2 px-4 border-b'>Role</th>
            <th className='py-2 px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee: Employee) => (
            <tr key={employee.id}>
              <td className='py-2 px-4 border-b'>{employee.name}</td>
              <td className='py-2 px-4 border-b'>{employee.role}</td>
              <td className='py-2 px-4 border-b'>
                <button
                  className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600'
                  onClick={() => onEditEmployee(employee)}
                >
                  Edit
                </button>
                <button
                  className='bg-red-500 text-white px-2 py-1 rounded mr-2 hover:bg-red-600'
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
                <button
                  className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600'
                  onClick={() => onViewEmployee(employee)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Example Modal'
        style={customModalStyles}
      >
        <EmployeeModal
          onRequestClose={closeModal}
          employee={selectedEmployee}
        />
      </Modal>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onRequestClose={() => setIsProfileModalOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
};

export default EmployeeList;
