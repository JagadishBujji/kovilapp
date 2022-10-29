import { useEffect, useState } from "react";
const ImageModal = (props) => {
    const [fileType,setFileType]=useState()

    console.log(props)
    useEffect(()=>{
        const file=props.source
        const arr=file.split(".")
        const extension=arr[arr.length-1]
        console.log(extension)
        if(extension==="jpg" || extension==="png"){
            setFileType("Image")
        }
        else if(extension==="mp4")
        {
            setFileType("Video")
        }
        else if(extension==="mp3")
        {
            setFileType("audio")
        }
    },[])
   
  return (
    <div id="myModal" className="Imagemodal">
      <span className="closed" onClick={props.onCancel}>X</span>
      {fileType==="Image" && <img src={props.source} className="modal-content" id="img01" />}
      {fileType==="Video" && <center><video controls><source src={props.source} className="modal-content"/></video></center>}
      {fileType==="audio" && <center><audio controls><source src={props.source} className="modal-content"/></audio></center>}
      <div id="caption"></div>
    </div>
  );
};

export default ImageModal;
