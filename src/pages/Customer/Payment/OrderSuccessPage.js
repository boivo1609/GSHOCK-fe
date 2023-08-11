import CustomerPage from 'layout/CustomerLayout/CustomerPage';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Typography } from '@mui/material';
import { HiChevronRight } from 'react-icons/hi';
const OrderSuccessPage = () => {
  return (
    <CustomerPage>
      <div className="relative bg-[#fff]">
        <div className="relative">
          <div className="max-w-[1430px] pt-5 min-h-[60px] flex items-center justify-between w-full border-t-[1px] border-top-style px-4 mx-auto">
            <div className="max-w-[1430px] pt-5 min-h-[60px] flex items-center justify-between w-full border-t-[1px] border-top-style px-4 mx-auto">
              <div className="flex-1 max-h-full">
                <nav className="normal-case text-[#555] py-4 px-0 font-bold text-center text-2xl flex items-center justify-center">
                  <NavLink className="text-[#ccc] ml-0 font-normal hover:text-[#111] " to="/cart">
                    Giỏ hàng
                  </NavLink>
                  <span className="top-[2px] my-0 mx-2 opacity-[0.35] font-light">
                    <HiChevronRight></HiChevronRight>
                  </span>
                  <NavLink className="text-[#ccc] ml-0 font-normal hover:text-[#111] " to="/payment">
                    Thanh toán
                  </NavLink>
                  <span className="top-[2px] my-0 mx-2 opacity-[0.35] font-light ">
                    <HiChevronRight></HiChevronRight>
                  </span>
                  <NavLink className="text-[#111] ml-0 font-normal " to="/order-success">
                    Hoàn thành
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-[1430px] py-[30px] px-4 w-full mx-auto">
          <div className="flex flex-col items-center">
            <Typography sx={{ p: 2, fontWeight: 'bold', textTransform: 'uppercase', fontSize: '20px', color: '#00DD00' }}>
              Đặt hàng thành công
            </Typography>
            <img src="/success-1.png" alt="" className="w-[24rem] h-[17rem] mb-6" />
            <NavLink
              to="/products"
              className="text-[#ed1c24] mt-10  border-2 text-xs border-solid  border-current bg-transparent leading-[2.19em] button border-cart uppercase"
            >
              ← Quay trở lại cửa hàng{' '}
            </NavLink>
          </div>
        </div>
      </div>
    </CustomerPage>
  );
};

export default OrderSuccessPage;
