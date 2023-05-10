/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import NewItemSection from '@/components/todos/NewItemSection';
import styles from '@/styles/todos/todos.module.scss';

import { useGetToDosQuery } from '@/common/redux/api/endPoints/todo';
import TodosList from '@/components/todos/TodosList';

// useGetToDosQuery 컴포넌트가 렌더링될 때 자동으로 데이터를 가져오는 쿼리 훅입니다.
// 이 훅은 컴포넌트가 렌더링되는 동안 필요한 데이터를 즉시 가져옵니다.

// useLazyGetToDosQuery 사용자의 상호작용(예: 버튼 클릭)에 의해 데이터를 가져오는 쿼리 훅입니다.
// 이 훅은 처음에는 데이터를 가져오지 않고, 사용자의 요청에 따라 필요할 때만 데이터를 가져옵니다.

// 따라서 useGetToDosQuery는 컴포넌트가 마운트될 때 즉시 데이터를 가져와야 할 때 사용하고,
// useLazyGetToDosQuery는 사용자의 상호작용에 따라 데이터를 가져와야 할 때 사용합니다.

const Todos = () => {
  const { data: todos, isLoading, isSuccess, isError, error } = useGetToDosQuery();

  return (
    <main className={styles.todosMain}>
      <h1>Todo List</h1>
      <NewItemSection />
      <TodosList todos={todos} />
    </main>
  );
};

export default Todos;
