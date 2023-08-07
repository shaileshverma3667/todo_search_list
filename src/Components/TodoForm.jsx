import React, { useEffect, useState } from 'react'
import "./style/TodoForm.css"
import TodocompleteField from './TodocompleteField'
import { v4 as uuid } from 'uuid'

const TodoForm = () => {
    const [mainData,setMainData]=useState([])
    const [completeData,setCompleteData]=useState([])
    const [formData,setFormData]=useState({
        id:"abc",
        title:"",
        isPending:"",
        periority:""
    }) 
    const uniqueId = uuid()

    const handleChange=(e)=>{ 
        const {name,value}=e.target
        setFormData((prev)=>({...prev,id:uniqueId,[name]:value}))
    }
 
   const handleAdd=()=>{
        setMainData(pre => [...pre,formData])
        setFormData("")
   }
   const handleSubmit=(e)=>{
       e.preventDefault()
       e.target.reset()
   }
 const clearData=()=>{
    setCompleteData([])
 }
 useEffect(()=>{
   let data=JSON.parse(localStorage.getItem("mainData"))
   if(data.length)
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
        <h2>Todoes list</h2>
    <div className='field'>
    <input type='text' className='form-control w-50' name="title" onChange={handleChange}/>
    <select className='form-control w-25' name="periority" onChange={handleChange}>
        <option>Select...</option>
        <option value="danger">high</option>
        <option value="info">medium</option>
        <option value="warning">low</option>
    </select>
    <button className='btn btn-success' onClick={handleAdd}>Add</button>
    <button className='btn btn-danger' onClick={clearData}>Clear Complete</button>
    </div>

    <div>
    <TodocompleteField mainData={mainData} setMainData={setMainData}  uniqueId={uniqueId} completeData={completeData} setCompleteData={setCompleteData}/>
    </div>
    </form>
    </div>
    </>
  )
}

export default TodoForm