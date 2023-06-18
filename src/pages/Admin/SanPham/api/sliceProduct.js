import { createSlice } from '@reduxjs/toolkit';

const initialColorState = {
  listLoading: false,
  actionsLoading: false,
  data: null,
  size: null,
  totalElements: null,
  totalPages: null,
  productForEdit: undefined,
  product: undefined,
  productCustomer: undefined,
  productDetail: undefined,
  productId: undefined,
  productIdUpdated: undefined,
  lastError: null
};
export const callTypes = {
  list: 'list',
  action: 'action'
};
export const productSlice = createSlice({
  name: 'Products',
  initialState: initialColorState,
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
    ProductListPanigation: (state, action) => {
      const { content, size, totalElements, totalPages } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.data = content;
      state.size = size;
      state.totalElements = totalElements;
      state.totalPages = totalPages;
    },
    ProductListAll: (state, action) => {
      const { data } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.productCustomer = data;
    },
    productDetail: (state, action) => {
      state.listLoading = false;
      state.error = null;
      state.productDetail = action.payload.product;
    },
    ProductCreate: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.product = action.payload;
    },
    ProductDeleted: (state, action) => {
      state.error = null;
      state.productId = action.payload.id;
      state.actionsLoading = false;
    },
    ProductUpdateStatus: (state, action) => {
      state.error = null;
      state.productIdUpdated = action.payload.id;
      state.actionsLoading = false;
    },
    ProductUpdate: (state, action) => {
      state.error = null;
      state.productForEdit = action.payload;
      state.actionsLoading = false;
    }
  }
});
