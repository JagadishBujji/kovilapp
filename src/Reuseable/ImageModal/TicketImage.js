import { useState,useEffect} from "react";
import ImageModal from "./ImageModal";

const TicketImage = (props) => {
  const [openImg, setOpenImg] = useState(false);

  const imageHandler = () => {
    setOpenImg(true);
  };

  const closeModal = () => {
    setOpenImg(false);
  };

  const [fileType,setFileType]=useState()

  console.log(props)
  useEffect(()=>{
      const file=props.source
      const arr=file.split(".")
      const extension=arr[arr.length-1]
      console.log(extension)
      if(extension==="jpg" || extension==="png"){
          setFileType("image")
      }
      else if(extension==="mp4")
      {
          setFileType("video")
      }
      else if(extension==="mp3")
      {
          setFileType("audio")
      }
  },[])

  return (
    <>
      <div>
        {fileType === "image" && <img
          src={props.source}
          alt=""
          className="myImg"
          style={{ width: "80px", height:"80px" }}
          onClick={imageHandler}
        />}
         {fileType === "video" && <img
          src="/images/playbtn.png"
          alt=""
          className="myImg"
          style={{ width: "80px", height:"80px" }}
          onClick={imageHandler}
        />}
         {fileType === "audio" && <img
          src="/images/headphones.png"
          alt=""
          className="myImg"
          style={{ width: "80px", height:"80px" }}
          onClick={imageHandler}
        />}
      </div>
      {openImg && <ImageModal  onCancel={closeModal} source={props.source}/>}
    </>
  );
};

export default TicketImage;
