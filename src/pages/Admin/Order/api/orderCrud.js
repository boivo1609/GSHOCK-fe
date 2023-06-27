import axios from 'axios';
export const ORDER_URL = `${process.env.REACT_APP_API_URL}/order`;

export function createOrder(values) {
  return axios.post(`${ORDER_URL}`, values);
}
export function getListOrderPanigation(queryParams) {
  return axios.get(`${ORDER_URL}/search`, queryParams);
}
export function duyetDonHang(id) {
  return axios.put(`${ORDER_URL}/duyetDonHang/${id}`);
}
