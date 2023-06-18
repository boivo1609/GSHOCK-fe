import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { AiFillSetting } from 'react-icons/ai';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import { shallowEqual, useSelector } from 'react-redux';
import Search from 'components/search/Search';
import { useDispatch } from 'react-redux';
import { actions } from '../../pages/authentication/_redux/authRedux';
import { useNavigate } from 'react-router-dom';
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Popover, Badge } from '@mui/material';
const Header = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { currentState, cartsState } = useSelector((state) => ({ currentState: state.auth, cartsState: state.carts }), shallowEqual);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { cart } = cartsState;
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = async () => {
    dispatch(actions.logout());
    navigate('/logout');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
                <div className="border border-red-800">
                  <button
                    aria-describedby={id}
                    onClick={handleClick}
                    className=" px-0 mx-0.5 text-red-600 text-xs border-none my-0 rounded-full items-center object-cover bg-transparent button flex border-cart "
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
                    <div className=" flex flex-col items-center py-4">
                      <Typography sx={{ p: 2, fontWeight: 'bold' }}>Chưa có sản phẩm trong giỏ hàng</Typography>
                      <img src="/2038854.png" alt="" className="w-16 h-16" />

                      <Link to="/cart" className="text-lg text-[#000]">
                        ĐẾN GIỎ HÀNG
                      </Link>
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
