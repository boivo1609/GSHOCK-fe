import { Stack, Typography, TextField, MenuItem, Button, Checkbox, Slider, Box } from '@mui/material';
import FilterInput from 'components/search/FilterInput';
import CustomerPage from 'layout/CustomerLayout/CustomerPage';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as danhmucActions from '../../Admin/Danhmuc/api/actions';
import * as productActions from '../../Admin/SanPham/api/actionsProduct';
import * as colorActions from '../../Admin/Mausac/api/actionsColor';
import Product from './Product';
const optionsStatus = ['asc', 'desc'];
const LABELS_MAP_STATUS = {
  asc: 'Giá từ thấp đến cao',
  desc: 'Giá từ cao đến thấp'
};
function valuetext(value) {
  return `${value}đ`;
}

const minDistance = 0;
const ProductPage = () => {
  const dispatch = useDispatch();
  const { danhmucState, productState, colorState } = useSelector(
    (state) => ({ danhmucState: state.danhmucs, productState: state.products, colorState: state.colors }),
    shallowEqual
  );
  const { data: listDanhMuc } = danhmucState;
  const { data: listColors } = colorState;
  const { productCustomer: listProduct } = productState;
  const [filter, setFilter] = useState({
    tenDanhMuc: '',
    name: '',
    sortPrice: '',
    colors: '',
    price_in: 0,
    price_to: 500000000
  });
  const [checked, setChecked] = useState([]);
  const [value, setValue] = useState([0, 500000000]);
  const [idSelectedDanhMuc, setIdSelectedDanhMuc] = useState(null);
  useEffect(() => {
    dispatch(productActions.getAllProduct({ params: { ...filter } }));
  }, [dispatch, filter]);
  useEffect(() => {
    dispatch(danhmucActions.getAllDanhMuc());
    dispatch(colorActions.getAllColor());
  }, [dispatch]);
  const handleFilterDanhMuc = (item) => {
    if (item === '') {
      setFilter({
        ...filter,
        tenDanhMuc: item
      });
      setIdSelectedDanhMuc(null);
    } else {
      setFilter({
        ...filter,
        tenDanhMuc: item.name
      });
      setIdSelectedDanhMuc(item._id);
    }
  };
  const handleChangeFilterName = (e) => {
    setFilter({
      ...filter,
      name: e.target.value
    });
  };
  const handleChangeFilterSelected = (e) => {
    setFilter({
      ...filter,
      sortPrice: e.target.value
    });
  };
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    const transformColors = newChecked.map((item) => item.name);
    setFilter({
      ...filter,
      colors: transformColors.toString()
    });
  };

  const isFiltered = filter.sortPrice !== '';
  const handleResetFilter = () => {
    setFilter({
      ...filter,
      sortPrice: ''
    });
  };
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
      setFilter({
        ...filter,
        price_in: Math.min(newValue[0], value[1] - minDistance)
      });
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
      setFilter({
        ...filter,
        price_to: Math.max(newValue[1], value[0] + minDistance)
      });
    }
  };
  return (
    <CustomerPage>
      <div className="bg-[#ed1c24] relative">
        <div className="py-6 px-16 max-w-[1430px] relative min-h-[60px] flex items-center justify-between w-full text-shad">
          <div className="flex-1 max-h-full ">
            <div className="text-base text-[#604141] normal-case font-bold p-0 tracking-normal ">
              <p className="py-0 text-[#f1f1f1]">
                <Link to="/" className="font-semibold ml-0">
                  Trang chủ
                </Link>
                <span className="relative top-0 opacity-[0.35] py-0 px-1 font-light"> » </span>
                <span className="">Sản phẩm</span>
              </p>
            </div>
          </div>
          <div className="max-h-full"></div>
        </div>
      </div>
      <div className="bg-[#fff] relative">
        <div className="max-w-[1430px] pt-5 w-full mx-auto">
          <div className="flex">
            <div className="col max-w-[25%] basis-[25%]">
              <div className="ml-auto mr-0">
                <aside className="mb-6">
                  <span className="text-sm font-semibold uppercase ">Danh mục sản phẩm</span>
                  <div className="mt-2.5 h-[3px] bg-[#000000] block mx-0 mb-4 max-w-[40px] w-full"></div>
                  <ul className="m-0 p-0 text-xs">
                    <div>
                      <li className="text-left m-0 list-none">
                        <Typography
                          className={`cursor-pointer ${idSelectedDanhMuc === null && 'text-[#dd3333] font-medium'}`}
                          onClick={() => handleFilterDanhMuc('')}
                        >
                          Tất cả
                        </Typography>
                      </li>
                      <hr className="mx-0 my-3  border-0 opacity-10 border-t-[1px] border-t-current" />
                    </div>
                    {listDanhMuc?.map((item) => (
                      <div key={item._id}>
                        <li className="text-left m-0 list-none">
                          <Typography
                            className={`cursor-pointer ${item._id === idSelectedDanhMuc && 'text-[#dd3333] font-medium'}`}
                            onClick={() => handleFilterDanhMuc(item)}
                          >
                            {item.name}
                          </Typography>
                        </li>
                        <hr className="mx-0 my-3  border-0 opacity-10 border-t-[1px] border-t-current" />
                      </div>
                    ))}
                  </ul>
                </aside>
                <aside className="mb-6">
                  <span className="text-sm font-semibold uppercase ">Bộ lọc sản phẩm</span>
                  <div className="mt-2.5 h-[3px] bg-[#000000] block mx-0 mb-4 max-w-[40px] w-full"></div>
                </aside>
                <Box sx={{ width: 300 }}>
                  <Typography sx={{ fontWeight: 'bold', marginBottom: '10px' }}>LỌC THEO GIÁ </Typography>
                  <Slider
                    min={0}
                    max={500000000}
                    getAriaLabel={() => 'Minimum distance'}
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    disableSwap
                    color="error"
                  />
                </Box>
                <Typography sx={{ fontWeight: 'bold', marginBottom: '10px', marginTop: '10px' }}>LỌC THEO MÀU </Typography>
                <div className="grid grid-cols-2 gap-x-2">
                  {listColors?.map((item) => (
                    <Stack direction="row" spacing={1} key={item._id} alignItems="center" onClick={handleToggle(item)}>
                      <Checkbox checked={checked.indexOf(item) !== -1} tabIndex={-1} disableRipple />
                      <Typography>{item.name}</Typography>
                    </Stack>
                  ))}
                </div>
                <aside className="mb-6"></aside>
              </div>
            </div>
            <div className="col max-w-[75%] basis-[75%]">
              <Stack
                mb={10}
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  sm: 'row'
                }}
                justifyContent="space-between"
              >
                <FilterInput name="name" placeholder="Nhập tên sản phẩm" value={filter.name} onChange={handleChangeFilterName} />
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    fullWidth
                    select
                    label="Sắp xếp theo"
                    value={filter.sortPrice}
                    onChange={handleChangeFilterSelected}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            maxHeight: 260
                          }
                        }
                      }
                    }}
                    sx={{
                      minWidth: 240,
                      textTransform: 'capitalize'
                    }}
                  >
                    {optionsStatus.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        sx={{
                          mx: 1,
                          borderRadius: 0.75,
                          typography: 'body2',
                          textTransform: 'capitalize'
                        }}
                      >
                        {LABELS_MAP_STATUS[option] || option}
                      </MenuItem>
                    ))}
                  </TextField>
                  {isFiltered && (
                    <Button variant="outlined" color="error" className="w-40 h-[35px]" onClick={handleResetFilter}>
                      Làm mới
                    </Button>
                  )}
                </Stack>
              </Stack>
              <Product data={listProduct} />
            </div>
          </div>
        </div>
      </div>
    </CustomerPage>
  );
};

export default ProductPage;
