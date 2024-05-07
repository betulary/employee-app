import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

function EmployeeDetails() {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();
    
    useEffect(() => {
      axios.get(`https://dummyjson.com/users/${id}`)
        .then(response => {
          setEmployee(response.data);
        })
        .catch(error => {
          console.error('Error fetching employee details: ', error);
        });
    }, [id]);
  
    if (!employee) return <div>Loading...</div>;
  
    return (
      <div className="EmployeeDetails">
        <h2>{employee.firstName} {employee.lastName}</h2>
        <p>Email: {employee.email}</p>
        <p>Address: {employee.maidenName}</p>
        <p>Phone: {employee.phone}</p>
      </div>
    );
};

export default EmployeeDetails;
