import React, {
  useState } from 'react'
import { memo } from 'react'
import SearchElement from './SearchElement'
import ReactPaginate from 'react-paginate'




const TableField = ({mainData,setMainData}) => {
  //pagination....
    const [pageNo,setPageNo]=useState(0)
    const parPagedata=5;
    const allData=pageNo*parPagedata;
    const pageCount=Math.ceil(mainData.length/parPagedata);
    const handlePageChange=({selected})=>{
          setPageNo(selected)
    }
    //pagination end...
    const [render, setRender] = useState(false);
    const [archieveData,setArchieveData]=useState([])
   
    //const [mainSearch,setMainSearch]=useState([])
    const [searchObj,setSearchObj]=useState({
        title:"",
        isPending:"",
        periority:""
    })

   
  //CheckBox OnChange...
   const handleChange=(id)=>{
      let index=mainData.findIndex((ele)=>ele.id==id);
      let allData=[...mainData];
      let obj=allData[index];
      if(obj.isPending=="pending"){
        obj={...obj,isPending:"completed"};
      }
      else{
        obj={...obj,isPending:"pending"}
      }
      allData[index]=obj;
      setMainData(allData)

   }

   const handleDelete=(id)=>{
    const del=window.confirm("Are you soure want to delete")
    if(del){
      const delEle= mainData.filter((ele)=>ele.id!==id)
      setMainData(delEle)
       }
   }
   //Search onChange
   const handleSearch=(e)=>{
        const {name,value}=e.target
        setSearchObj((prev)=>({...prev,[name]:value}))  
   }

   const handleCompleteDelete=()=>{ 
    setArchieveData([...archieveData,...mainData.filter(ele=>ele.isPending=="completed")])
    const copyData=[...mainData]
    const compFilter=copyData.filter(ele=>ele.isPending!=="completed")
    setMainData(compFilter)
    setRender(!render)

    // window.localStorage.setItem("archive",JSON.stringify(copyData.filter(ele=>ele.isPending=="completed")))
   }
   const handleArchieved=()=>{
        setMainData([...mainData,...archieveData])
        setArchieveData([])
    //   let getData=JSON.parse(localStorage.getItem("archive"))
    // if(getData){
    //  setArchieveData(getData)
    // }
   
    }
   const clearSearch=()=>{
    setSearchObj({  
    title:"",
    isPending:"",
    periority:""
  })}
    const searchData=()=>{
      if(searchObj.title || searchObj.isPending || searchObj.periority)
      {
        let searchEle=[...mainData]
        let res= searchEle.filter(todo=>
        {
          return ( (searchObj.title ? todo.title.toLowerCase().includes(searchObj.title.toLowerCase()) : true) && ( searchObj.isPending ? todo.isPending === searchObj.isPending : true ) && ( searchObj.periority ? todo.periority === searchObj.periority : true ) )
          
        })
        return res
      }
      else{
        return mainData
      }
    }
  
  return (
    <>
    <div>
       
        <div className='border border-5 border mt-4 rounded-top-2'>
        <h5 className='text-center text-secondary mt-2'><u>Table List</u></h5>
         <SearchElement handleSearch={handleSearch}  clearSearch={clearSearch} searchObj={searchObj}/>
        <div className='mt-4'>
           <button className='btn btn-secondary ms-1' onClick={handleArchieved}>Archieved</button>
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
                    mainData.length!=0 && searchData().slice(allData,allData+parPagedata).map((data,index)=>{   
                        return (
                             <tr key={data.id}>
                            <td>{data.id1}</td>
                            <td>{data.title}</td>
                            <td className={data.periority=="high"? "text-danger":data.periority=="low" ? "text-info":"text-warning"}>{data.periority}</td>
                            <td>{
                                
                                render ? 
                                <input type="checkbox" checked={data.isPending=="completed"}  key={data.id+'1'} onChange={()=>handleChange(data.id,index)}/>
                                :
                                <input type="checkbox" checked={data.isPending=="completed"}  key={data.id+'2'} onChange={()=>handleChange(data.id,index)}/>

                                }</td>
                            <td>{data.isPending}</td>
                            { data.isPending!="completed" &&
                            <td><button className='btn btn-danger' onClick={()=>handleDelete(data.id)}>Delete</button></td>
                           }
                    </tr>
                    )})
                }
           
            </tbody>
        </table>
        <div className='peginationParent'>
          <ReactPaginate
           pageCount={pageCount}
           onPageChange={handlePageChange}
           className='pagination gap-4'
           activeClassName='activepage'/>
           </div>
        </div>
    </div>
    
    </>
  )
}

export default memo(TableField)