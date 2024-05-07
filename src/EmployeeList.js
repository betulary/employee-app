import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import './App.css';
import VoteButton from './VoteButton';
import store from './store.js';
import { Provider, useSelector } from 'react-redux';

function EmployeeList({ employees }) {
    const savedVotes = useSelector(state => state.votes);
  
    const [sortedEmployees, setSortedEmployees] = useState([]);
  
    const sortEmployees = useCallback(() => {
      const sorted = employees.slice().sort((a, b) => {
        const voteA = savedVotes[a.id] || 0;
        const voteB = savedVotes[b.id] || 0;
  
        return voteB - voteA;
      });
  
      setSortedEmployees(sorted);
    }, [employees, savedVotes]);
  
    useEffect(() => {
      sortEmployees();
    }, [sortEmployees]);
  
    return (
      <div className="EmployeeList">
        {sortedEmployees.map(employee => (
          <div key={employee.id} className="Employee" vote={savedVotes[employee.id]}>
            <Link to={`/employee/${employee.id}`}>
              <img src={employee.image} alt={`${employee.firstName} ${employee.lastName}`} />
              <h2>{employee.firstName} {employee.lastName}</h2>
              <p>{employee.company.department}</p>
            </Link>
            <Provider store={store}>
                <VoteButton id={employee.id}/>
            </Provider>
          </div>
        ))}
      </div>
    );
};

export default EmployeeList;
