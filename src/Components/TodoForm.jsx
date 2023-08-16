import React, { useEffect, useState } from 'react'
import "./style/TodoForm.css"
import { v4 as uuid } from 'uuid'
import TableField from './TableField'
import { toast } from 'react-toastify'
import { memo } from 'react'

const TodoForm = () => {
    const [mainData,setMainData]=useState([])
    const [errorMessage,setErrorMessage]=useState(false)
    const [formData,setFormData]=useState({
        id:"abc",
        title:"",
        isPending:"pending",
        periority:""
    }) 
    const uniqueId = uuid()

    const handleChange=(e)=>{ 
        const {name,value}=e.target
        if(mainData.length){
          setFormData((prev)=>({...prev,id:uniqueId,[name]:value,id1:mainData[mainData.length-1].id1+1}))
        }
        else{
        setFormData((prev)=>({...prev,id:uniqueId,[name]:value,id1:1}))

        }
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
        setErrorMessage(false)
        toast.success("Add Successfully")
        }
        else
        {
          setErrorMessage(true)
        }
   }
   const handleSubmit=(e)=>{
       e.preventDefault()

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
        
    <div className='field w-50 mx-auto bg-dark'>
    <h2 className='text-light'>Todoes Form</h2>
    <input type='text' className='form-control w-50 mb-4' value={formData.title} name="title" onChange={handleChange} placeholder='Enter Title...'/>
    {errorMessage && formData.title=="" ?<label>Title can'not be empty</label>:""}
    <select className='form-control w-50 mb-4' value={formData.periority} name="periority" onChange={handleChange}>
        <option>Select...</option>
        <option value="high">high</option>
        <option value="medium">medium</option>
        <option value="low">low</option>
    </select>
    {errorMessage && formData.periority=="" ?<label>Periority can'not be empty</label>:""}
    <button type="submit" className='btn btn-success w-50 mb-4' onClick={handleAdd}>Add</button>
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

export default memo(TodoForm)