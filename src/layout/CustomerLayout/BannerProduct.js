import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';
import * as bannerActions from '../../pages/Admin/Banner/api/actionsBanner';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// import required modules
const BannerProduct = () => {
  const dispatch = useDispatch();
  const { bannerState } = useSelector((state) => ({ bannerState: state.banners }), shallowEqual);
  const { data: listBanner } = bannerState;

  useEffect(() => {
    dispatch(bannerActions.getAllBanner());
  }, []);
  return (
    <div className="w-full relative mb-10 h-[715px] ">
      <div className="w-[10%] h-auto overflow-hidden mx-auto my-0">
        <Link to="/products">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJILHM8BMthZ_iy41gHc0Kqqtg5Uzy3MZSe59rmKm7QVXUzmDsvDggvfuxBOCc3El_Dw&usqp=CAU"
            alt=""
            width="503"
            height="100"
            className="align-middle h-auto inline-block w-full max-w-full mx-auto my-0 opacity-100"
          />
        </Link>
      </div>
      <div className="px-[10px] text-center w-full pt-2 pb-6 relative text-sm">
        <div className="mx-auto text-center ">
          <div className="max-w-[100px] bg-[#000000] h-1 block w-full my-4 mx-auto"></div>
        </div>
        <div className="mx-auto relative w-full min-h-[30px] text-center ">
          <div className="w-full h-[618px] fill">
            <div className="w-full h-full product-image overflow-hidden relative">
              {listBanner?.slice(4)?.map((item) => (
                <Link key={item._id} to="/products">
                  <img src={item.imageBanner} alt="" className="w-full h-full" />
                </Link>
              ))}

              <div className="w-[29%] text-base bottom-[0%] left-[5%] max-h-full absolute">
                <div className="relative z-10 text-[89%] text-center pb-2">
                  <NavLink
                    to="/products"
                    className="border-banner px-0 mx-40 text-[#ed1c24] text-sm  my-0  justify-center items-center object-cover bg-transparent flex border-cart "
                  >
                    <span className="my-0 mx-2 ">Xem thêm</span>
                    <AiOutlineRight className="my-0 mx-2 -ml-1"></AiOutlineRight>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
