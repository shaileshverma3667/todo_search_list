import React from 'react'

const ArchiveField = ({archieveData,mainData,setMainData,setArchieveData,setShowArchive}) => {
    const CompleteChange=(id)=>{
     let item= archieveData.find((data)=>data.id==id)
       setMainData([...mainData,item])
     const filterData=archieveData.filter((data)=>data.id!=id)
      setArchieveData(filterData)
    }
  return (
    <>
    <div className='card bg-secondary'>
      <div className='card-header text-center fs-4 text-white'>Archive Data</div>
      <div className='card-body m-0 p-0'>
      <table className='table table-striped table-bordered mt-4'>
            <thead >
                <tr id="">
                <th>Sr.No</th>
                <th>UnArcibe</th>
                <th>Title</th>
                <th>periority</th>
                <th>Change Status</th>
                <th>Status</th> 
                </tr>
            </thead>
            <tbody>
                {
                      archieveData.length!=0 && archieveData.map((data,index)=>{   
                        return (
                             <tr key={data.id}>
                            <td>{data.id1}</td>
                            <td><input type="checkbox" onChange={()=>CompleteChange(data.id,index)}/></td>
                            <td>{data.title}</td>
                            <td className={data.periority=="high"? "text-danger":data.periority=="low" ? "text-info":"text-warning"}>{data.periority}</td>
                            <td>{ <input type="checkbox" checked={data.isPending=="completed"}  key={data.id+'1'}/> }</td>
                            <td>{data.isPending}</td>
                           
                    </tr>
                    )})
                }
           
            </tbody>
        </table>
        
      </div>
      <div className='card-footer'>
        <button className='btn btn-warning float-end' onClick={()=>setShowArchive(false)}>Back</button>
      </div>
    </div>
    </>
  )
}

export default ArchiveField