/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit';

const initialDanhmucState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  danhmucForEdit: undefined,
  danhmuc: undefined,
  danhmucId: undefined,
  lastError: null
};
export const callTypes = {
  list: 'list',
  action: 'action'
};
export const danhmucSlice = createSlice({
  name: 'Danhmucs',
  initialState: initialDanhmucState,
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
    DanhmucListPanigation: (state, action) => {
      const { content, size, totalElements, totalPages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = content;
      state.size = size;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    },
    DanhmucListAll: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    DanhmucCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.danhmuc = action.payload;
    },
    DanhmucDeleted: (state, action) => {
      state.error = null;
      state.danhmucId = action.payload.id;
      state.actionsLoading = false;
    },
    DanhmucUpdate: (state, action) => {
      state.error = null;
      state.danhmucForEdit = action.payload;
      state.actionsLoading = false;
    }
  }
});
