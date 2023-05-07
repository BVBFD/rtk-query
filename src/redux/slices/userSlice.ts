import { createSlice } from '@reduxjs/toolkit';

interface UserStateType {
  id: string;
  editable: boolean;
  profilePic: string;
  email: string;
}

const initialState: UserStateType = {
  id: '',
  editable: false,
  profilePic: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReduce: (state, action) => {
      state.id = action.payload.userId;
      state.editable = action.payload.editable;
      state.email = action.payload.email;
      state.profilePic = action.payload.profilePic;
    },
    logoutReduce: (state) => {
      state.id = '';
      state.editable = false;
      state.profilePic = '';
      state.email = '';
    },
  },
});

export type { UserStateType };
export const { loginReduce, logoutReduce } = userSlice.actions;
export default userSlice.reducer;

// 왜 reduce 혹은 reducer라는 표현을 사용할까?

// "Reducer" 함수는 객체 상태 전체가 바뀌는 것을 방지하기 위해서 이전 상태를 변경하지 않고,
// 변경이 필요한 부분만 새로운 객체에 반영하여 새로운 상태를 만드는 원리로 작동합니다.

// 예를 들어, 객체 상태가 { count: 0, value: "hello" } 라고 가정하고,
// "INCREMENT" 액션이 발생하여 "count" 값을 1 증가시켜야 한다면,
// "Reducer" 함수는 이전 상태를 변경하지 않고,
// { count: 1, value: "hello" } 와 같이 "count" 값만 변경한 새로운 객체를 반환합니다.

// 이렇게 하면 이전 상태와 새로운 상태가 다른 참조값을 가지게 되지만,
// 객체 상태 전체가 다시 생성되는 것보다는 메모리 사용을 최소화할 수 있습니다.

// 따라서 "Reducer" 함수는 불변성을 유지하면서 상태를 업데이트하는 것이 중요하며,
// 객체나 배열 같은 자료구조를 다룰 때 특히 유용합니다.
