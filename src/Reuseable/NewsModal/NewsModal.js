import { Card, } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
import { useState } from "react";
import { collection,updateDoc,doc, addDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from "../../services/firebase";

const NewsModal = (props) => {
  console.log(props.editData)
  const user=JSON.parse(localStorage.getItem("user"));
  const userEmail=user.email
  const userId=user.uid
  const [news,setNews]=useState(props.editData?.article)
  const date=new Date();
  // console.log(date)
  const day=date.getDate();
  const month=date.getMonth();
  const year=date.getFullYear();
  const dd=`${day}-${month}-${year}`
  const handleSubmit=async(e)=>{
    e.preventDefault();
    // console.log(news,userEmail,dd,userId)
    try{
      const docRef = await addDoc(collection(db, "short_news"), {
  
        posted_on:dd,
        published_by:userEmail,
        news,
        created_at:serverTimestamp()
      });
      console.log("Document written with ID: ", docRef.id);
      props.setCount(props.count+1)
      alert("News added successfully")
      props.onCancel()
    }catch(err){
      props.setCount(props.count+1)
      console.log(err);
      alert(err);
      props.onCancel()

    }

// Add a new document with a generated id.

  }
  const save = {
    backgroundColor: "#f17116",
    color: "#fff",
    m: 2,
    "&:hover": {
      backgroundColor: "#f17116",
      color: "#fff",
    },

  };

  const cancel = {
    borderColor: "#f17116",
    color: "#f17116",
    m: 2,
    "&:hover": {
        borderColor: "#f17116",
      color: "#f17116",
    },

  };
  const handleUpdate=async()=>{
    const docRef=doc(db,"short_news",props.editData.ID)
   
    await updateDoc(docRef,{
      news:news
    })
    .then((res)=>{
      console.log(res);
      props.setCount(props.count+1) 
      alert("updated successfully")
      props.onCancel()

    }).catch((err)=>{
      console.log(err);
      alert(err);
      props.onCancel()
    })
  }
  return (
    <form onSubmit={handleSubmit}>
    <Card sx={{ p: 3 }} className="Newsmodal">
        <div className="row user-tabs">
        <h4>Add News</h4>
        <span className = "crossBtn" onClick={props.onCancel}><b>X</b></span>
      </div>
      <TextareaAutosize
      aria-label="minimum height"
      minRows={8}
      value={news}
      onChange={(e)=>{
        setNews(e.target.value)
      }}
      placeholder=""
      style={{ width: 500 }}
    />
      <div className="row complaints-btn ">
      {props.forWhat? 
      <Button variant="contained" sx={save} 
      type="button" onClick={handleUpdate}>
       Update
     </Button>:
     <Button variant="contained" sx={save} 
        type="submit">
          Save
        </Button>
        }
        <Button variant="outlined"  type="button" sx={cancel} onClick={props.onSave}>
          Cancel
        </Button>

      </div>
    </Card>
    </form>
  );
};

export default NewsModal;