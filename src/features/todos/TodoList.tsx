import React, { useState } from 'react';
import { useGetTodosQuery } from '../api/apiSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState<string>('');

  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  console.log(`todos: `, todos);
  console.log(`isLoading: ${isLoading}`);
  console.log(`isSuccess: ${isSuccess}`);
  console.log(`isError: ${isError}`);
  console.log(`error: ${error}`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewTodo('');
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (isSuccess) {
    content = todos.map((todo) => {
      return (
        <article key={todo.id}>
          <div className='todo'>
            <input
              type='checkbox'
              checked={todo.completed}
              id={String(todo.id)}
            />
            <label htmlFor={String(todo.id)}>{todo.title}</label>
          </div>
          <button className='trash'>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  }

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor='new-todo'>Enter a new todo item</label>
      <div className='new-todo'>
        <input
          type='text'
          id='new-todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Enter new todo'
        />
      </div>
      <button className='submit'>
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  return (
    <main>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
