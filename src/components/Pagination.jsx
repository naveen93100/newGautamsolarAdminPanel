import React, { useEffect, useState } from 'react';

const Pagination = ({page,setPage,hasNext}) => {


  const handlePrev = () => {
    
    if(page>1){
      setPage(page-1);
    }

  };

  const handleNext = () => {
       setPage(page+1);
  };


  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePrev}
        disabled={page==1}
        className="px-4 py-2 mx-2 rounded bg-red-500 disabled:opacity-50"
      >
        Prev
      </button>

      <button
        onClick={handleNext}
        disabled={hasNext}
        className="px-4 py-2 mx-2 rounded bg-red-500 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
