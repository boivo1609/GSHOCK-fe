import axios from 'axios';
export const PRODUCT_URL = `${process.env.REACT_APP_API_URL}/product`;

export function getListProductPanigation(queryParams) {
  return axios.get(`${PRODUCT_URL}/search`, queryParams);
}
export function getAllProductNoPagination(queryParams) {
  return axios.get(`${PRODUCT_URL}/all`, queryParams);
}
export function getDetailProduct(id) {
  return axios.get(`${PRODUCT_URL}/detail-product/${id}`);
}
export function createProduct(values) {
  return axios.post(`${PRODUCT_URL}`, values);
}
export function updateProduct(id, values) {
  return axios.put(`${PRODUCT_URL}/${id}`, values);
}
export function deleteProduct(id) {
  return axios.delete(`${PRODUCT_URL}/${id}`);
}
export function updateStatusProduct(id) {
  return axios.put(`${PRODUCT_URL}/updateStatus/${id}`);
}
