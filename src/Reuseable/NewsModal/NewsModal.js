import { Card, } from "@mui/material";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { collection, updateDoc, doc, addDoc, serverTimestamp, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import axios from 'axios'

const NewsModal = (props) => {
  // console.log(props.editData)
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user.email
  const [isPending, setIsPending] = useState(false)
  const userId = user.uid
  const [allUsers, setAllUsers] = useState();
  const [news, setNews] = useState(props.editData?.article)
  const date = new Date();
  // console.log(date)
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const dd = `${day}-${month}-${year}`

  // console.log(milliseconds)
  const handleSubmit = async (e) => {
    e.preventDefault();
    var milliseconds = (new Date).getTime();

    // console.log(news,userEmail,dd,userId)
    // try {
    //   const docRef = await addDoc(collection(db, "short_news"), {

    //     posted_on: dd,
    //     published_by: userEmail,
    //     news,
    //     posted_on_timestamp: milliseconds
    //   });

    //   console.log("Document written with ID: ", docRef.id);
    //   props.setCount(props.count + 1)
    //   alert("News added successfully")
    //   props.onCancel()
    // } catch (err) {
    //   props.setCount(props.count + 1)
    //   console.log(err);
    //   alert(err);
    //   props.onCancel()

    // }
    const uid=crypto.randomUUID(); 
    setIsPending(true);
    await addDoc(collection(db, "short_news"), {
      posted_on: dd,
      published_by: userEmail,
      news,
      posted_on_timestamp: milliseconds,
    })
   
    // await setDoc(doc(db,"short_news",uid),{
    //   posted_on: dd,
    //   published_by: userEmail,
    //   news,
    //   posted_on_timestamp: milliseconds,
    //   doc_id:uid
    // })
      .then(async(res) => {
        await axios.post("https://fcm.googleapis.com/fcm/send", {
          "notification": {
            "title": "News",
            "body": "Hey there, a new news is added.",
            "click_action": "http://localhost:3000/",
            "icon": "http://url-to-an-icon/icon.png"
          },
          "registration_ids": allUsers
        }, {
          headers: {
            "Content-Type": "application/json",
             "Authorization": process.env.REACT_APP_MESSAGING_KEY
          }
        }).then((res) => {
          console.log(res);
          props.setCount(props.count + 1)
          alert("News added successfully")
          props.onCancel()
        }).catch((err) => {
          props.setCount(props.count + 1)
          console.log(err);
          alert(err);
          props.onCancel()
        })

      }).catch((err) => {
        props.setCount(props.count + 1)
        console.log(err);
        alert(err);
        props.onCancel()

      }).finally(()=>{
        setIsPending(false);
      })

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

  const handleUpdate = async () => {
    // console.log(props)
    var milliseconds = (new Date).getTime();

    // const docRef = doc(db, "short_news", props.editData.ID)
    const docRef = doc(db, "short_news", props.editData.more.props.doc_id)

  
    setIsPending(true);
    await updateDoc(docRef, {
      news: news,
      posted_on_timestamp: milliseconds,
    })
      .then((res) => {
        console.log(res);
        props.setCount(props.count + 1)
        alert("updated successfully")
        props.onCancel()

      }).catch((err) => {
        console.log(err);
        alert(err);
        props.onCancel()
      }).finally(()=>{
        setIsPending(false);
      })
  }
  useEffect(() => {
    const getUser = async () => {
      setIsPending(true)
      await getDocs(collection(db, "userProfile"))
        .then((querySnapshot) => {
          let arr = []
          querySnapshot.forEach((doc) => {
            let data = doc.data();
            // console.log(data)
            arr.push(data.fcm_token)
          });
          setAllUsers(arr);
          setIsPending(false)

        })
        .catch((e) => {
          setIsPending(false)

          console.log(e)
        });
    }
    getUser();
  }, [])
  // console.log(allUsers)
  return (
    <form onSubmit={handleSubmit}>
      <Card sx={{ p: 3 }} className="Newsmodal">
        <div className="row user-tabs">
          <h4>Add News</h4>
          <span className="crossBtn" onClick={props.onCancel}><b>X</b></span>
        </div>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={8}
          value={news}
          onChange={(e) => {
            setNews(e.target.value)
          }}
          placeholder=""
          style={{ width: 500 }}
        />
        <div className="row complaints-btn ">
          {props.forWhat ?
            <Button variant="contained" sx={save}
              type="button"
              disabled={isPending}
              onClick={handleUpdate}>
              Update
            </Button> :
            <Button variant="contained" sx={save}
              type="submit" disabled={isPending}>
              Save
            </Button>
          }
          <Button variant="outlined" type="button" sx={cancel} onClick={props.onSave}>
            Cancel
          </Button>

        </div>
      </Card>
    </form>
  );
};

export default NewsModal;