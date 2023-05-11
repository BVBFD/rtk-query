/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useAddTodoMutation } from '@/common/redux/api/endPoints/todo';
import styles from './index.module.scss';

const NewItemSection = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [addTodo] = useAddTodoMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({
      userId: 1,
      id: 0,
      title: newTodo,
      completed: false,
    });
    setNewTodo('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor={String('new-todo')}>Enter a new todo item</label>
      <div className={styles.newTodo}>
        <input
          id={String('new-todo')}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter New Todo"
          type="text"
          value={newTodo}
        />
      </div>
      <button className={styles.submitBtn} type="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
};

export default NewItemSection;
