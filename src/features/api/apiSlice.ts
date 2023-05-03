import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface TodosType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    // 여기서 TodosType[] Response 결과값에 대한 타입임.
    // void는 API 요청 콜백함수 요청 인자에 대한 타입임.
    getTodos: builder.query<TodosType[], void>({
      query: () => '/todos',
      transformResponse: (res: Array<TodosType>) =>
        res.sort((a, b) => b.id - a.id),
      providesTags: ['Todos'],
    }),
  }),
});

// export const useGetTodosQuery = () => {
//   return apiSlice.useGetTodosQuery({
//     selectFromResult: ({ data }: { data: TodosType[] }) => {
//       return data.map((d) => d.title);
//     },
//   });
// };

export const { useGetTodosQuery } = apiSlice;
