/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-cycle */
import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import type { BaseQueryApi } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface TodosType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig['method'];
      body?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    BaseQueryApi | Array<TodosType>,
    unknown
  > =>
  async ({ url, method, body, params }, { getState }) => {
    const store = getState() as RootState;
    try {
      const result = await axios({
        url: baseUrl + url,
        method: method ?? 'GET',
        data: body,
        params,
        headers: {
          Authorization: `Bearer ${store.user.pwd}`,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Todos'],
  endpoints: (build) => ({}),
});

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries 참고
// https://github.com/BVBFD/rtk-query/blob/main/src/redux/apiSlice.ts 참고
