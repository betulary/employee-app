import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import axios from 'axios';
import EmployeeDetails from './EmployeeDetails';
import EmployeeList from './EmployeeList';
import store from './store';
import { Provider } from 'react-redux';

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/users')
      .then(response => {
        setEmployees(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching employees: ', error);
      });
  }, []);

  return (
    <>
    <h1>Employee List</h1>
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<EmployeeList employees={employees}/>}>
          </Route>
          <Route path="/employee/:id" element={<EmployeeDetails/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;
