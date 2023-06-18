import React from 'react';
import ProductItems from '../CustomerLayout/ProductItems';

const FavoriteProduct = () => {
  return (
    <div>
      <h3 className="max-w-[1430px] py-4 uppercase text-[#555] text-base mt-0 font-bold">SẢN PHẨM CÓ THỂ BẠN YÊU THÍCH </h3>
      <div className="-mx-[10px] mb-0 px-0 w-auto max-w-[1422.5px] overflow-hidden relative">
        <div className="h-[260px] w-full relative -translate-x-full left-0">
          <div className="absolute left-full pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
          <div className="absolute left-[112.5%] pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
          <div className="absolute left-[125%] pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
          <div className="absolute left-[137.5%] pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
          <div className="absolute left-[150%] pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
          <div className="absolute left-[162.5%] pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
          <div className="absolute left-[175%] pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
          <div className="absolute left-[187.5%] pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
          <div className="absolute left-[112.5%] pt-0 px-[9,8px] pb-[19,6px] max-w-[12,5%] m-0">
            <ProductItems></ProductItems>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteProduct;
