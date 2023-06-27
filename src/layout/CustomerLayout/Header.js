import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { shallowEqual, useSelector } from 'react-redux';
import { convertToVND } from 'utils/convertPrice';
import Search from 'components/search/Search';
import { useDispatch } from 'react-redux';
import { actions } from '../../pages/authentication/_redux/authRedux';
import { useNavigate } from 'react-router-dom';
import * as cartActions from '../../pages/Customer/Cart/_redux/cartAction';
import { useSnackbar } from 'notistack';

import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Popover, Badge, Button } from '@mui/material';
const Header = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { currentState, cartsState } = useSelector((state) => ({ currentState: state.auth, cartsState: state.carts }), shallowEqual);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { cart, cartTotalAmount } = cartsState;
  const handleDeleToCart = (item) => {
    dispatch(cartActions.deleteToCart(item));
    enqueueSnackbar(`${item.name} đã được xóa khỏi giỏ hàng`, {
      variant: 'success'
    });
  };
  const handleDeleAllCart = () => {
    dispatch(cartActions.clearCart());
    enqueueSnackbar(`Tất cả sản phẩm đã được xóa khỏi giỏ hàng`, {
      variant: 'success'
    });
  };
  const [quantity, setQuantity] = React.useState(1);

  const handleIncrease = (item) => {
    setQuantity(item.cartQuantity);
    dispatch(cartActions.increaseCart(item));
  };
  const handleDecrement = (item) => {
    setQuantity(item.cartQuantity);
    dispatch(cartActions.decreaseCart(item));
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    dispatch(cartActions.clearCart());
    dispatch(actions.logout());
    navigate('/logout');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(cartActions.getTotal());
  }, [dispatch, cart, quantity]);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <header className=" w-full z-10 bg-white  ">
      <div className="header ">
        <div className="flex items-center justify-between px-6 py-4 w-full mx-auto">
          <div className="w-80 ml-0 mr-7 m-0 leading-none max-h-full">
            <Link to="/" title="G-shock chính hãng">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/8/81/GShock_logo.svg/1200px-GShock_logo.svg.png"
                alt=""
                className="max-h-24 w-auto "
              />
            </Link>
          </div>
          <div className="mr-auto ml-20 w-4/12">
            <Search></Search>
          </div>

          <div className="ml-auto max-h-full">
            <ul className="mt-1 w-full relative flex items-center justify-end m-0 p-0">
              <li className=" headerr-divider"></li>
              <li className=" headerr-divider-second"></li>
              <li className="menu-item">
                <NavLink className="text-black font-semibold uppercase text-xs menu-items" to="/products">
                  Sản phẩm
                </NavLink>
              </li>

              <li className=" headerr-divider-second"></li>
              {!currentState?.authToken?.token && (
                <li className="menu-item">
                  <NavLink className="text-black font-semibold uppercase text-xs menu-items" to="/login">
                    Đăng nhập
                  </NavLink>
                </li>
              )}

              <li className="headerr-divider"></li>
              <li className="cart mr-0 menu-item">
                <div className="border border-red-800 border-style rounded-full border-cart">
                  <button
                    aria-describedby={id}
                    onClick={handleClick}
                    className=" px-0 mx-0.5 text-red-600 text-xs border-none my-0  items-center rounded-full object-cover bg-transparent button flex border-cart "
                  >
                    <span className="my-0 mx-2 ">GIỎ HÀNG</span>
                    <Badge badgeContent={cart?.length > 0 ? cart?.length : 0} color="error">
                      <FaShoppingCart className="my-0 mx-2 -ml-1 w-5 h-5"></FaShoppingCart>
                    </Badge>
                  </button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <div className=" flex flex-col items-center py-2">
                      {cart?.length > 0 ? (
                        <table className="w-full px-2">
                          <thead>
                            <tr>
                              <th colSpan="3" className=" pl-0 uppercase p-1 border-b-[1px] border-bot-style text-left  text-xs">
                                sản phẩm
                              </th>
                              <th className=" border-b-[1px] border-bot-style pl-0 uppercase p-1 text-left text-xs">số lượng</th>
                              <th className="border-b-[1px] border-bot-style pl-0 uppercase p-1 text-center text-xs">Giá</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart?.map((item) => (
                              <tr key={item._id}>
                                <td className="py-1 w-5 p-0 border-b-[1px] border-bot-style text-xs text-left">
                                  <button
                                    onClick={() => handleDeleToCart(item)}
                                    className="block leading-5 w-6 h-6 text-base rounded-[100%] hover:text-[#111] text-[#ccc] font-bold text-center border-2 border-solid border-current "
                                  >
                                    ×
                                  </button>
                                </td>
                                <td className="border-b-[1px] border-bot-style py-1 min-w-[60px] w-[90px] max-w-[90px] p-2  ">
                                  <div>
                                    <img src={item.image} alt="" className="h-[77px] w-[63px] inline-block align-middle max-w-full " />
                                  </div>
                                </td>
                                <td className="py-1  border-bot-style text-ellipsis p-2 border-b-[1px] text-xs text-[#666]">
                                  <p>{item.name}</p>
                                </td>

                                <td className="py-1 p-2 border-b-[1px] border-bot-style ">
                                  <div className="m-0 inline-flex">
                                    <input
                                      onClick={() => handleDecrement(item)}
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
                                      onClick={() => handleIncrease(item)}
                                      type="button"
                                      value="+"
                                      className="border-l-0 px-2 m-0 inline-block bg-transparent overflow-hidden relative text-[#666] border font-normal button hover:bg-slate-100"
                                    />
                                  </div>
                                </td>
                                <td className="py-1 p-2 border-b-[1px]  border-bot-style text-xs text-left">
                                  <span className="font-bold text-[#ED1C24] p-2">
                                    {item.price_discount
                                      ? (item.price_discount * item.cartQuantity).toLocaleString('vi', {
                                          style: 'currency',
                                          currency: 'VND'
                                        })
                                      : (item.price * item.cartQuantity).toLocaleString('vi', {
                                          style: 'currency',
                                          currency: 'VND'
                                        })}
                                  </span>
                                </td>
                              </tr>
                            ))}
                            <tr>
                              <td colSpan="6" className=" text-xs ">
                                <div className="flex items-center mr-[0,85rem] float-right ">
                                  <th className="text-xs font-normal  ">Tạm tính : </th>
                                  <span className="font-bold text-[#ED1C24] p-2">
                                    {cartTotalAmount ? convertToVND(cartTotalAmount) : 0}
                                  </span>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="6" className="  pt-[5px]  text-xs ">
                                <div className="flex items-center justify-between float-right">
                                  <NavLink
                                    to="/cart"
                                    className="text-[#ed1c24] border-2 text-xs border-solid  border-current bg-transparent leading-[2.19em]  button border-cart uppercase"
                                  >
                                    Đi đến giỏ hàng{' '}
                                  </NavLink>
                                  <Button
                                    className="text-[#ed1c24] border-2 text-xs border-solid  border-current bg-transparent leading-[2.19em] button border-cart uppercase"
                                    onClick={handleDeleAllCart}
                                  >
                                    Xóa tất cả sản phẩm
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Typography sx={{ p: 2, fontWeight: 'bold' }}>Chưa có sản phẩm trong giỏ hàng</Typography>
                          <img src="/2038854.png" alt="" className="w-16 h-16" />
                        </div>
                      )}
                    </div>
                  </Popover>
                </div>
              </li>
              {currentState?.authToken?.token && (
                <li className="mr-2 ml-4 flex items-center justify-between">
                  <span className="text-base text-black font-semibold mr-4">{currentState?.authToken?.user?.name}</span>
                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Travis Howard"
                          src="https://cdn.dribbble.com/users/468006/screenshots/1368209/03.jpg?compress=1&resize=800x600&vertical=top"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <MdOutlineAccountCircle className="h-5 w-5"></MdOutlineAccountCircle>
                        </Typography>
                        <Typography textAlign="center" className="ml-2 text-base">
                          Tài khoản
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <AiFillSetting className="h-5 w-5"></AiFillSetting>
                        </Typography>
                        <Typography textAlign="center" className="ml-2 text-base">
                          Cài đặt
                        </Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">
                          <RiLogoutBoxRLine className="h-5 w-5"></RiLogoutBoxRLine>
                        </Typography>
                        <Typography textAlign="center" className="ml-2 text-base" onClick={handleLogout}>
                          Đăng xuất
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
