import React, { useState } from 'react';

const ButtonTotal = () => {
  const [counter, setCouter] = useState(1);
  const handleIncrease = () => {
    setCouter((prevState) => prevState + 1);
  };
  const handleDecrease = () => {
    if (counter > 1) setCouter((prevState) => prevState - 1);
  };
  return (
    <div className="m-0 inline-flex">
      <input
        onClick={handleDecrease}
        type="button"
        value="-"
        className="border-r-0 px-2 m-0 inline-block bg-transparent overflow-hidden relative text-[#666] border font-normal button hover:bg-slate-100"
      />
      <input
        value={counter}
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
  );
};

export default ButtonTotal;
