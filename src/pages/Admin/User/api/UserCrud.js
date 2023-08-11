import axios from 'axios';
export const USER_URL = `${process.env.REACT_APP_API_URL}/users1`;

export function getListUserPanigation(queryParams) {
  return axios.get(`${USER_URL}/search`, queryParams);
}
export function updateUser(id, values) {
  return axios.put(`${USER_URL}/${id}`, values);
}
export function getUserById(id) {
  return axios.get(`${USER_URL}/find-user-by-id`, id);
}
