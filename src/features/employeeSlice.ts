import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Employee, EmployeeState } from './interface';

export const fetchEmployees = createAsyncThunk<Employee[]>('employees/fetchEmployees', async () => {
  const response = await axios.get('/api/employees');
  return response.data.employees;
});

export const addEmployee = createAsyncThunk<Employee, Employee>('employees/addEmployee', async (employee) => {
  const response = await axios.post('/api/employees', employee);
  return response.data.employee;
});

export const updateEmployee = createAsyncThunk<Employee, Employee>('employees/updateEmployee', async (employee) => {
  const response = await axios.put(`/api/employees/${employee.id}`, employee);
  return response.data.employee;
});

export const deleteEmployee = createAsyncThunk<number, number>('employees/deleteEmployee', async (id) => {
  await axios.delete(`/api/employees/${id}`);
  return id;
});

const initialState: EmployeeState = {
    employees: [],
    status: 'idle',
    error: null,
  };

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex(emp => emp.id === action.payload.id);
        state.employees[index] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter(emp => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;