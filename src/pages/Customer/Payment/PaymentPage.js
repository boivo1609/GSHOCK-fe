import CustomerPage from 'layout/CustomerLayout/CustomerPage';
import React, { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { convertToVND } from '../../../utils/convertPrice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as cartActions from '../Cart/_redux/cartAction';
import * as orderActions from '../../Admin/Order/api/orderActions';
import { yupResolver } from '@hookform/resolvers/yup';
import { Typography, Stack, FormControl } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';
import RHFTextField from '../../../components/form/RHFTextField';
import FormProvider from 'components/form/FormProvider';
import RHFRadioGroup from 'components/form/RHFRadioGroup';

const CASH_OPTION = [
  { label: 'Thanh toán bằng tiền mặt khi nhận hàng', value: 'cash' },
  { label: 'Thanh toán bằng ZaloPay', value: 'zalopay' }
];
function generateRandomOrderId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let orderId = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderId += characters.charAt(randomIndex);
  }
  return orderId;
}
const PaymentPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { cartState, authState, orderState } = useSelector(
    (state) => ({ cartState: state.carts, authState: state.auth, orderState: state.orders }),
    shallowEqual
  );
  const { orderSuccess } = orderState;

  const { cart: listCart, cartTotalAmount, cartTotalQuantity } = cartState;
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const orderSchema = Yup.object().shape({
    firstName: Yup.string().required('Họ là trường bắt buộc'),
    lastName: Yup.string().required('Tên là trường bắt buộc'),
    address: Yup.string().required('Địa chỉ là trường bắt buộc'),
    phone: Yup.string().matches(phoneRegExp, 'Số điện thoại phải đúng định dạng'),
    email: Yup.string().email('Email phải đúng định dạng').max(255).required('Email là trường bắt buộc')
  });

  useEffect(() => {
    dispatch(cartActions.getTotal());
  }, [dispatch, listCart]);
  const defaultValues = {
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: authState?.authToken?.user?.email || '',
    orderStatus: 'cash'
  };
  const methods = useForm({
    resolver: yupResolver(orderSchema),
    defaultValues
  });

  const {
    handleSubmit,

    formState: { isSubmitting }
  } = methods;
  const onSubmit = (values) => {
    try {
      console.log(values);
      const randomOrderId = generateRandomOrderId(8);
      const transformData = {
        ...values,
        order_id: randomOrderId,
        cart: listCart,
        total_product: cartTotalQuantity,
        total_price: cartTotalAmount,
        user: authState?.authToken?.user?.id
      };
      dispatch(orderActions.createOrder(transformData));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (orderSuccess) {
      dispatch(cartActions.clearCart());

      navigate('/order-success');
      dispatch(orderActions.clearStatusSuccess());
    }
  }, [orderSuccess]);

  return (
    <CustomerPage>
      <FormProvider onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <div className="relative bg-[#fff]">
          <div className="relative">
            <div className="max-w-[1430px] pt-5 min-h-[60px] flex items-center justify-between w-full border-t-[1px] border-top-style px-4 mx-auto">
              <div className="flex-1 max-h-full">
                <nav className="normal-case text-[#555] py-4 px-0 font-bold text-center text-2xl flex items-center justify-center">
                  <NavLink className="text-[#ccc] ml-0 font-normal hover:text-[#111] " to="/cart">
                    Giỏ hàng
                  </NavLink>
                  <span className="top-[2px] my-0 mx-2 opacity-[0.35] font-light">
                    <HiChevronRight></HiChevronRight>
                  </span>
                  <NavLink className="text-[#111] ml-0 font-normal" to="/payment">
                    Thanh toán
                  </NavLink>
                  <span className="top-[2px] my-0 mx-2 opacity-[0.35] font-light ">
                    <HiChevronRight></HiChevronRight>
                  </span>
                  <NavLink className="text-[#ccc] ml-0 font-normal pointer-events-none " to="/cart">
                    Hoàn thành
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
          {listCart?.length > 0 ? (
            <div className="max-w-[1430px] py-[30px] px-4 w-full mx-auto">
              <div>
                <div className="mb-5">
                  <div className="-mx-4 w-auto max-w-[1430px] flex px-0 ">
                    <div className="max-w-[58.3333333333%] basis-[58.3333333333%] col">
                      <div className="pt-4 border-t-[1px] border-top-style border-[#ddd]">
                        <h3 className="text-base font-bold text-[#555] uppercase pt-[10px] mb-3">Thông tin thanh toán</h3>
                        <Stack direction="row" spacing={3} mb={4}>
                          <FormControl fullWidth>
                            <Typography mb={1} fontWeight="bold">
                              Tên
                            </Typography>
                            <RHFTextField name="lastName" />
                          </FormControl>
                          <FormControl fullWidth>
                            <Typography mb={1} fontWeight="bold">
                              Họ
                            </Typography>
                            <RHFTextField name="firstName" />
                          </FormControl>
                        </Stack>
                        <Stack direction="column" mb={4}>
                          <Typography mb={1} fontWeight="bold">
                            Địa chỉ{' '}
                          </Typography>
                          <RHFTextField name="address" />
                        </Stack>

                        <Stack direction="column" mb={4}>
                          <Typography mb={1} fontWeight="bold">
                            Số điện thoại
                          </Typography>
                          <RHFTextField name="phone" />
                        </Stack>
                        <Stack direction="column" mb={4}>
                          <Typography mb={1} fontWeight="bold">
                            Email
                          </Typography>
                          <RHFTextField name="email" />
                        </Stack>
                        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                          ĐẶT HÀNG
                        </LoadingButton>
                      </div>
                    </div>
                    <div className="col  max-w-[41.6666666667%] basis-[41.6666666667%]">
                      <div className="border-[#ed1c24] border-2 border-style px-[30px] pt-[15px] pb-[30px]">
                        <div>
                          <h3 className="text-base font-bold text-[#555] uppercase pt-[10px] mb-3">Đơn hàng của bạn</h3>
                          <div>
                            <table className="w-full mb-4 ">
                              <thead>
                                <tr>
                                  <th className="border-b-[1px] p-2 pl-0 text-left border-bot-style uppercase text-sm">Sản phẩm</th>
                                  <th className="border-b-[1px] border-bot-style p-2 pr-0 uppercase text-right text-sm">Tạm tính</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listCart?.map((item) => (
                                  <tr key={item._id}>
                                    <td className="p-2 py-4 pl-0 text-[#666] border-b-[1px] border-bot-style text-left text-xs">
                                      {item.name}
                                      <strong className="text-[#666] text-left text-xs"> × {item?.cartQuantity}</strong>
                                    </td>
                                    <td className="border-b-[1px] border-bot-style py-4 text-xs text-[#666] text-right pr-0">
                                      <span className="font-bold text-[#ED1C24] text-right">
                                        {item?.price_discount ? convertToVND(item?.price_discount) : 0}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <th className="text-sm font-bold pl-0 p-2 text-left border-b-[1px] border-bot-style">Tạm tính</th>
                                  <td className="text-right pr-0 text-xs border-b-[1px] border-bot-style">
                                    <span className="font-bold text-[#ED1C24] text-right">
                                      {cartTotalAmount ? convertToVND(cartTotalAmount) : 0}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-sm font-bold pl-0 pr-2 py-5 text-left border-bot-style border-b-[1px]">
                                    Tổng số lượng
                                  </th>
                                  <td className="text-right pr-0 text-sm border-b-[1px] border-bot-style">
                                    <span className="text-xs text-[#666]">{cartTotalQuantity}</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-sm font-bold pl-0 pr-2 py-5 text-left border-bot-style border-b-[1px]">Giao hàng</th>
                                  <td className="text-right pr-0 text-sm border-b-[1px] border-bot-style">
                                    <span className="text-xs text-[#666]">Miễn phí</span>
                                  </td>
                                </tr>
                                <tr>
                                  <th className="text-sm font-bold pl-0 p-2 text-left border-bot-style border-b-[1px]">Tổng</th>
                                  <td className="text-right pr-0 text-xs border-b-[1px] border-bot-style total-price">
                                    <span className="font-bold text-[#ED1C24] text-right">
                                      {cartTotalAmount ? convertToVND(cartTotalAmount) : 0}
                                    </span>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                            <div>
                              <ul className="mb-5 mt-0 p-0 border-b-[1px] border-bot-style">
                                {/* <RadioGroup name="use-radio-group" defaultValue="first">
                              <MyFormControlLabel value="first" label="Thanh toán tiền mặt khi nhận hàng" control={<Radio />} />
                              <MyFormControlLabel value="second" label="Thanh toán bằng ZaloPay" control={<Radio />} />
                            </RadioGroup> */}
                                <RHFRadioGroup spacing={1} name="orderStatus" options={CASH_OPTION} />
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <img src="/2038854.png" alt="" className="w-[16rem] h-[16rem] mb-6" />
              <Typography sx={{ p: 2, fontWeight: 'bold', textTransform: 'uppercase', fontSize: '20px' }}>
                Chưa có sản phẩm trong giỏ hàng,Không thể thanh toán
              </Typography>
              <NavLink
                to="/products"
                className="text-[#ed1c24] mt-10  border-2 text-xs border-solid  border-current bg-transparent leading-[2.19em] button border-cart uppercase"
              >
                ← Quay trở lại cửa hàng{' '}
              </NavLink>
            </div>
          )}
        </div>
      </FormProvider>
    </CustomerPage>
  );
};

export default PaymentPage;
