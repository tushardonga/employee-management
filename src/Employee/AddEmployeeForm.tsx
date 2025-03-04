import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from '../features/employeeSlice';

Modal.setAppElement('#root');

interface EmployeeModalProps {
  onRequestClose: () => void;
  employee?: { id: number; name: string; email: string; role: string };
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({
  onRequestClose,
  employee,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setRole(employee.role);
      setEmail(employee.email);
    } else {
      setName('');
      setRole('');
      setEmail('');
    }
  }, [employee]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const employeeData = { id: employee?.id, name, role, email };

    if (employee) {
      dispatch(updateEmployee(employeeData));
    } else {
      dispatch(addEmployee(employeeData));
    }

    onRequestClose();
  };

  return (
    <>
      <h2 className='text-2xl font-bold mb-4'>{employee ? "Edit Employee Profile" :"Add Employee Profile"}</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='position'
          >
            Role
          </label>
          <input
            type='text'
            id='role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            required
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            onClick={onRequestClose}
            type='button'
            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EmployeeModal;
