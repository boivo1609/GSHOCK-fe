import axios from 'axios';

export const LOGIN_URL = `${process.env.REACT_APP_API_URL}/auth/login`;
export const REGISTER_URL = `${process.env.REACT_APP_API_URL}/auth/register`;
export const ME_URL = `${process.env.REACT_APP_API_URL}/auth/get-user-by-id`;
export function login(values) {
  return axios.post(LOGIN_URL, values);
}

export function register(values) {
  return axios.post(REGISTER_URL, values);
}

export function getUserByToken(id) {
  return axios.post(`${ME_URL}`, { id });
}
