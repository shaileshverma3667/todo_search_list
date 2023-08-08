import React from 'react'
import { memo } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const TodocompleteField = ({mainData,setMainData,completeData,setCompleteData,clearData}) => {

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
   
 const pendingDelete=(id)=>{
    let del=window.confirm("Are you want sure")
    if(del)
    {
      let penData=mainData.filter((data)=>data.id!=id)
      setMainData(penData)
    }
   
 }
  return (
    <>
    <div className='d-flex'>    
    <div className='card w-50 mt-4 d-flex'>
     <div className='card-header'><h4>Complete</h4></div>
     <div className='card-body'>
     <div className='completeField d-flex flex-wrap'>
     {
      completeData.length!=0 ? completeData.map((data,index) =>{
        return<div key={index}>
          <div>
        <input type='checkbox' name='isPending' checked onChange={()=>CompleteCheck(data.id)}/>
        <del className={`text-${data.periority}`}>{data.title}</del></div>
        </div>
       })
       :<p className='ms-5'>No Any Complete Todoes..</p>
     }
     </div>
     </div>
    </div>
    <button className='btn btn-danger h-25 m-4' onClick={clearData}>Clear Complete</button>
    </div>

    <div className='card w-50 mt-4'>
    <div className='card-header'><h4>Pending</h4></div>
     <div className='card-body'>
     {
      mainData.length!=0 ? mainData.map((ele,index)=>(
            <div key={index} style={{cursor:"pointer"}}>
            <input type='checkbox' onChange={()=>pendingCheck(ele.id)}/>
            <span className={`text-${ele.periority}`} title={ele.periority=="danger" && "high" || ele.periority=="info" && "Medium" || ele.periority=="secondary" && "Low" }>{ele.title}<DeleteIcon className='ms-5' onClick={()=>pendingDelete(ele.id)}/></span>

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