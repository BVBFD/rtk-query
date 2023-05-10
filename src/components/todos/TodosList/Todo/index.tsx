import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

interface TodoType {
  key: number;
  todo: {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  };
}

const Todo = ({ key, todo }: TodoType) => {
  return (
    <article className={styles.contentArticle}>
      <div className={styles.todo}>
        <input id={String(key)} type="checkbox" />
        <label htmlFor={String(key)}>{todo.title}</label>
      </div>
      <button className={styles.trash} type="button">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </article>
  );
};

export default Todo;
