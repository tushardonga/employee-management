
import EmployeeList from './Employee/EmployeeList';
import Heading from './component/layout/Heading';
import './App.css';

function App() {

  return (
    <div className="min-h-screen">
    <Heading />
    <div className="mt-8 p-4">
      <EmployeeList />
    </div>
  </div>
  );
}

export default App;