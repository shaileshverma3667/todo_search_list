import React, { useEffect, useState } from 'react'
import { memo } from 'react'
import SearchElement from './SearchElement'

const TableField = ({mainData,setMainData}) => {
    const [archieveData,setArchieveData]=useState([])
    const [mainSearch,setMainSearch]=useState([])
    const [searchObj,setSearchObj]=useState({
        title:"",
        isPending:"",
        periority:""
    })
    const [render, setRender] = useState(false);
   
  
   const handleChange=(id,index)=>{
      let data = mainData.find(data => data.id === id)
        let dataSource=[...mainData];
        let obj={...data}
       if(data.isPending=="pending"){
        obj={...data,isPending:"completed"};
       }
       else{
        obj={...data,isPending:"pending"};

       }
        dataSource.splice(index,1,obj);
        setMainData(dataSource)

   }

   const handleDelete=(id)=>{
    const del=window.confirm("Are you soure want to delete")
    if(del){
      const delEle= mainData.filter((ele)=>ele.id!=id)
      setMainData(delEle)
       }

   }
   const handleSearch=(e)=>{
        const {name,value}=e.target
        setSearchObj((prev)=>({...prev,[name]:value}))
   }
  
   const searchData=()=>{
     const copyData=[...mainData]
     const {title,isPending,periority}=searchObj
     let result=copyData.filter((data)=>((title? data.title==title:true) && (isPending?data.isPending==isPending:true)&&(periority? data.periority==periority:true)))
     if(result.length)
     setMainSearch(result)
     else{
     alert("Data Not found")

     }
   }
   const clearSearch=()=>{
       setMainSearch([])
       setMainData(mainData)
   }
   const handleCompleteDelete=()=>{
        
    setArchieveData([...archieveData,...mainData.filter(ele=>ele.isPending=="completed")])
    const copyData=[...mainData]
    const compFilter=copyData.filter(ele=>ele.isPending!=="completed")
    setMainData(compFilter)
    setRender(!render)
   }
   const handleArchieved=()=>{
        setMainData([...mainData,...archieveData])
        setArchieveData([])
   }

  return (
    <>
    <div>
       
        <div className='border border-5 border mt-4'>
        <h5 className='text-center text-secondary mt-2'><u>Table List</u></h5>
         <SearchElement handleSearch={handleSearch} searchData={searchData} clearSearch={clearSearch}/>
        <div className='mt-4'>
           <button className='btn btn-secondary' onClick={handleArchieved}>Archieved</button>
           <button className='btn btn-warning ms-2' onClick={handleCompleteDelete}>CompleteDelete</button>
        </div>
        <table className='table table-striped table-bordered mt-4'>
            <thead >
                <tr id="tablehead">
                <th>Sr.No</th>
                <th>Title</th>
                <th>periority</th>
                <th>Change Status</th>
                <th>Status</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                   mainSearch.length==0 && mainData.length!=0 && mainData.map((data,index)=>{   
                        return (
                             <tr key={data.id}>
                            <td>{index+1}</td>
                            <td>{data.title}</td>
                            <td className={data.periority=="high"? "text-danger":data.periority=="low" ? "text-info":"text-warning" }>{data.periority}</td>
                            <td>{
                                
                                render ? 
                                <input type="checkbox" checked={data.isPending=="completed"}  key={data.id+'1'} onChange={()=>handleChange(data.id,index)}/>
                                :
                                <input type="checkbox" checked={data.isPending=="completed"}  key={data.id+'2'} onChange={()=>handleChange(data.id,index)}/>

                                }</td>
                            <td>{data.isPending}</td>
                            <td><button className='btn btn-danger' disabled={data.isPending=="completed"} onClick={()=>handleDelete(data.id)}>Delete</button></td>
                         </tr>
                    )})
                }
                 {
                   mainSearch.length!=0 &&  mainSearch.map((data,index)=>{   
                        return (
                             <tr key={index}>
                            <td>{index+1}</td>
                            <td>{data.title}</td>
                            <td className={data.periority=="high"? "text-danger":data.periority=="low" ? "text-info":"text-warning" }>{data.periority}</td>
                            <td>{<input type="checkbox" checked={data.isPending=="completed"} onChange={()=>handleChange(data.id,index)}/>}</td>
                            <td>{data.isPending}</td>
                            <td><button className='btn btn-danger' disabled={data.isPending=="completed"} onClick={()=>handleDelete(data.id)}>Delete</button></td>
                         </tr>
                    )})
                }
           
            </tbody>
        </table>
        </div>
    </div>
    </>
  )
}

export default memo(TableField)