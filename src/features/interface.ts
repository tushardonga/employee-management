export interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
}

export interface EmployeeState {
  employees: Employee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
