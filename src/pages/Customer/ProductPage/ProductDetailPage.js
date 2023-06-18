/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CustomerPage from 'layout/CustomerLayout/CustomerPage';
import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BsCheckSquareFill, BsFillBoxFill, BsFillCheckCircleFill, BsFillReplyAllFill } from 'react-icons/bs';
import { AiFillCaretRight } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneSquareAlt, FaTruck } from 'react-icons/fa';
import { ImCart } from 'react-icons/im';
import { GiSmartphone } from 'react-icons/gi';
import ProductFeatured from 'layout/CustomerLayout/ProductFeatured';
import FavoriteProduct from 'layout/CustomerLayout/ProductFavorite';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../Admin/SanPham/api/actionsProduct';
import { convertToVND } from 'utils/convertPrice';
import { useSnackbar } from 'notistack';
import * as cartActions from '../Cart/_redux/cartAction';
const ProductDetailPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { productState } = useSelector((state) => ({ productState: state.products }), shallowEqual);
  const { productDetail } = productState;
  const [quantity, setQuantity] = useState(1);
  const [idSelectedColor, setIdSelectedColor] = useState(null);
  const [colorChoosen, setColorChoosen] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      dispatch(productActions.getDetailProduct(id));
    }
  }, [dispatch, id]);
  const handleDecrease = () => {
    if (quantity <= 1) {
      enqueueSnackbar('Số lượng sản phẩm phải lớn hơn 1', {
        variant: 'warning'
      });
    } else {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleChoosenColor = (item) => {
    setColorChoosen(item);
    setIdSelectedColor(item._id);
  };
  const handleAddToCart = (values) => {
    if (colorChoosen === null) {
      enqueueSnackbar('Vui lòng chọn màu sắc khi thêm sản phẩm vào giỏ hàng', {
        variant: 'error'
      });
    } else {
      const transformDataCart = {
        ...values,
        colors: colorChoosen,
        cartQuantity: quantity
      };
      dispatch(cartActions.addToCart(transformDataCart));
      enqueueSnackbar(`${values.name} đã được thêm vào giỏ hàng`, {
        variant: 'success'
      });
    }
  };
  return (
    <CustomerPage>
      <div className="bg-[#ed1c24] relative opacity-80">
        <div className="py-6 px-16 max-w-[1430px] relative min-h-[60px] flex items-center justify-between w-full text-shad">
          <div className="flex-1 max-h-full ">
            <div className="text-base text-[#fff] normal-case font-bold p-0 tracking-normal ">
              <p className="py-0 text-[#f1f1f1]">
                <Link to="/" className="font-normal ml-0">
                  Trang chủ
                </Link>
                <span className="relative top-0 opacity-[0.35] py-0 px-1 font-light"> » </span>
                <Link to="/products">Sản phẩm</Link>
                <span className="relative top-0 opacity-[0.35] py-0 px-1 font-light"> » </span>
                <span className="font-bold">{productDetail?.name}</span>
              </p>
            </div>
          </div>
          <div className="max-h-full"></div>
        </div>
      </div>
      <div className="bg-[#fff] relative ">
        <div className=" product-main py-10 px-0 ">
          <div className="max-w-[1430px] mb-0 w-full flex mx-auto">
            <div className="max-w-[41.6666666667%] basis-[41.6666666667%] col pb-0">
              <div className="opacity-100 relative mb-4 ">
                <div className="z-20 left-0 top-0 absolute mt-0 mb-0 mr-0 -ml-[15px] text-sm">
                  {productDetail?.discount > 0 && (
                    <div className="ml-4 table pointer-events-none w-11 h-11 ">
                      <div className="bg-[#130f0f] rounded-full table-cell w-full h-full align-middle text-center font-bold text-white leading-3 p-0.5 ">
                        <span>{productDetail?.discount} %</span>
                      </div>
                    </div>
                  )}
                  <div className="ml-4 -mt-2 opacity-90	w-10 h-10 table pointer-events-none ">
                    <div className="bg-[#ed1c24] rounded-full text-sm table-cell w-full h-full align-middle text-center font-bold text-white leading-3 p-0.5">
                      New
                    </div>
                  </div>
                </div>
                <div className="h-[539.188px] w-full overflow-hidden ">
                  <div className="left-0 translate-x-[0%] absolute w-full h-full ">
                    <img
                      src={productDetail?.image}
                      alt=""
                      width="500"
                      height="600"
                      className="w-full max-w-full mx-auto my-0 opacity-100 inline-block h-auto align-middle  "
                    />
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="pt-[10px] text-center pr-[30px] border-r flex-1 col">
              <h1 className="text-[#555] text-2xl font-bold w-full mt-0 mb-2 ">{productDetail?.name}</h1>
              <div className="mx-auto bg-[#000000] h-[3px] max-w-[30px] w-full my-4"></div>
              <div className="mx-auto">
                <p className="block text-2xl font-bold mx-0 my-2">
                  {productDetail?.discount > 0 && (
                    <del aria-hidden="true">
                      <span className="opacity-60 font-normal mr-1 text-[#ED1C24]">
                        {productDetail?.price ? convertToVND(productDetail?.price) : 0}
                      </span>
                    </del>
                  )}

                  <span className="font-bold text-[#ED1C24] p-2">
                    {productDetail?.price_discount ? convertToVND(productDetail?.price_discount) : 0}
                  </span>
                </p>
              </div>
              <p className="mb-4 font-bold text-sm mt-0 text-[#7a9c59]">Còn {productDetail?.so_luong} sản phẩm </p>
              <div className="flex gap-x-2 items-center justify-center">
                <p className=" ">Chọn màu sắc : </p>
                {productDetail?.colors.map((iteml) => (
                  <div
                    key={iteml._id}
                    className={`px-3 py-2 cursor-pointer  ${
                      idSelectedColor === iteml._id ? 'border-5 border-red-500 border-solid' : 'border border-gray-900 border-solid'
                    } rounded-lg`}
                    onClick={() => handleChoosenColor(iteml)}
                  >
                    <p className=" font-bold text-sm  text-[#7a9c59]">{iteml.name}</p>
                  </div>
                ))}
              </div>

              <div className="mb-5 mt-4 cart">
                <div className="h-auto flex items-center justify-center">
                  <div className="mr-2 mb-4">
                    <div className="m-0 inline-flex">
                      <input
                        onClick={handleDecrease}
                        type="button"
                        value="-"
                        className="border-r-0 px-2 m-0 inline-block bg-transparent overflow-hidden relative text-[#666] border font-normal button hover:bg-slate-100"
                      />
                      <input
                        value={quantity}
                        inputMode="numeric"
                        className="border h-[2.507em]  border-x-0 max-w-[2em] text-center text-sm bg-transparent px-0 m-0 inline-block"
                      />
                      <input
                        onClick={handleIncrease}
                        type="button"
                        value="+"
                        className="border-l-0 px-2 m-0 inline-block bg-transparent overflow-hidden relative text-[#666] border font-normal button hover:bg-slate-100"
                      />
                    </div>
                  </div>
                  <div className="mr-1 mb-4">
                    <Button variant="contained" color="primary" onClick={() => handleAddToCart(productDetail)}>
                      Thêm vào giỏ
                    </Button>
                  </div>
                  <div className="ml-1 mb-4 font-bold">
                    <Button variant="contained" color="error">
                      <Link to="/" className="font-bold">
                        Mua hàng
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="text-left mt-0 mb-5 ">
                <strong className="flex">
                  <BsFillBoxFill className="pr-1"></BsFillBoxFill> Sản phẩm fullbox chính hãng
                </strong>
              </p>
              <div className="text-left mx-auto flex mb-1">
                <BsFillCheckCircleFill className="mr-1"></BsFillCheckCircleFill> Thẻ bảo hành chính hãng các thương hiệu
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Túi, hộp, khăn lau, găng tay đồng hồ
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Hướng dẫn sử dụng, voucher giảm giá mua hàng
              </div>
              <div className="text-left mx-auto flex mb-1">
                <BsFillCheckCircleFill className="mr-1"></BsFillCheckCircleFill> Chính sánh bảo hành lên đến 5 năm
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Thay pin trọn đời, lau dầu, vệ sinh miễn phí
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Hỗ trợ chi phí thay mặt kính lần đầu tiên
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Tặng kèm kính dán cường lực cho đồng hồ mặt tròn
              </div>
              <div className="text-left mx-auto flex mb-1">
                <FaTruck className="mr-1"></FaTruck> Giao hàng COD toàn quốc từ 02-04 ngày
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Giao hàng tận nơi theo địa chỉ của Quý khách hàng
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Xem và kiểm tra hàng thoải mái trước khi thanh toán
              </div>
              <div className="text-left mx-auto flex mb-1">
                <ImCart className="mr-1"></ImCart> Chính sách thanh toán linh hoạt
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Thanh toán thẻ, chuyển khoản, momo, zalopay...
              </div>
              <div className="text-left pl-1 mx-auto flex mb-1">
                <AiFillCaretRight className="mr-1"></AiFillCaretRight> Thanh toán khi nhận hàng (COD)
              </div>
              <div className="text-left mx-auto flex mb-1">
                <BsFillReplyAllFill className="mr-1"></BsFillReplyAllFill> Chính sách đổi hàng trong vòng 07 ngày
              </div>
              <hr className="mx-0 my-4 border-0 opacity-10 border-t-2 border-t-current" />
              <p className="text-left mt-0 mb-1 ">
                <strong className="flex">
                  <GiSmartphone className=" w-5 h-5"></GiSmartphone> Tel : (0242)-217-9999 - 0973.8.3333.5 - 0973.9.3333.5
                </strong>
              </p>
              <div className="text-left mx-auto flex mb-1">
                <FaPhoneSquareAlt className="pr-1"></FaPhoneSquareAlt>
                <strong>Hotline</strong> :<strong className="text-[#ed1c24] mr-1">0917.51.3333 - 0917.51.6666</strong>
                (24/7)
              </div>
              <div className="text-left mx-auto flex mb-1">
                <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                337 Phố Huế, Quận Hai Bà Trưng, TP. Hà Nội
              </div>
              <div className="text-left mx-auto flex mb-1">
                <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                83 Yên Lãng, Quận Đống Đa, TP. Hà Nội
              </div>
              <div className="text-left mx-auto flex mb-1">
                <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                473 Nguyễn Khang, Quận Cầu Giấy, TP. Hà Nội
              </div>
              <div className="text-left mx-auto flex mb-1">
                <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                Số 161 Lê Đình Lý, Hải Châu, Tp Đà Nẵng
              </div>
              <div className="text-left mx-auto flex mb-1">
                <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                278 Chu Văn An, Quận Bình Thạnh, TP. Hồ Chí Minh
              </div>
              <div className="text-left mx-auto flex mb-1">
                <FaMapMarkerAlt className="pr-1 "></FaMapMarkerAlt>
                431 Cách Mạng Tháng 8, Quận 10, TP. Hồ Chí Minh
              </div>
              <em className="text-left mx-auto flex mb-1 font-bold">
                <BsCheckSquareFill className="mr-1"></BsCheckSquareFill>
                <span className="text-[90%]">Sản phẩm 100% chính hãng, bảo hành chính hãng</span>
              </em>
              <em className="text-left mx-auto flex mb-1 font-bold">
                <BsCheckSquareFill className="mr-1"></BsCheckSquareFill>
                <span className="text-[90%]">Hoàn tiền gấp 10 lần nếu phát hiện hàng giả, hàng nhái</span>
              </em>
            </div>
            <div className="pl-[30px] max-w-[25%] basis-[25%] col">
              <aside className="mb-6 ">
                <span className="text-base font-semibold uppercase ">Sản phẩm nổi bật</span>
                <div className="mt-2.5 h-[3px] bg-[#000000] block mx-0 mb-4 max-w-[40px] w-full"></div>
                <ul className="m-0 p-0 ">
                  <ProductFeatured></ProductFeatured>
                  <ProductFeatured></ProductFeatured>
                  <ProductFeatured></ProductFeatured>
                  <ProductFeatured></ProductFeatured>
                  <ProductFeatured></ProductFeatured>
                  <ProductFeatured></ProductFeatured>
                  <ProductFeatured></ProductFeatured>
                  <ProductFeatured></ProductFeatured>
                </ul>
              </aside>
            </div>
          </div>
        </div>
        <div className="product-footer">
          <div className="max-w-[1430px] px-4 mx-auto w-full ">
            <div className="py-[30px] px-0 border-t-[1px] ">
              <div className="w-full justify-start flex items-center m-0 p-0">
                <div className="mb-[-1px] ml-0 ">
                  <div className="border-t-[#ed1c24] py-[10px] items-center border-t-2 bg-[#fff] font-semibold text-xs text-[rgba(17,17,17,.85)] uppercase px-4 border-x-[1px] ">
                    Mô tả
                  </div>
                </div>
              </div>
              <div className="border-[1px] w-full bg-[#fff] p-[30px]">
                {/* <div className="p-0 ">
                  <p className="mt-0 mb-5">
                    Thương hiệu đồng hồ thể thao G-Shock thuộc sở hữu và sản xuất bởi tập đoàn Casio Computer Nhật Bản. Tất cả các sản phẩm
                    G-Shock đều được trang bị khả năng chống sốc, phân tán lực va đập và chống nước đến độ sâu 200 mét, giúp đồng hồ G-Shock
                    trở thành một trong những thương hiệu đồng hồ bền bỉ nhất hiện nay.Đồng hồ thời trang G-SHOCK là một thương hiệu đồng hồ
                    nổi tiếng của Nhật Bản được giới trẻ yêu thích trên toàn thế giới. Với nhiều mẫu mã đa dạng, từ thiết kế cổ điển đến
                    hiện đại, G-SHOCK đã trở thành một biểu tượng thời trang đường phố được yêu thích trên toàn thế giới.
                  </p>
                  <hr className="mx-0 my-4 border-0 opacity-10 border-t-[1px] border-t-current" />
                  <h3 className="text-[#555] text-xl font-bold uppercase my-5">Thông tin cơ bản</h3>
                  <table className="w-full mb-4 border-spacing-0 ">
                    <tbody>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Độ dày</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">16.9mm</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Kích thước</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">51.2mm</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">trọng lượng</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">72g</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Xuất xứ</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">Nhật bản</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Thương hiệu</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">G-SHOCK</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">dÂY ĐEO</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">Dây đeo bằng nhựa</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Chất liệu mặt kính</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">Mặt kính khoáng</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Mức độ chống nước</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">200m</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Màu đèn</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">ĐÈN LED</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Cấu trúc</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">Chống từ , chống va đập</p>
                        </td>
                      </tr>
                      <tr>
                        <th className="pl-0 leading-4 uppercase py-2 pr-2 text-left border-b-[1px] text-sm">Bộ nguồn và tuổi thọ pin</th>
                        <td className="pr-0 text-[#666]  py-2 pl-2 leading-5 text-sm border-b-[1px] text-left">
                          <p className="mx-0 my-2">Tuổi thọ pin xấp xỉ: 2 năm đối với pin CR1220</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> */}
                <div className="" dangerouslySetInnerHTML={{ __html: `${productDetail?.discription}` }}></div>
              </div>
            </div>
            <div className="border-t-[1px] mb-7 ">
              <FavoriteProduct></FavoriteProduct>
            </div>
          </div>
        </div>
      </div>
    </CustomerPage>
  );
};

export default ProductDetailPage;
