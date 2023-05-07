import React, { useEffect } from 'react';
import './App.css';
import TodoList from './todos/TodoList';
import Home from './home/Home';
import { Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/todos'} element={<TodoList />} />
      </Routes>
    </>
  );
}

export default App;
