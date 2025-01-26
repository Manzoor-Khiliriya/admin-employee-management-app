import { Route, Routes } from 'react-router-dom';
import Login from './components/Auth/login/Login';
import SignUp from './components/Auth/signUp/SignUp';
import Home from './pages/Home';
import Employees from './pages/Employees';
import CreateEmployee from './components/employee/createEmployee/CreateEmployee';
import UpdateEmployee from './components/employee/updateEmployee/UpdateEmployee';
import DeleteEmployee from './components/employee/deleteEmployee/DeleteEmployee';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/employees' element={<Employees />} />
        <Route path='/create-employee' element={<CreateEmployee />} />
        <Route path='/update-employee/:id' element={<UpdateEmployee />} />
        <Route path='/delete-employee/:id' element={<DeleteEmployee />} />
      </Routes>
    </>
  );
}

export default App;
