import axios from 'axios';
export const USER_URL = `${process.env.REACT_APP_API_URL}/user`;

export function getListUserPanigation(queryParams) {
  return axios.get(`${USER_URL}/search`, queryParams);
}
