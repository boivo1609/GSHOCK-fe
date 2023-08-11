import React, { useEffect, useState } from 'react';
// import { FiSearch } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import { convertToVND } from 'utils/convertPrice';
import * as productActions from '../../pages/Admin/SanPham/api/actionsProduct';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
const Search = () => {
  const dispatch = useDispatch();
  const { productState } = useSelector((state) => ({ productState: state.products }), shallowEqual);
  const { productCustomer: listProduct } = productState;
  const [filter] = useState({
    tenDanhMuc: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productActions.getAllProduct({ params: { ...filter } }));
  }, [dispatch]);
  return (
    <Autocomplete
      sx={{ width: 600 }}
      options={listProduct?.product || []}
      autoHighlight
      disablePortal
      getOptionLabel={(option) => option.name}
      noOptionsText="Không tìm thấy sản phẩm"
      onChange={(e, newValue) => {
        newValue !== null && navigate(`/products/${newValue?._id}`);
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading="lazy" width="50" height="50" src={option.image} alt="" />
          <div className="">
            <h4> {option.name}</h4>
            <span className="leading-4 block ">
              {option.discount > 0 && (
                <del aria-hidden="true">
                  <span className="opacity-60 font-normal mr-1 text-[#ED1C24] text-xs">{convertToVND(option.price)} </span>
                </del>
              )}
              <span className="font-bold text-[#ED1C24] text-xs py-2">{convertToVND(option.price_discount)} </span>
            </span>
          </div>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Tìm kiếm sản phẩm"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password' // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default Search;
