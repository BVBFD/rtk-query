/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.scss';

const NewItemSection = () => {
  return (
    <form className={styles.form}>
      <label htmlFor={String('new-todo')}>Enter a new todo item</label>
      <div className={styles.newTodo}>
        <input id={String('new-todo')} placeholder="Enter New Todo" type="text" />
      </div>
      <button className={styles.submitBtn} type="button">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
};

export default NewItemSection;
