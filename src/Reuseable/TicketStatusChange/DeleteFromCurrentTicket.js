export const deleteFromCurrentTicket=(arr,doc_id)=>{
    // console.log(arr,doc_id)
    const newArr=arr.filter((ar)=>{
        if(ar.doc_id!==doc_id){
            return ar;
        }
    })
    return newArr
    // console.log(newArr)
}

export const addToClosedTicket=(arr,data)=>{
    // console.log(arr,data);
    if(arr)
    {
        const newArr=[...arr,data]
        return newArr;
    }
    else{
        const newArr=[data]
        // console.log(newArr)
        return newArr;
    }
}