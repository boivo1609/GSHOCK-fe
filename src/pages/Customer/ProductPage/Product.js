import { Link } from 'react-router-dom';
import { convertToVND } from 'utils/convertPrice';

const Product = (props) => {
  return (
    <div className="-mx-[10px] mb-0 px-0 w-auto max-w-[1422.5px] flex flex-wrap">
      {props.data?.product?.length > 0 ? (
        props?.data?.product?.map((item) => (
          <div key={item._id} className="mb-0 max-w-[20%] basis-[25%] col pt-0 px-[9.8px] pb-[19,6px]">
            <div className="p-0">
              <div className="ml-auto mr-0 relative w-full bg-cover bg-no-repeat bg-[left_calc(50%)_top_calc(50%)]">
                <div className="z-20 left-0 top-0 absolute mt-0 mb-0 mr-0 -ml-[15px] text-sm">
                  {item.discount > 0 && (
                    <div className="ml-4 table pointer-events-none w-11 h-11 ">
                      <div className="bg-[#130f0f] rounded-full table-cell w-full h-full align-middle text-center font-bold text-white leading-3 p-0.5 ">
                        <span> {item.discount}%</span>
                      </div>
                    </div>
                  )}
                  <div className="ml-4 -mt-2 opacity-90	w-10 h-10 table pointer-events-none ">
                    <div className="bg-[#ed1c24] rounded-full text-sm table-cell w-full h-full align-middle text-center font-bold text-white leading-3 p-0.5">
                      New
                    </div>
                  </div>
                </div>
                <div className="relative w-full mx-auto my-0 ">
                  <div className="relative h-auto mx-auto my-0 overflow-hidden product-image">
                    <Link to={`/products/${item._id}`}>
                      <img
                        src={item.image}
                        alt=""
                        width="500"
                        height="600"
                        className="w-full max-w-full mx-auto my-0 opacity-100 inline-block h-full align-middle background-image: none;  "
                      />
                    </Link>
                  </div>
                  <div className="z-[1] px-4 pt-4 pb-5 text-center text-xs w-full relative">
                    <div className="mx-auto leading-5 title-product font-bold">
                      <p className="mb-2">{item.name}</p>
                      <div className="flex flex-wrap gap-y-2 gap-x-2 items-center justify-center">
                        {item.colors.map((iteml) => (
                          <div key={iteml._id} className="px-2 py-1 border border-gray-900 border-solid rounded-lg">
                            <p className=" font-bold text-xs  text-[#7a9c59] ">{iteml.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mx-auto p-2 ">
                      <span className="leading-4 block">
                        {item.discount > 0 && (
                          <del aria-hidden="true">
                            <span className="opacity-60 font-normal mr-1 text-[#ED1C24] text-xs">{convertToVND(item.price)} </span>
                          </del>
                        )}
                        <span className="font-bold text-[#ED1C24] text-xs p-2">{convertToVND(item.price_discount)} </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="">Không có sản phẩm nào</div>
      )}
    </div>
  );
};

export default Product;
