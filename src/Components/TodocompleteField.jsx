import React from 'react'
import { memo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
const TodocompleteField = ({mainData,setMainData,completeData,setCompleteData,uniqueId}) => {

    const pendingCheck =(id)=>{
         const data = mainData.find(data => data.id === id)
         setCompleteData(pre => [...pre,data])
         const newDatalist = mainData.filter(data => data.id !== id)
         setMainData(newDatalist)
    }
    const CompleteCheck=(id)=>{
        const data = completeData.find(data => data.id === id)
         setMainData(pre => [...pre,data])
         const newDatalist = completeData.filter(data => data.id !== id)
         setCompleteData(newDatalist)
    }
   
    const compDelete=(id)=>{
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
     <div className='card-header'><h4>Complete</h4></div>
     <div className='card-body'>
     <div className='completeField d-flex flex-wrap'>
     {
      completeData.length!=0 ? completeData.map((data,index) =>{
        return<div key={index}>
          <div>
        <input type='checkbox' name='isPending' checked onChange={()=>CompleteCheck(data.id)}/>
        <del className={`text-${data.periority}`}>{data.title}</del><DeleteIcon className='ms-5' onClick={()=>compDelete(data.id)}/>  </div>
        </div>
       })
       :<p className='ms-5'>No Any Complete Todoes..</p>
     }
     </div>
     </div>
    </div>

    <div className='card w-50 mt-4'>
    <div className='card-header'><h4>Pending</h4></div>
     <div className='card-body'>
     {
      mainData.length!=0 ? mainData.map((ele,index)=>(
            <div key={index}>
            <input type='checkbox' onChange={()=>pendingCheck(ele.id)}/>
           <span className={`text-${ele.periority}`}> {ele.title}<DeleteIcon className='ms-5' onClick={()=>pendingDelete(ele.id)}/></span>

           </div>
        ))
        :<p className='text-center'>No todoes found..</p>
     }
     
     </div>
    </div>
    </>
  )
}

export default memo(TodocompleteField)