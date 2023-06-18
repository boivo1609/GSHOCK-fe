import React from 'react';
import { FaMapMarkerAlt, FaPhoneSquareAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full relative">
      <div className="footer  ">
        <div className="max-w-[1430px] text-[#f1f1f1] mb-0 w-full flex mx-auto ">
          <div className="max-w-[25%] basis-1/4 mb-6 pb-0 col">
            <span className="text-base font-semibold uppercase tracking-wider">Showroom</span>
            <div className="bg-[rgba(255,255,255,.3)] mt-2.5 h-1 block mx-0 mb-4 max-w-[40px] w-full"></div>
            <div className="">
              <p className="mt-0 mb-5">
                <span className="text-xs flex">
                  <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                  Số 337 Phố Huế, Hai Bà Trưng, Hà Nội
                </span>
              </p>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="mt-0 mb-5">
                <span className="text-xs flex">
                  <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                  Số 8 Yên Lãng, Đống Đa, TP. Hà Nội
                </span>
              </p>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="mt-0 mb-5">
                <span className="text-xs flex">
                  <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                  Số 161 Lê Đình Lý, Hải Châu, Tp Đà Nẵng
                </span>
              </p>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="mt-0 mb-5">
                <span className="text-xs flex">
                  <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                  Số 278 Chu Văn An, Bình Thạnh, TP.HCM
                </span>
              </p>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="mt-0 mb-5">
                <span className="text-xs flex">
                  <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                  Số 431 CMT8 , Quận 10, TP. Hồ Chí Minh
                </span>
              </p>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="mt-0 mb-5">
                <span className="text-sm flex">
                  <FaPhoneSquareAlt className="pr-1 w-4 h-4"></FaPhoneSquareAlt>
                  Hỗ trợ kỹ thuật :<span className="text-[#fb0303] px-1">(0243)-910-3333</span>
                  (09:00 - 21:00)
                </span>
              </p>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="mt-0 mb-5">
                <span className="text-sm flex">
                  <FaPhoneSquareAlt className="pr-1 w-4 h-4"></FaPhoneSquareAlt>
                  Bảo hành :<span className="text-[#fb0303] px-1">(0242)-217-9999</span>
                  (09:00-18:00)
                </span>
              </p>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="mt-0 mb-5">
                <span className="text-sm flex">
                  <FaPhoneSquareAlt className="pr-1 w-4 h-4"></FaPhoneSquareAlt>
                  Hotline
                  <span className="text-[#fb0303] px-1">0917.51.3333 - 0917.51.6666</span>
                  (24/7)
                </span>
              </p>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
            </div>
          </div>
          <div className="max-w-[25%] basis-1/4 mb-6 pb-0 col">
            <span className="text-base font-semibold uppercase tracking-wider">hỗ trợ – chính sách</span>
            <div className="bg-[rgba(255,255,255,.3)] mt-2.5 h-1 block mx-0 mb-4 max-w-[40px] w-full"></div>
            <div>
              <ul className="m-0 p-0 text-sm">
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    Chính sách giao hàng
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    Chính sách đổi hàng
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    Chính sách thanh toán
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    Chính sách bảo hành
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    Chính sách bảo mật
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    Cửa hàng trực tuyến
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    Mua hàng trả góp
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              </ul>
            </div>
          </div>
          <div className="max-w-[25%] basis-1/4 mb-6 pb-0 col">
            <span className="text-base font-semibold uppercase tracking-wider">danh mục sản phẩm</span>
            <div className="bg-[rgba(255,255,255,.3)] mt-2.5 h-1 block mx-0 mb-4 max-w-[40px] w-full"></div>
            <div>
              <ul className="m-0 p-0 text-xs">
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    MR-G
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    MT-G
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    G-STEEL
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    G-SQUAD
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    FULL-METAL
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    MASTER OF G-SEA
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    ĐỒNG HỒ SỐ
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
                <li className="text-left m-0 list-none">
                  <Link to="/" className="px-0 py-2">
                    MẪU ĐẶC BIỆT
                  </Link>
                </li>
                <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              </ul>
            </div>
          </div>
          <div className="max-w-[25%] basis-1/4 mb-6 pb-0 col">
            <span className="text-base font-semibold uppercase tracking-wider">www.gshock.com.vn</span>
            <div className="bg-[rgba(255,255,255,.3)] mt-2.5 h-1 block mx-0 mb-4 max-w-[40px] w-full"></div>
            <div>
              <p className="mt-0 mb-5">
                <span className="text-sm">Kết nối với chúng tôi</span>
              </p>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
