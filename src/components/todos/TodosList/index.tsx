import React from 'react';
import Todo from './Todo';

interface TodosType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface TodosListType {
  todos?: Array<TodosType>;
}

const TodosList = ({ todos }: TodosListType): JSX.Element => {
  return (
    <div>
      {todos?.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

TodosList.defaultProps = {
  todos: [],
};

export default TodosList;
