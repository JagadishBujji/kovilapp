 

export const ExtractLink=(text)=>{ 
   const fs=text.split(" "); 
   let tag="<p>"
   fs.forEach((f)=>{
    if(f.includes("http"))
    { 
        let fd=`<a href=${f} target="_blank"> ${f} </a>`
        tag=`${tag} ${fd}`
    }
    else{
        tag=`${tag} ${f}`
    }

   })
   tag=`${tag} </p>`
   console.log(tag)
   return tag
}