import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface TodosType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => '/todos',
      transformResponse: (res: Array<TodosType>) =>
        res.sort((a, b) => b.id - a.id),
      providesTags: ['Todos'],
    }),
  }),
});

export const { useGetTodosQuery } = apiSlice;
