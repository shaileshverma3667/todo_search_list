import React from 'react'
import { memo } from 'react'
const SearchElement = ({handleSearch,clearSearch,searchObj}) => {
  return (
   <>
    <div className='d-flex justify-content-around'> 
            <input type="text" name="title" value={searchObj.title} onChange={handleSearch} className='form-control w-25' placeholder='search Title..'/>
            <select  className='form-control w-25'onChange={handleSearch} value={searchObj.isPending} name="isPending" >
                <option value={""}>select status..</option>
                <option value="completed">Complete</option>
                <option value="pending">pending</option>
             </select>
             <select className='form-control w-25' value={searchObj.periority} onChange={handleSearch} name="periority" >
                <option value={""}>Select Peroirity</option>
                <option value="high">high</option>
                <option value="medium">Medium</option>
                <option value="low">low</option>
            </select>
            <div>
            <button className='btn btn-dark ms-2' onClick={clearSearch}>Clear Search</button>
            </div>
            
            
        </div>
   </>
  )
}

export default memo(SearchElement)