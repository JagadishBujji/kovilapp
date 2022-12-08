// import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import axios from "axios";


const MiniModal = (props) => {
    // console.log(props)
    // console.log(props.data.doc_id)
    const date = new Date().getDate();
    const [data, setData] = useState();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const currentDate = `${date}-${month}-${year}`;
    // const newFeedBack = `${currentDate} , ${props.feedBack}`
    const newFeedBack = {
        date: currentDate,
        msg: props.feedBack
    }
    // console.log(newFeedBack)
    const handleClick = async () => {
        const docRef = doc(db, "Complaints", props.data.doc_id)
        if (props.data.allFeedbacks) {
            console.log("feedback exits")
            console.log(props.data.allFeedbacks)
            const exisitingFB = props.data.allFeedbacks;
            exisitingFB.push(newFeedBack)
            console.log(exisitingFB)
            try {
                await updateDoc(docRef, {
                    allFeedbacks: exisitingFB
                })
                    .then(async () => {
                        await axios.post("https://fcm.googleapis.com/fcm/send", {
                            "notification": {
                                "title": "Feedback",
                                "body": "Hey buddy, a new feedback is added to your ticket",
                                "click_action": "http://localhost:3000/",
                                "icon": "http://url-to-an-icon/icon.png"
                            },
                            "to": data.fcm_token
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                 "Authorization": process.env.REACT_APP_MESSAGING_KEY
                            }
                        }).then((res) => {
                            console.log(res);
                            props.setCount(props.count + 1)
                            alert("feedback added successfully")
                            props.closeAllModal()
                        }).catch((err) => {
                            console.log(err.response);
                        })
                    })

            } catch (err) {
                console.log(err);
                props.setCount(props.count + 1)
                alert("error occured")
                props.closeAllModal()
            }

        }
        else {
            console.log("feedback not present")
            const fb = [newFeedBack]
            // await updateDoc(docRef,{
            //     allFeedbacks:fb
            // }).then((res)=>{
            //     console.log(res)
            // }).catch((err)=>{
            //     console.log(err)
            // })
            try {
                await updateDoc(docRef, {
                    allFeedbacks: fb
                }).then(async () => {



                    await axios.post("https://fcm.googleapis.com/fcm/send", {
                        "notification": {
                            "title": "Feedback",
                            "body": "Hey buddy, a new feedback is added to your ticket",
                            // "click_action": "http://localhost:3000/",
                            "click_action": "FLUTTER_NOTIFICATION_CLICK",
                            "icon": "http://url-to-an-icon/icon.png",
                            "notification_type":"Feedback"

                        },
                        "to":data.fcm_token
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            // "Authorization": "key=AAAAujeDNFk:APA91bFTPFchdLLWS_6Tp4LsLe14M8QX9pvLOMfUv9ILl-l3O7SGCRuVSbaOsqZvNrYRlxlRc22ygeOxHXN_85SxPsOKZG6l7H3l9WRbHJ3LWJHypuFM6kwPeZhcKTMlgnMx85tNHDt-"
                            "Authorization": process.env.REACT_APP_MESSAGING_KEY
                        }
                    }).then((res) => {
                        console.log(res);
                        props.setCount(props.count + 1)
                        alert("feedback added successfully")
                        props.closeAllModal()
                    }).catch((err) => {
                        console.log(err.response);
                    })

                })

            } catch (err) {
                console.log(err);
                props.setCount(props.count + 1)
                alert("error occured")
                props.closeAllModal()
            }
        }
    }
    useEffect(() => {
        const getUser = async () => {
            // console.log(props.data.user_uid)
            const docRef = doc(db, "userProfile", props.data.user_uid)
            try {
                const docSnap = await getDoc(docRef);
                // console.log(docSnap.data())
                //   console.log(docSnap.data());
                setData(docSnap.data());
            } catch (err) {
                alert("Invalid user id")
                console.log(err)
            }
        }
        getUser();
    }, [])
    // console.log(data);
    return (
        <div className="Minimodal">
            <p>Submit Feedback?</p>

            {data && <button className="btn" onClick={handleClick}>Confirm</button>}
            {/* <button className="btn" onClick={props.onCancel}>Confirm</button> */}
            <button className="cancelButton" onClick={props.onCancel}>Cancel</button>
        </div>
    )
}
export default MiniModal;
