export const convertToVND = (number) => {
  return number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
};
