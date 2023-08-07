import React from 'react'
import { memo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
const TodocompleteField = ({mainData,setMainData,completeData,setCompleteData,uniqueId}) => {

    const onSmash =(id)=>{
         const data = mainData.find(data => data.id === id)
         setCompleteData(pre => [...pre,data])
         const newDatalist = mainData.filter(data => data.id !== id)
         setMainData(newDatalist)
    }
    const onSmash2=(id)=>{
        const data = completeData.find(data => data.id === id)
         setMainData(pre => [...pre,data])
         const newDatalist = completeData.filter(data => data.id !== id)
         setCompleteData(newDatalist)
    }
   
    const handleDelete=(id)=>{
       let del=completeData.filter((data)=>data.id!=id)
       setCompleteData(del)
    }
 const pendingDelete=(id)=>{
   let penData=mainData.filter((data)=>data.id!=id)
   setMainData(penData)
 }
  return (
    <>
    <div className='card w-50 mt-4'>
     <div className='card-header'>Complete</div>
     <div className='card-body'>
     <div className='completeField d-flex flex-wrap'>
     {
     completeData.map((data,index) =>{
        return<div key={index}>
        <input type='checkbox' name='isPending' checked onChange={()=>onSmash2(data.id)}/>
        <div>
        <del>{data.title}</del><DeleteIcon onClick={()=>handleDelete(data.id)}/>  </div>
        </div>
       })
     }
     </div>
     </div>
    </div>

    <div className='card w-50 mt-4'>
    <div className='card-header'>Pending</div>
     <div className='card-body'>
     {
        mainData.map((ele,index)=>(
            <div key={index}>
            <input type='checkbox' onChange={()=>onSmash(ele.id)}/>
           <span className={`text-${ele.periority}`}> {ele.title}<DeleteIcon onClick={()=>pendingDelete(ele.id)}/></span>

           </div>
        ))
     }
     
     </div>
    </div>
    </>
  )
}

export default memo(TodocompleteField)