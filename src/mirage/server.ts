import { createServer, Model, Response } from 'miragejs';

// Define TypeScript interface for Employee
interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
}

export function makeServer() {
  createServer({
    models: {
        employee: Model.extend<Partial<Employee>>({}),
    },

    seeds(server) {
      server.create('employee', {
        id: '1',
        name: 'Alice Johnson',
        role: 'Engineer',
        email: 'alice@example.com',
      });
      server.create('employee', {
        id: '2',
        name: 'Bob Smith',
        role: 'Manager',
        email: 'bob@example.com',
      });
      server.create('employee', {
        id: '3',
        name: 'Charlie Brown',
        role: 'Designer',
        email: 'charlie@example.com',
      });
      server.create('employee', {
        id: '4',
        name: 'David White',
        role: 'HR',
        email: 'david@example.com',
      });
      server.create('employee', {
        id: '5',
        name: 'Eva Green',
        role: 'Engineer',
        email: 'eva@example.com',
      });
      server.create('employee', {
        id: '6',
        name: 'Frank Black',
        role: 'Sales',
        email: 'frank@example.com',
      });
      server.create('employee', {
        id: '7',
        name: 'Grace Blue',
        role: 'Support',
        email: 'grace@example.com',
      });
      server.create('employee', {
        id: '8',
        name: 'Henry Gold',
        role: 'CEO',
        email: 'henry@example.com',
      });
      server.create('employee', {
        id: '9',
        name: 'Ivy Red',
        role: 'Intern',
        email: 'ivy@example.com',
      });
      server.create('employee', {
        id: '10',
        name: 'Jack Orange',
        role: 'DevOps',
        email: 'jack@example.com',
      });
    },

    routes() {
      this.namespace = 'api';

      // Fetch all employees
      this.get('/employees', (schema) => {
        return { employees: schema.all('employee').models };
      });

      // Add a new employee
      this.post('/employees', (schema, request) => {
        try {
          const attrs = JSON.parse(request.requestBody);
          return schema.create('employee', attrs);
        } catch (error) {
          return new Response(400, {}, { error: 'Invalid request body' });
        }
      });

      // Update an employee
      this.put('/employees/:id', (schema: any, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody) as Partial<Employee>;
        const employee = schema.find('employee', id);

        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }

        return employee.update(attrs);
      });

      // Delete an employee
      this.delete('/employees/:id', (schema, request) => {
        const id = request.params.id;
        const employee = schema.find('employee', id);

        if (!employee) {
          return new Response(404, {}, { error: 'Employee not found' });
        }

        employee.destroy();
        return new Response(204);
      });
    },
  });
}
