import React, { useEffect, useState } from 'react'
import "./style/TodoForm.css"
import { v4 as uuid } from 'uuid'
import TableField from './TableField'


const TodoForm = () => {
    const [mainData,setMainData]=useState([])
    const [formData,setFormData]=useState({
        id:"abc",
        title:"",
        isPending:"pending",
        periority:""
    }) 
    const uniqueId = uuid()

    const handleChange=(e)=>{ 
        const {name,value}=e.target
        setFormData((prev)=>({...prev,id:uniqueId,[name]:value}))
    }
 
   const handleAdd=()=>{
        if(formData.title!="" && formData.periority!=""){
          setMainData(pre => [...pre,formData])
          setFormData({
          id:"abc",
          title:"",
          isPending:"pending",
          periority:""
        })
        }
        else 
        {
          return alert("Please fill the field")
        }
   }
   const handleSubmit=(e)=>{
       e.preventDefault()
       e.target.reset()
   }

 useEffect(()=>{
   let data=JSON.parse(localStorage.getItem("mainData"))
   if(data)
   {
    setMainData(data)
   }
 },[])

 useEffect(()=>{
    localStorage.setItem("mainData",JSON.stringify(mainData))
 },[mainData])

  return (
    <>
    <div className='container'>
        <form onSubmit={handleSubmit}>
        
    <div className='field w-50 mx-auto'>
    <h2 className='text-secondary'>Todoes Form</h2>
    <input type='text' className='form-control w-50 mb-4' value={formData.title} name="title" onChange={handleChange} placeholder='Enter Title...'/>
    <select className='form-control w-50 mb-4' value={formData.periority} name="periority" onChange={handleChange}>
        <option>Select...</option>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
    </select>
    <button className='btn btn-success w-50 mb-4' onClick={handleAdd}>Add</button>
    </div>

    <div>
    {/* <TodocompleteField mainData={mainData} setMainData={setMainData}  clearData={clearData} completeData={completeData} setCompleteData={setCompleteData}/> */}
     <TableField mainData={mainData} setMainData={setMainData} formData={formData} setFormData={setFormData}/>
    </div>
    </form>
    </div>
    </>
  )
}

export default TodoForm