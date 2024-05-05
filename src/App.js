import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";
import axios from 'axios';
import './App.css';

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
      <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<EmployeeList employees={employees}/>}>
          </Route>
          <Route path="/employee/:id" element={<EmployeeDetails/>} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

function EmployeeList({ employees }) {
  const savedVotes = useMemo(() => {
    return JSON.parse(localStorage.getItem('votes')) || {}
  }, []);

  const [sortedEmployees, setSortedEmployees] = useState([]);

  const sortEmployees = useCallback(() => {
    const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    const sorted = employees.slice().sort((a, b) => {
      const voteA = savedVotes[a.id] || 0;
      const voteB = savedVotes[b.id] || 0;

      return voteB - voteA;
    });

    setSortedEmployees(sorted);
  }, [employees]);

  useEffect(() => {
    sortEmployees();
  }, [sortEmployees]);

  const handleVoteChange = useCallback(() => {
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
          <VoteButton id={employee.id} onVoteChange={handleVoteChange}/>
        </div>
      ))}
    </div>
  );
}

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
}

function VoteButton({id, onVoteChange}) {
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    const initialVotes = savedVotes[id] || 0;
  
    setVotes(initialVotes);
  }, [id]);

  const handleVote = () => {
    const updatedVotes = votes + 1;
 
    setVotes(updatedVotes);
    
    const savedVotes = JSON.parse(localStorage.getItem('votes')) || {};
    const updatedSavedVotes = { ...savedVotes, [id]: updatedVotes };
   
    localStorage.setItem('votes', JSON.stringify(updatedSavedVotes));

    onVoteChange();
  };

  return (
    <button onClick={handleVote}>Vote ({votes})</button>
  );
}

export default App;
