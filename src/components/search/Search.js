import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './search.scss';

const Search = () => {
  return (
    <div className="">
      <div className=" flex items-center max-h-full  relative ">
        <div className="pr-1 flex-1 -ml-12 text-sm m-0 ">
          <input type="text" className=" search-input" placeholder="Tìm kiếm sản phẩm" />
        </div>
        <div className="-ml-10 p-2">
          <button type="submit" className="border-none">
            <FiSearch></FiSearch>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
