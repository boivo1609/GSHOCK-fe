import axios from 'axios';
export const COLOR_URL = `${process.env.REACT_APP_API_URL}/color`;

export function getListColorPanigation(queryParams) {
  return axios.get(`${COLOR_URL}/search`, queryParams);
}
export function getAllColorNoPagination() {
  return axios.get(`${COLOR_URL}/all`);
}
export function createColor(values) {
  return axios.post(`${COLOR_URL}`, values);
}
export function updateColor(id, values) {
  return axios.put(`${COLOR_URL}/${id}`, values);
}
export function deleteColor(id) {
  return axios.delete(`${COLOR_URL}/${id}`);
}
