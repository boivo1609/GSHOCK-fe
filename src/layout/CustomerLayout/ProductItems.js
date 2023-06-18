import React from 'react';
import { Link } from 'react-router-dom';
// import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import * as productActions from '../../pages/Admin/SanPham/api/actionsProduct';
const ProductItems = () => {
  // const dispatch = useDispatch();
  // const { productState } = useSelector((state) => ({ productState: state.products }), shallowEqual);
  // const { data: listProduct } = productState;
  // console.log(listProduct);
  // useEffect(() => {
  //   dispatch(productActions.getAllProduct());
  // }, []);
  return (
    <div className="p-0">
      <div className="ml-auto mr-0 relative w-full bg-cover bg-no-repeat bg-[left_calc(50%)_top_calc(50%)]">
        <div className="z-20 left-0 top-0 absolute mt-0 mb-0 mr-0 -ml-[15px] text-sm">
          <div className="ml-4 table pointer-events-none w-11 h-11 ">
            <div className="bg-[#130f0f] rounded-full table-cell w-full h-full align-middle text-center font-bold text-white leading-3 p-0.5 ">
              <span>Sale</span>
            </div>
          </div>
          <div className="ml-4 -mt-2 opacity-90	w-10 h-10 table pointer-events-none ">
            <div className="bg-[#ed1c24] rounded-full text-sm table-cell w-full h-full align-middle text-center font-bold text-white leading-3 p-0.5">
              New
            </div>
          </div>
        </div>
        <div className="relative w-full mx-auto my-0 ">
          <div className="relative h-auto mx-auto my-0 overflow-hidden product-image">
            <Link to="/detail-product">
              <img
                src="https://www.thegioidongho.com.vn/wp-content/uploads/2023/06/GMA-S110SG-7A.jpg"
                alt=""
                width="500"
                height="600"
                className="w-full max-w-full mx-auto my-0 opacity-100 inline-block h-auto align-middle  "
              />
            </Link>
          </div>
          <div className="z-[1] px-4 pt-4 pb-5 text-center text-xs w-full relative">
            <div className="mx-auto leading-5 title-product font-bold">
              <p>G-SHOCK GA-700FF-8A</p>
            </div>
            <div className="mx-auto">
              <span className="leading-4 block">
                <del aria-hidden="true">
                  <span className="opacity-60 font-normal mr-1 text-[#ED1C24]">3.973.000đ</span>
                </del>
                <span className="font-bold text-[#ED1C24] p-2">2.860.000đ</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItems;
