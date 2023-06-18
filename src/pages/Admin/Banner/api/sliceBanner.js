import { createSlice } from '@reduxjs/toolkit';

const initialBannerState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  banner: undefined,
  bannerId: undefined,
  lastError: null
};
export const callTypes = {
  list: 'list',
  action: 'action'
};
export const bannerSlice = createSlice({
  name: 'Banners',
  initialState: initialBannerState,
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
    BannerListPanigation: (state, action) => {
      const { content, size, totalElements, totalPages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = content;
      state.size = size;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    },
    BannerListAll: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = data;
    },
    BannerCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.banner = action.payload;
    },
    BannerDeleted: (state, action) => {
      state.error = null;
      state.bannerId = action.payload.id;
      state.actionsLoading = false;
    }
  }
});
