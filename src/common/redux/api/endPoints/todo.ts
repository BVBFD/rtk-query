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
  }),
});

export const { useGetToDosQuery, useLazyGetToDosQuery } = injectedRtkApi;
