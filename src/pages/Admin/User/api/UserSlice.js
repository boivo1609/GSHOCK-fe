import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  userForEdit: undefined,
  user: undefined,
  userId: undefined,
  lastError: null
};
export const callTypes = {
  list: 'list',
  action: 'action'
};
export const UserSlice = createSlice({
  name: 'Users',
  initialState: initialUserState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
        state.data = null;
      } else {
        state.actionsLoading = true;
      }
    },
    UserListPanigation: (state, action) => {
      const { content, size, totalElements, totalPages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = content;
      state.size = size;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    },
    UserUpdate: (state, action) => {
      state.error = null;
      state.userForEdit = action.payload;
      state.actionsLoading = false;
    },
    UserById: (state, action) => {
      state.error = null;
      state.user = action.payload;
      state.actionsLoading = false;
    }
  }
});
