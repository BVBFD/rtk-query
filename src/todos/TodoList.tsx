import React, { useEffect, useState } from 'react';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from '../redux/endpoints/todo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { loginReduce, logoutReduce } from '../redux/slices/userSlice';
import { Link } from 'react-router-dom';

interface ErrorType {
  status: number;
  error?: string;
  data: string;
}

const TodoList = () => {
  const user = useSelector((state: RootState) => state.user);
  // 전역 state 값이 저장된 값 불러올 때!!
  const dispatch = useDispatch();
  // 항상 dispatch(action(payload)) 기억할 것!!
  console.log(user);

  const [newTodo, setNewTodo] = useState<string>('');
  const {
    data: todos,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({
      userId: 1,
      title: newTodo,
      completed: false,
      id: 0,
    });
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
              onChange={() =>
                updateTodo({ ...todo, completed: !todo.completed })
              }
            />
            <label htmlFor={String(todo.id)}>{todo.title}</label>
          </div>
          <button className='trash' onClick={() => deleteTodo({ id: todo.id })}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </article>
      );
    });
  }

  if (isError) {
    content = <p>{(error as ErrorType).data}</p>;
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

  useEffect(() => {
    dispatch(
      loginReduce({
        userId: '1',
        profilePic: 'User Picture',
        editable: false,
        email: 'User Email',
      })
    );

    // return () => {
    //   dispatch(logoutReduce());
    // };
  }, []);

  return (
    <main>
      <Link to={'/'}>Home</Link>
      <h1>Todo List</h1>
      {newItemSection}
      {content}
    </main>
  );
};

export default TodoList;
