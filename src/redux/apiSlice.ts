import {
  BaseQueryFn,
  createApi,
  // fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { BaseQueryApi } from '@reduxjs/toolkit/query/react';

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
    try {
      const store = getState() as any;
      // any is RootState in Redux Tookit Store Type
      const result = await axios({
        url: baseUrl + url,
        method: method ?? 'GET',
        data: body,
        params,
        headers: {
          Authorization: `Bearer ${store?.auth?.accessToken}`,
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status ?? null,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8080' }),
  tagTypes: ['Todos'],
  endpoints: () => ({}),
});

// 하나의 서비스에서 사용할 모든 endPoint들의 tag 들을 tagTypes 배열에 전부다 등록을 하고,
// 하나의 endpoints에서 get으로 데이터를 가지고 올때 providesTags를 통해서 태그를 전달하고,
// 그 endpoint에서 추가 제거 삭제 등을 할때마다 invalidatesTags에 providesTags안에 있는 태그를 삽입하면 자동 캐싱이 되는 원리인거 맞아?

// 맞습니다. tagTypes는 API에서 사용하는 모든 태그를 포함하는 배열이며,
// providesTags는 해당 엔드포인트에서 반환하는 데이터가 속한 태그를 지정합니다.
// 이렇게 지정된 태그를 기반으로 RTK Query는 자동으로 캐시를 관리합니다.

// invalidatesTags는 특정 태그를 가진 데이터가 변경되었을 때,
// 해당 태그를 가진 캐시를 무효화합니다.
// 예를 들어, 특정 엔드포인트에서 데이터가 업데이트 되었을 경우,
// invalidatesTags에 해당하는 태그를 가진 캐시를 모두 무효화하게 됩니다.

// 이렇게 RTK Query는 providesTags와 invalidatesTags를 기반으로 캐시를 효율적으로 관리하고,
// API 콜을 최소화하면서도 항상 최신의 데이터를 보장합니다.
