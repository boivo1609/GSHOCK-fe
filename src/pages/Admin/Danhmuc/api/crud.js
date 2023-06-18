/* eslint-disable prettier/prettier */
import axios from 'axios';
export const DANHMUC_URL = `${process.env.REACT_APP_API_URL}/danhmuc`;

export function getListDanhMucPanigation(queryParams) {
  return axios.get(`${DANHMUC_URL}/search`, queryParams);
}
export function getAllDanhMucNoPagination() {
  return axios.get(`${DANHMUC_URL}/all`);
}
export function createDanhmuc(values) {
  return axios.post(`${DANHMUC_URL}`, values);
}
export function updateDanhmuc(id, values) {
  return axios.put(`${DANHMUC_URL}/${id}`, values);
}
export function deleteDanhmuc(id) {
  return axios.delete(`${DANHMUC_URL}/${id}`);
}
