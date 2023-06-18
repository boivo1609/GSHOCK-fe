import axios from 'axios';
export const BANNER_URL = `${process.env.REACT_APP_API_URL}/banner`;

export function getListBannerPanigation(queryParams) {
  return axios.get(`${BANNER_URL}/search`, queryParams);
}
export function createBanner(values) {
  return axios.post(`${BANNER_URL}`, values);
}
export function deleteBanner(id, imagePublicId) {
  return axios.delete(`${BANNER_URL}/${id}`, { imagePublicId });
}
export function getAllBannerNoPagination() {
  return axios.get(`${BANNER_URL}/all`);
}
