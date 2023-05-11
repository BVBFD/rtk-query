import { apiSlice } from '../apiSlice';

interface TodosType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const injectedRtkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getToDos: builder.query<TodosType[], void>({
      query: () => ({ url: '/todos' }),
      transformResponse: (res: Array<TodosType>) => {
        return res.sort((a, b) => b.id - a.id);
      },
      providesTags: ['Todos'],
    }),

    addTodo: builder.mutation<TodosType, TodosType>({
      query: (todo) => ({ url: '/todos', method: 'POST', body: todo }),
      invalidatesTags: ['Todos'],
    }),

    updateTodo: builder.mutation<TodosType, TodosType>({
      query: (todo) => ({ url: `/todos/${todo.id}`, method: 'PUT', body: todo }),
      invalidatesTags: ['Todos'],
    }),

    deleteTodo: builder.mutation<TodosType, { id: number }>({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['Todos'],
    }),
  }),
});

export const {
  useGetToDosQuery,
  useLazyGetToDosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = injectedRtkApi;
