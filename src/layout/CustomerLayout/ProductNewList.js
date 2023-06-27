import React, { useEffect } from 'react';
import { BsStar } from 'react-icons/bs';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../pages/Admin/SanPham/api/actionsProduct';
import { SwiperSlide, Swiper } from 'swiper/react';
import { convertToVND } from 'utils/convertPrice';
import 'swiper/css';
import { Link } from 'react-router-dom';
//left-0  w-full h-full grid grid-cols-4
const ProductNewList = () => {
  const dispatch = useDispatch();
  const { productState } = useSelector((state) => ({ productState: state.products }), shallowEqual);
  const { productCustomer: listProduct } = productState;
  useEffect(() => {
    dispatch(
      productActions.getAllProduct({
        params: {
          tenDanhMuc: '',
          name: ''
        }
      })
    );
  }, []);
  return (
    <div>
      <div className="mt-8 max-w-screen-2xl mb-6 px-4 w-full">
        <h3 className="relative flex items-center justify-between w-full text-xl mb-2 ">
          <b className="block flex-1 h-0.5 opacity-10 bg-current"></b>
          <span className="text-center my-0 mx-4 text-2xl uppercase text-zinc-600 font-bold flex">
            <BsStar className="opacity-60 mr-3"></BsStar>
            Sản phẩm mới
          </span>
          <b className="block flex-1 h-0.5 opacity-10 bg-current"></b>
        </h3>
      </div>
      <div className="relative p-0 max-w-full ">
        <div className="h-[532px] w-full relative p-1">
          <div className="product-slide w-full h-full left-0">
            <Swiper grabCursor={'true'} spaceBetween={0} slidesPerView={'auto'}>
              {listProduct?.product?.slice(0, 12)?.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="p-0">
                    <div className="ml-auto mr-0 relative w-full bg-cover bg-no-repeat bg-[left_calc(50%)_top_calc(50%)]">
                      <div className="z-20 left-0 top-2 absolute mt-0 mb-0 mr-0 -ml-[15px] text-sm">
                        {item.discount > 0 && (
                          <div className="ml-4 table pointer-events-none w-11 h-11 ">
                            <div className="bg-[#130f0f] rounded-full table-cell w-full h-full align-middle text-center font-bold text-white leading-3 p-0.5 ">
                              <span> {item.discount} %</span>
                            </div>
                          </div>
                        )}
                        <div className="ml-4 -mt-2 opacity-90	w-10 h-10 table pointer-events-none ">
                          <div className="bg-[#ed1c24] rounded-full text-sm table-cell w-full h-full align-middle text-center font-bold text-white leading-3 p-0.5">
                            New
                          </div>
                        </div>
                      </div>
                      <div className="relative w-full mx-auto my-0 ">
                        <div className="relative h-auto mx-auto my-0 overflow-hidden product-image">
                          <Link to={`/products/${item._id}`}>
                            <img
                              src={item.image}
                              alt=""
                              width="500"
                              height="600"
                              className="w-full max-w-full mx-auto my-0 opacity-100 inline-block h-full align-middle background-image: none;  "
                            />
                          </Link>
                        </div>
                        <div className="z-[1] px-4 pt-4 pb-5 text-center text-xs w-full relative">
                          <div className="mx-auto leading-5 title-product font-bold">
                            <p>{item.name}</p>
                          </div>
                          <div className="mx-auto">
                            <span className="leading-4 block">
                              {item?.discount > 0 && (
                                <del aria-hidden="true">
                                  <span className="opacity-60 font-normal mr-1 text-[#ED1C24]">{convertToVND(item.price)} </span>
                                </del>
                              )}

                              <span className="font-bold text-[#ED1C24] p-2">{convertToVND(item.price_discount)}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductNewList;
