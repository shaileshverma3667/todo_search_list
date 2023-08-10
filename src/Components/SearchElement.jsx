import React from 'react'

const SearchElement = ({handleSearch,searchData,clearSearch}) => {
  return (
   <>
    <div className='d-flex justify-content-around'> 
            <input type="text" name="title" onChange={handleSearch} className='form-control w-25' placeholder='search Title..'/>
            <select  className='form-control w-25'onChange={handleSearch} name="isPending" >
                <option>select status..</option>
                <option value="completed">Complete</option>
                <option value="pending">pending</option>
             </select>
             <select className='form-control w-25' onChange={handleSearch} name="periority" >
                <option>Select Peroirity</option>
                <option value="high">high</option>
                <option value="medium">Medium</option>
                <option value="low">low</option>
            </select>
            <div>
            <button className='btn btn-dark' onClick={searchData}>Search</button>
            <button className='btn btn-dark ms-2' onClick={clearSearch}>Clear Search</button>
            </div>
            
            
        </div>
   </>
  )
}

export default SearchElement