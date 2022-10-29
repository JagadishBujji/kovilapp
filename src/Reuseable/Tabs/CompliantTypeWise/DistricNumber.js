
 
export const getDistrictTotal=(type,tickets)=>{

    // console.log(type)
    // console.log(tickets)
    let evals=[]
    let temples=[] 
    
    for(let j=0;j<type.length;j++)
    {
        const specific=type[j].toLowerCase(); 
        let dd=[] 
        let tep=[]
       tickets.map((tck)=>{
       
            if(tck.complaint_type.toLowerCase()===specific)
            {
                dd.push(tck.district) 
                tep.push(tck.temple_name)
            }
           
        })  
        const fd=removeDuplicates(dd)
        const neA={
            specific,
            fd,
            tep
        }  
        evals.push(neA) 
    } 
    console.log(evals)
    let lod=[]
    evals.map((ev)=>{
        let obj={
            complaint_type:ev.specific,
            districtTotal:ev.fd.length,
            templeTotal:ev.tep.length
        }
        lod.push(obj)
    })
    // const tod={
    //     complaintType:evals.specific,
    //     districtTotal:evals.fd?.length,
    //     templesTotal:evals.tep?.length
    // }
    console.log(lod)
    return lod
}

 const removeDuplicates=(arr)=>{
    const uniqueArray=arr.filter((item,ind)=>{
        return arr.indexOf(item)==ind
    })
    return uniqueArray
}