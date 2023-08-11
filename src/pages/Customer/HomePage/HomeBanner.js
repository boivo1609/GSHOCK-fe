import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import * as bannerActions from '../../Admin/Banner/api/actionsBanner';
// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const HomeBanner = () => {
  const dispatch = useDispatch();
  const { bannerState } = useSelector((state) => ({ bannerState: state.banners }), shallowEqual);
  const { data: listBanner } = bannerState;

  useEffect(() => {
    dispatch(bannerActions.getAllBanner());
  }, []);
  return (
    <div className="">
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff'
        }}
        slidesPerView={'auto'}
        spaceBetween={0}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {listBanner?.slice(0, 4)?.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="w-full h-[618px]">
              <div className="w-full h-full">
                <Link to="/products">
                  <img src={item.imageBanner} alt="" className="w-full h-full " />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
