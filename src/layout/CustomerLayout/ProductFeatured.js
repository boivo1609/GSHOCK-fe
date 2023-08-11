import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { convertToVND } from 'utils/convertPrice';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as productActions from '../../pages/Admin/SanPham/api/actionsProduct';
const ProductFeatured = () => {
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
      {listProduct?.product?.slice(12, 20)?.map((item) => (
        <div key={item._id}>
          <li className="featured-products text-left m-0">
            <Link to={`/products/${item._id}`} className="block mb-3 p-0 overflow-hidden text-ellipsis leading-5 product-image">
              <img src={item.image} alt="" className=" top-[10px] absolute left-0 w-[70px] h-[70px] mb-1 object-cover object-[50%_50%]" />
              <span className="mx-auto leading-5 title-product text-left text-[#111111]">{item?.name}</span>
            </Link>
            {item?.discount > 0 && (
              <del aria-hidden="true">
                <span className="opacity-60 font-normal mr-1 text-[#ED1C24]">{convertToVND(item.price)}</span>
              </del>
            )}

            <span className="font-bold text-[#ED1C24] p-2">{convertToVND(item.price_discount)}</span>
          </li>
          <hr className="mx-0 my-4 border-0 opacity-10 border-t-[1px] border-t-current" />
        </div>
      ))}
    </div>
  );
};

export default ProductFeatured;
