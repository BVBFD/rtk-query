import { createSlice } from '@reduxjs/toolkit';

interface UserStateType {
  id: '';
  pwd: '';
}

const initialState: UserStateType = {
  id: '',
  pwd: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginReducer: (state, action) => {
      state.id = action.payload.id;
      state.pwd = action.payload.pwd;
    },
    logoutReducer: (state) => {
      state.id = '';
      state.pwd = '';
    },
  },
});

export type { UserStateType };
export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
