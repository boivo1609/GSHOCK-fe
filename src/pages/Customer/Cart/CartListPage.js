import React, { useState } from 'react';
import CustomerPage from 'layout/CustomerLayout/CustomerPage';
import { Link, NavLink } from 'react-router-dom';
import { convertToVND } from 'utils/convertPrice';
// import * as cartActions from '../Cart/_redux/cartAction';
import { HiChevronRight } from 'react-icons/hi';
import { useSnackbar } from 'notistack';
import { shallowEqual, useSelector } from 'react-redux';
const CartListPage = () => {
  //   const dispatch = useDispatch();
  const { cartState } = useSelector((state) => ({ cartState: state.carts }), shallowEqual);

  console.log(cartState);
  const { cart: listCart } = cartState;
  const { enqueueSnackbar } = useSnackbar();
  //   useEffect(() => {
  //     dispatch(cartActions.addToCart());
  //   }, []);
  const [quantity, setQuantity] = useState(1);
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
  return (
    <CustomerPage>
      <div className="relative-bg-[#fff]">
        <div className="relative">
          <div className="max-w-[1430px] pt-5 min-h-[60px] flex items-center justify-between w-full border-t-[1px] px-4 mx-auto">
            <div className="flex-1 max-h-full">
              <nav className="normal-case text-[#555] py-4 px-0 font-bold text-center text-2xl flex items-center justify-center">
                <NavLink className="text-[#111] ml-0 font-normal" to="/cart">
                  Giỏ hàng
                </NavLink>
                <span className="top-[2px] my-0 mx-2 opacity-[0.35] font-light">
                  <HiChevronRight></HiChevronRight>
                </span>
                <NavLink className="text-[#ccc] ml-0 font-normal hover:text-[#111]" to="/cart">
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
        <div className="max-w-[1430px] py-[30px] px-4 w-full mx-auto">
          <div>
            <div className="-mx-[30px] mb-0 px-0 w-auto max-w-[1460px] flex">
              <div className="mb-0 pt-0 px-[30px] pb-0 max-w-[58.3333333333%] basis-[58.3333333333%] col">
                <form className="mb-5">
                  <div>
                    <table className="w-full mb-4 ">
                      <thead>
                        <tr>
                          <th colSpan="3" className=" border-b-[3px] pl-0 uppercase p-2  text-left  text-sm">
                            sản phẩm
                          </th>

                          <th className=" border-b-[3px] pl-0 uppercase p-2 text-center text-sm">Giá</th>
                          <th className=" border-b-[3px] pl-0 uppercase p-2 text-left text-sm">số lượng</th>
                          <th className=" border-b-[3px] pl-0 uppercase pr-0 text-right text-sm">tạm tính</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listCart?.map((item) => (
                          <tr key={item._id}>
                            <td className="py-4 w-5 p-0 border-b-[1px] text-sm text-left">
                              <button className="block leading-5 w-6 h-6 text-base rounded-[100%] hover:text-[#111] text-[#ccc] font-bold text-center border-2 border-solid border-current ">
                                ×
                              </button>
                            </td>
                            <td className="py-4 min-w-[60px] w-[90px] max-w-[90px] p-2 border-b-[1px] ">
                              <Link to="/">
                                <img src={item.image} alt="" className="h-[95px] w-[79px] inline-block align-middle max-w-full " />
                              </Link>
                            </td>
                            <td className="py-4 text-ellipsis p-2 border-b-[1px] text-sm text-[#666]">
                              <p to="/detail-product">{item.name}</p>
                            </td>
                            <td className="py-4 p-2 border-b-[1px] text-sm text-left">
                              <span className="font-bold text-[#ED1C24] p-2">
                                {item?.price_discount ? convertToVND(item?.price_discount) : 0}
                              </span>
                            </td>
                            <td className="py-4 p-2 border-b-[1px] ">
                              <div className="m-0 inline-flex">
                                <input
                                  onClick={handleDecrease}
                                  type="button"
                                  value="-"
                                  className="border-r-0 px-2 m-0 inline-block bg-transparent overflow-hidden relative text-[#666] border font-normal button hover:bg-slate-100"
                                />
                                <input
                                  value={item.cartQuantity}
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
                            </td>
                            <td className="py-4 p-2 border-b-[1px] text-sm text-right">
                              <span className="font-bold text-[#ED1C24] p-2">2.860.000đ</span>
                            </td>
                          </tr>
                        ))}

                        <tr>
                          <td colSpan="6" className="text-right border-0 px-0 pt-[15px] pb-[10px] text-sm ">
                            <div className="float-left text-left ml-0">
                              <NavLink
                                to="/products"
                                className="text-[#ed1c24] border-2 text-xs border-solid  border-current bg-transparent leading-[2.19em] mb-4  button border-cart uppercase"
                              >
                                ← Tiếp tục xem sản phẩm{' '}
                              </NavLink>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </form>
              </div>
              <div className="border-l mb-0 pt-0 px-[30px] pb-0 col  max-w-[41.6666666667%] basis-[41.6666666667%]">
                <div className="mr-auto ml-0 relative ">
                  <table cellSpacing="0" className="w-full mb-4">
                    <thead>
                      <tr>
                        <th className="border-b-[3px] px-0 uppercase p-2  text-left  text-sm" colSpan="2">
                          Cộng giỏ hàng
                        </th>
                      </tr>
                    </thead>
                  </table>
                  <table className="w-full mb-4" cellSpacing="0">
                    <tbody>
                      <tr>
                        <th className="text-sm font-normal pl-0 p-2 text-left border-b-[1px]">Tạm tính</th>
                        <td className="text-right pr-0 text-sm border-b-[1px]">
                          <span className="font-bold text-[#ED1C24] p-2">2.860.000đ</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="text-sm font-normal pl-0 pr-2 py-5 text-left  border-b-[1px]">Giao hàng</th>
                        <td className="text-right pr-0 text-sm border-b-[1px]">
                          <span className="text-xs text-[#666]">Đồng giá : </span>
                          <span className="font-bold text-[#ED1C24] p-2">30.000đ</span>
                        </td>
                      </tr>
                      <tr>
                        <th className="text-sm font-normal pl-0 p-2 text-left border-b-[1px]">Tổng</th>
                        <td className="text-right pr-0 text-sm border-b-[1px] total-price">
                          <span className="font-bold text-[#ED1C24] p-2">2.860.000đ</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="my-7 mx-0">
                    <NavLink to="/" className="block mr-0 bg-[rgba(0,0,0,0.91)] text-[#fff] button uppercase">
                      Tiến hành thanh toán
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerPage>
  );
};

export default CartListPage;
