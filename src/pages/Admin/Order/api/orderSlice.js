import { createSlice } from '@reduxjs/toolkit';

const initialOrderState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  orderForEdit: undefined,
  order: undefined,
  orderId: undefined,
  orderSuccess: null,
  lastError: null,
  duyetDonHangId: undefined,
  orderHistory: undefined,
  deleteOrderId: undefined
};
export const callTypes = {
  list: 'list',
  action: 'action'
};
export const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
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
    OrderListPanigation: (state, action) => {
      const { content, size, totalElements, totalPages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = content;
      state.size = size;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    },
    orderSuccess: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.orderSuccess = action.payload;
    },
    clearStatusSuccess: (state) => {
      state.actionsLoading = false;
      state.error = null;
      state.orderSuccess = null;
    },
    duyetDonHang: (state, action) => {
      state.error = null;
      state.duyetDonHangId = action.payload.id;
      state.actionsLoading = false;
    },
    OrderHistory: (state, action) => {
      const { content, size, totalElements, totalPages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.orderHistory = content;
      state.size = size;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    },
    deleteOrderHistory: (state, action) => {
      state.error = null;
      state.deleteOrderId = action.payload.id;
      state.actionsLoading = false;
    }
  }
});
