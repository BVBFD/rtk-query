import {
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../apiSlice';

interface TodosType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface ErrorType {
  status: number;
  error?: string;
  data: string | React.ReactNode;
}

const transformErrorResponseCallback = (
  baseQueryReturnValue: FetchBaseQueryError,
  meta: FetchBaseQueryMeta
  // arg: any
) => {
  if (meta?.response) {
    baseQueryReturnValue.status = meta?.response.status;
    baseQueryReturnValue.data = meta?.response.statusText;
  } else {
    baseQueryReturnValue.status = 500;
    baseQueryReturnValue.data = 'Not Connected!!';
  }
  return baseQueryReturnValue as ErrorType;
};

const injectedRtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 여기서 TodosType[] Response 결과값에 대한 타입임.
    // void는 API 요청 콜백함수 요청 인자(Parameter)에 대한 타입임.
    getTodos: builder.query<TodosType[], void>({
      query: () => ({ url: '/todos' }),
      transformResponse: (res: Array<TodosType>) => {
        return res.sort((a, b) => b.id - a.id);
      },
      providesTags: ['Todos'],
      transformErrorResponse: transformErrorResponseCallback,
    }),

    addTodo: builder.mutation<TodosType, TodosType>({
      query: (todo) => ({
        url: '/todos',
        method: 'POST',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
      transformErrorResponse: transformErrorResponseCallback,
    }),

    updateTodo: builder.mutation<TodosType, TodosType>({
      query: (todo: TodosType) => ({
        url: `/todos/${todo.id}`,
        method: 'PATCH',
        body: todo,
      }),
      invalidatesTags: ['Todos'],
      transformErrorResponse: transformErrorResponseCallback,
    }),

    deleteTodo: builder.mutation<TodosType, { id: number }>({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Todos'],
      transformErrorResponse: transformErrorResponseCallback,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = injectedRtkApi;
