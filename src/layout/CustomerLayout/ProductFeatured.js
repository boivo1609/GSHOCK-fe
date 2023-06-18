import React from 'react';
import { Link } from 'react-router-dom';

const ProductFeatured = () => {
  return (
    <div>
      <li className="featured-products text-left m-0">
        <Link to="/detail-product" className="block mb-3 p-0 overflow-hidden text-ellipsis leading-5 product-image">
          <img
            src="https://www.thegioidongho.com.vn/wp-content/uploads/2023/06/GMA-S110SG-7A.jpg"
            alt=""
            className=" top-[10px] absolute left-0 w-[70px] h-[70px] mb-1 object-cover object-[50%_50%]"
          />
          <span>G-SHOCK GA-700FF-8A</span>
        </Link>
        <del aria-hidden="true">
          <span className="opacity-60 font-normal mr-1 text-[#ED1C24]">3.973.000đ</span>
        </del>
        <span className="font-bold text-[#ED1C24] p-2">2.860.000đ</span>
      </li>
      <hr className="mx-0 my-4 border-0 opacity-10 border-t-[1px] border-t-current" />
    </div>
  );
};

export default ProductFeatured;
