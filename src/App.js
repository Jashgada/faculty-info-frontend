
import './App.css';
/* eslint-disable import/no-webpack-loader-syntax */
import React, { useState, useEffect } from 'react';
import { getAllProfessors } from './api/handler';
import { ListItemButton, ListItemText } from '@mui/material';


function App() {
  const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        getAllProfessors()?.then(response => setFaculties(response.data));

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);
  return (
    <div className="App">
      <header className="App-header">
       List of All Faculty
      </header>
      <div className='list'>
        {
        faculties.map((faculty) => {
          return (<li key={faculty._id}>
            {/* <Link to={{pathname: faculty._id}}>{faculty.name}</Link> */}
            <ListItemButton component="a" href={faculty._id}>
                <ListItemText primary={faculty.name} />
            </ListItemButton>
          </li>);
        })}
      </div>
    </div>
  );
}

export default App;
