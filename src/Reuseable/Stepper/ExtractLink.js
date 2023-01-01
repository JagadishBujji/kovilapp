 

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
//    console.log(tag)
   return tag
}

 

export const ExtractText=(text)=>{ 
    // console.log(text);
    if(text)
    {
    let original=text.props.dangerouslySetInnerHTML.__html
    const fs=original.split(" ");  
    let ff=""
     for(var i=1;i<fs.length-1;i++)
     {
        ff=ff+" "+fs[i];
     }
     let kf=ff.split(" ") 
     let of="";
     kf.forEach((fa)=>{
        if(fa==="</a>" || fa==="<a")
        {

        }
        else{
            of=of+" "+fa
        }
     }) 
     let vf=of.split(" ") 
     let qq=""
     vf.forEach((xx,index)=>{ 
        if(xx.includes("href=") || xx.includes("target="))
        {
            // console.log(index)
        }
        else{
            qq=qq+" "+xx
        }
     })
     let gf=qq.toString();
     const final=gf.trim()  
      
    return final
    }
 }

