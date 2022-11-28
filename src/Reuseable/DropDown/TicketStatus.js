
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useEffect } from 'react';
import { addToClosedTicket, deleteFromCurrentTicket } from '../TicketStatusChange/DeleteFromCurrentTicket';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function BasicSelect({ data, count, setCount }) {
    const [status, setStatus] = React.useState('');
    const admin = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    // console.log(admin)
    const [ticUser, setTicUser] = React.useState();
    console.log(ticUser)
    const [now,setNow]=React.useState()
    console.log(data)
    const [superAdmin,setSuperAdmin]=React.useState()
    const subadmin = JSON.parse(localStorage.getItem("subadmin"));
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    // console.log(data);
    // await axios.post("https://fcm.googleapis.com/fcm/send", {
    //     "notification": {
    //         "title": "Status",
    //         "body": "Hey buddy, a new feedback is added to your ticket",
    //         "click_action": "http://localhost:3000/",
    //         "icon": "http://url-to-an-icon/icon.png"
    //     },
    //     "to": data.fcm_token
    // }, {
    //     headers: {
    //         "Content-Type": "application/json",
    //          "Authorization": process.env.REACT_APP_MESSAGING_KEY
    //     }
    // }).then((res) => {
    //     console.log(res);
    //     props.setCount(props.count + 1)
    //     alert("feedback added successfully")
    //     props.closeAllModal()
    // }).catch((err) => {
    //     console.log(err.response);
    // })
    useEffect(() => {
        const getUser = async () => {
            // console.log(data.user_uid)
            const docRef = doc(db, "userProfile", data.user_uid)
            try {
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data())
                //   console.log(docSnap.data());
                setTicUser(docSnap.data());
            } catch (err) {
                alert("Invalid user id")
                console.log(err)
            }
        }
        getUser();
    }, [])
    console.log(ticUser)
    const [ad, setAd] = React.useState();
    useEffect(() => {
        if (subadmin) {
            const getAdmin = async () => {
                const dR = doc(db, "admins", subadmin?.uid);
                await getDoc(dR)
                    .then((docSnap) => {
                        const data = docSnap.data()
                        setAd(data)
                    }).catch((err) => {
                        console.log(err);
                    })
            }
            getAdmin()
        }
        else {
            const getAdmin = async () => {
                const dR = doc(db, "admins", admin?.uid);
                await getDoc(dR)
                    .then((docSnap) => {
                        const data = docSnap.data()
                        setAd(data)
                    }).catch((err) => {
                        console.log(err);
                    })
            }
            const getAdmin2 = async () => {
                const dR = doc(db, "admins", data?.sub_admin_uid);
                await getDoc(dR)
                    .then((docSnap) => {
                        const data = docSnap.data()
                        setNow(data);
                    }).catch((err) => {
                        console.log(err);
                    })
            }
            getAdmin2()


            getAdmin()
        }
    }, []) 


    useEffect(()=>{
        const getSuperAdmin=async()=>{
            const docRef=collection(db,"admins");
            const q=query(docRef,where("user_name","==","super admin"));
            const  querySnapshot=await getDocs(q);
             querySnapshot.forEach((doc)=>{
                // console.log(doc.data())
                const document=doc;
                const obj={
                    doc_id:document.id,
                    ...document.data()
                }
                console.log(obj)
                setSuperAdmin(obj)
            })
        }
        getSuperAdmin();
    },[])


    //   if(ad)
    //   {
    //     console.log(deleteFromCurrentTicket(ad.current_ticket,data.doc_id))
    //     console.log(addToClosedTicket(ad.closed_ticket,data))
    //   }
    const [isPending, setIsPending] = React.useState(false);
    console.log(ad);
 

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (subadmin) {

//             const docRef = doc(db, "Complaints", data.doc_id);
//             const docRef2 = doc(db, "admins", subadmin.uid);
//             if (status === "In-Progress") {
//                 setIsPending(true)
//                 await updateDoc(docRef, {
//                     status: "In-Progress",
//                 }).then((res) => {
//                     if (ad.current_ticket) {
//                         setIsPending(true)

//                         updateDoc(docRef2, {
//                             current_ticket: [...ad.current_ticket, data]
//                         }).then(async (res) => {

//                             await axios.post("https://fcm.googleapis.com/fcm/send", {
//                                 "notification": {
//                                     "title": "Status-Inprogress",
//                                     "body": "Hey buddy, your ticket is Inprogress.",
//                                     "click_action": "http://localhost:3000/",
//                                     "icon": "http://url-to-an-icon/icon.png"
//                                 },
//                                 "to": ticUser.fcm_token
//                             }, {
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                     "Authorization": process.env.REACT_APP_MESSAGING_KEY
//                                 }
//                             }).then((res) => {

                                
//                                 const apikey= process.env.REACT_APP_SMS_API_KEY 
//                             const mobile=Number(ad.phone_number )
//                             const sender = 'KVLAPP';  
//                             const username=String(ad.first_name) 
//                             const tno=data.doc_id
//                             const status="In-Progress" 
//                             var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//                             var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
//                             fetch(url).then(response => response.json()).then(data1 => {
//                                 console.log(data1)
//                                 const apikey= process.env.REACT_APP_SMS_API_KEY 
//                                 const mobile=Number(data.user_mobile_number )
//                                 const sender = 'KVLAPP';  
//                                 const username=String(data.user_name) 
//                                 const tno=data.doc_id
//                                 const status="In-Progress"
//   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

//                                 // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//                                 var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
//                                 fetch(url).then(response => response.json()).then(data2 => {
                                    
                                    
    
//                                   setIsPending(false)
//                                   console.log(data2);
                              
//                                   alert("Status updated")
//                                   setCount(count + 1);
//                                   navigate("/kovil/tickets")
//                                 });
 
//                             });
 
//                             }).catch((err) => {
//                                 setIsPending(false)

//                                 console.log(err.response);
//                             })


//                         }).catch((err) => {
//                             setIsPending(false)

//                             alert(err)
//                             console.log(err)
//                         })
//                     } else {
//                         setIsPending(true)

//                         updateDoc(docRef2, {
//                             current_ticket: [data]
//                         }).then(async (res) => {

//                             await axios.post("https://fcm.googleapis.com/fcm/send", {
//                                 "notification": {
//                                     "title": "Status-Inprogress",
//                                     "body": "Hey buddy, your ticket is Inprogress.",
//                                     "click_action": "http://localhost:3000/",
//                                     "icon": "http://url-to-an-icon/icon.png"
//                                 },
//                                 "to": ticUser.fcm_token
//                             }, {
//                                 headers: {
//                                     "Content-Type": "application/json",
//                                     "Authorization": process.env.REACT_APP_MESSAGING_KEY
//                                 }
//                             }).then((res) => {

//                                 const apikey= process.env.REACT_APP_SMS_API_KEY 
//                             const mobile=Number(ad.phone_number )
//                             const sender = 'KVLAPP';  
//                             const username=String(ad.first_name) 
//                             const tno=data.doc_id
//                             const status="In-Progress" 
//                             var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//                             var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
//                             fetch(url).then(response => response.json()).then(data1 => {
//                                 console.log(data1)
//                                 const apikey= process.env.REACT_APP_SMS_API_KEY 
//                                 const mobile=Number(data.user_mobile_number )
//                                 const sender = 'KVLAPP';  
//                                 const username=String(data.user_name) 
//                                 const tno=data.doc_id
//                                 const status="In-Progress" 
//   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

//                                 // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//                                 var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
//                                 fetch(url).then(response => response.json()).then(data2 => {
                                              
//                                   setIsPending(false)
//                                   console.log(data2);
                                            
//                                   alert("Status updated")
//                                   setCount(count + 1);
//                                   navigate("/kovil/tickets")
//                                 });
//                             });
 
//                             }).catch((err) => {
//                                 setIsPending(false)

//                                 console.log(err.response);
//                             })



//                         }).catch((err) => {
//                             setIsPending(false)

//                             alert(err)
//                             console.log(err)
//                         })
//                     }
//                 }).catch((err) => {
//                     setIsPending(false)
//                     alert(err);
//                 })

//             }
//             if (status === "Closed") {
//                 const cc = deleteFromCurrentTicket(ad.current_ticket, data.doc_id)
//                 const ct = addToClosedTicket(ad.closed_ticket, data)
//                 setIsPending(true)

//                 await updateDoc(docRef, {
//                     status: "Closed",
//                 }).then((res) => {
//                     setIsPending(true)

//                     updateDoc(docRef2, {
//                         current_ticket: cc,
//                         closed_ticket: ct
//                     }).then(async (res) => {

//                         await axios.post("https://fcm.googleapis.com/fcm/send", {
//                             "notification": {
//                                 "title": "Status-Closed",
//                                 "body": "Hey buddy, your ticket is closed",
//                                 "click_action": "http://localhost:3000/",
//                                 "icon": "http://url-to-an-icon/icon.png"
//                             },
//                             "to": ticUser.fcm_token
//                         }, {
//                             headers: {
//                                 "Content-Type": "application/json",
//                                 "Authorization": process.env.REACT_APP_MESSAGING_KEY
//                             }
//                         }).then((res) => {
//                             const apikey= process.env.REACT_APP_SMS_API_KEY 
//                             const mobile=Number(ad.phone_number )
//                             const sender = 'KVLAPP';  
//                             const username=String(ad.first_name) 
//                             const tno=data.doc_id
//                             const status="Closed" 
//                             var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//                             var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
//                             fetch(url).then(response => response.json()).then(data1 => {
//                                 console.log(data1)
//                                 const apikey= process.env.REACT_APP_SMS_API_KEY 
//                                 const mobile=Number(data.user_mobile_number )
//                                 const sender = 'KVLAPP';  
//                                 const username=String(data.user_name) 
//                                 const tno=data.doc_id
//                                 const status="Closed" 
//   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

//                                 // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//                                 var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
//                                 fetch(url).then(response => response.json()).then(data2 => {
                                              
//                                   setIsPending(false)
//                                   console.log(data2);
                                            
//                                   alert("Status updated")
//                                   setCount(count + 1);
//                                   navigate("/kovil/tickets")
//                                 });
//                             });
                             
//                         }).catch((err) => {
//                             console.log(err.response);
//                         setIsPending(false)

//                         })



//                     }).catch((err) => {
//                         setIsPending(false)

//                         alert(err);
//                     })
//                 }).catch((err) => {
//                     setIsPending(false)

//                     alert(err);
//                 })
//             }
//         }
//         else {
//             console.log(data.doc_id)
//             const docRef = doc(db, "Complaints", data.doc_id);
//             if (status === "In-Progress") {
//                 setIsPending(true)
//                 await updateDoc(docRef, {
//                     status: "In-Progress",
//                 }).then(async (res) => {
//                     await axios.post("https://fcm.googleapis.com/fcm/send", {
//                         "notification": {
//                             "title": "Status-Inprogress",
//                             "body": "Hey buddy, your ticket is Inprogess",
//                             "click_action": "http://localhost:3000/",
//                             "icon": "http://url-to-an-icon/icon.png"
//                         },
//                         "to": ticUser.fcm_token
//                     }, {
//                         headers: {
//                             "Content-Type": "application/json",
//                             "Authorization": process.env.REACT_APP_MESSAGING_KEY
//                         }
//                     }).then((res) => { 
//   const apikey= process.env.REACT_APP_SMS_API_KEY 
//   const mobile=Number(now.phone_number )
//   const sender = 'KVLAPP';  
//   const username=String(now.first_name) 
//   const tno=data.doc_id
//   const status="In-Progress" 
//   var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//   var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
//   fetch(url).then(response => response.json()).then(data1 => {
//     console.log(data1)
//                                 const apikey= process.env.REACT_APP_SMS_API_KEY 
//                                 const mobile=Number(data.user_mobile_number )
//                                 const sender = 'KVLAPP';  
//                                 const username=String(data.user_name) 
//                                 const tno=data.doc_id
//                                 const status="In-Progress" 
//   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

//                                 // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//                                 var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
//                                 fetch(url).then(response => response.json()).then(data2 => {
                                              
//                                   setIsPending(false)
//                                   console.log(data2);
                                            
//                                   alert("Status updated")
//                                   setCount(count + 1);
//                                   navigate("/kovil/tickets")
//                                 });
//   });

             
//                     }).catch((err) => {
//                         console.log(err.response);
//                         setIsPending(false)

//                     })


//                 }).catch((err) => {
//                     setIsPending(false)
//                     alert(err);
//                 })

//             }
//             if (status === "Closed") {
//                 setIsPending(true)
//                 await updateDoc(docRef, {
//                     status: "Closed",
//                 }).then(async(res) => {

//                     await axios.post("https://fcm.googleapis.com/fcm/send", {
//                         "notification": {
//                             "title": "Status-Closed",
//                             "body": "Hey buddy, your ticket is closed",
//                             "click_action": "http://localhost:3000/",
//                             "icon": "http://url-to-an-icon/icon.png"
//                         },
//                         "to": ticUser.fcm_token
//                     }, {
//                         headers: {
//                             "Content-Type": "application/json",
//                             "Authorization": process.env.REACT_APP_MESSAGING_KEY
//                         }
//                     }).then((res) => {

//                         const apikey= process.env.REACT_APP_SMS_API_KEY 
//   const mobile=Number(now.phone_number )
//   const sender = 'KVLAPP';  
//   const username=String(now.first_name) 
//   const tno=data.doc_id
//   const status="Closed" 
//   var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//   var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
//   fetch(url).then(response => response.json()).then(data1 => {
                
//     console.log(data1)
//     const apikey= process.env.REACT_APP_SMS_API_KEY 
//     const mobile=Number(data.user_mobile_number )
//     const sender = 'KVLAPP';  
//     const username=String(data.user_name) 
//     const tno=data.doc_id
//     const status="Closed" 
// var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

//     // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
//     var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
//     fetch(url).then(response => response.json()).then(data2 => {
                  
//       setIsPending(false)
//       console.log(data2);
                
//       alert("Status updated")
//       setCount(count + 1);
//       navigate("/kovil/tickets")
//     });
//   });

 
//                     }).catch((err) => {
//                         setIsPending(false)

//                         console.log(err.response);
//                     })
                 

//                 }).catch((err) => {
//                     setIsPending(false)
//                     alert(err);
//                 })
//             }
//         }
//     }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (subadmin) {

            const docRef = doc(db, "Complaints", data.doc_id);
            const docRef2 = doc(db, "admins", subadmin.uid);
            if (status === "In-Progress") {
                setIsPending(true)
                await updateDoc(docRef, {
                    status: "In-Progress",
                }).then((res) => {
                    if (ad.current_ticket) {
                        setIsPending(true)

                        updateDoc(docRef2, {
                            current_ticket: [...ad.current_ticket, data]
                        }).then(async (res) => {

                            await axios.post("https://fcm.googleapis.com/fcm/send", {
                                "notification": {
                                    "title": "Status-Inprogress",
                                    "body": "Hey buddy, your ticket is Inprogress.",
                                    "click_action": "http://localhost:3000/",
                                    "icon": "http://url-to-an-icon/icon.png"
                                },
                                "to": ticUser.fcm_token
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": process.env.REACT_APP_MESSAGING_KEY
                                }
                            }).then((res) => {

                                
                                const apikey= process.env.REACT_APP_SMS_API_KEY 
                            const mobile=Number(ad.phone_number )
                            const sender = 'KVLAPP';  
                            const username=String(ad.first_name) 
                            const tno=data.doc_id
                            const status="In-Progress" 
                            var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                            var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
                            fetch(url).then(response => response.json()).then(data1 => {
                                console.log(data1)
                                const apikey= process.env.REACT_APP_SMS_API_KEY 
                                const mobile=Number(data.user_mobile_number )
                                const sender = 'KVLAPP';  
                                const username=String(data.user_name) 
                                const tno=data.doc_id
                                const status="In-Progress"
  var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

                                // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
                                fetch(url).then(response => response.json()).then(data2 => {
                                    console.log(data2)
                                    const apikey= process.env.REACT_APP_SMS_API_KEY 
                                const mobile=Number(superAdmin?.phone_number )
                                const sender = 'KVLAPP';  
                                const username=String(superAdmin?.user_name) 
                                const tno=data.doc_id
                                const status="In-Progress"
//   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'
var mms='Dear '+username+', ticket no '+tno+' status has been changed to '+status+' - KovilApp Team'

                                // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(mms);
                                fetch(url).then(response => response.json()).then(data3 => {
                                      setIsPending(false)
                                  console.log(data3);
                              
                                  alert("Status updated")
                                  setCount(count + 1);
                                  navigate("/kovil/tickets")
                                }).catch((err)=>{
                                    console.log(err)
                                })


    
                                
                                });
 
                            });
 
                            }).catch((err) => {
                                setIsPending(false)

                                console.log(err.response);
                            })


                        }).catch((err) => {
                            setIsPending(false)

                            alert(err)
                            console.log(err)
                        })
                    } else {
                        setIsPending(true)

                        updateDoc(docRef2, {
                            current_ticket: [data]
                        }).then(async (res) => {

                            await axios.post("https://fcm.googleapis.com/fcm/send", {
                                "notification": {
                                    "title": "Status-Inprogress",
                                    "body": "Hey buddy, your ticket is Inprogress.",
                                    "click_action": "http://localhost:3000/",
                                    "icon": "http://url-to-an-icon/icon.png"
                                },
                                "to": ticUser.fcm_token
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": process.env.REACT_APP_MESSAGING_KEY
                                }
                            }).then((res) => {

                                const apikey= process.env.REACT_APP_SMS_API_KEY 
                            const mobile=Number(ad.phone_number )
                            const sender = 'KVLAPP';  
                            const username=String(ad.first_name) 
                            const tno=data.doc_id
                            const status="In-Progress" 
                            var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                            var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
                            fetch(url).then(response => response.json()).then(data1 => {
                                console.log(data1)
                                const apikey= process.env.REACT_APP_SMS_API_KEY 
                                const mobile=Number(data.user_mobile_number )
                                const sender = 'KVLAPP';  
                                const username=String(data.user_name) 
                                const tno=data.doc_id
                                const status="In-Progress" 
  var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

                                // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
                                fetch(url).then(response => response.json()).then(data2 => {
                                              console.log(data2);
                                    const apikey= process.env.REACT_APP_SMS_API_KEY 
                                    const mobile=Number(superAdmin?.phone_number )
                                    const sender = 'KVLAPP';  
                                    const username=String(superAdmin?.user_name) 
                                    const tno=data.doc_id
                                    const status="In-Progress"
    //   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'
    var mms='Dear '+username+', ticket no '+tno+' status has been changed to '+status+' - KovilApp Team'
    
                                    // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                    var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(mms);
                                    fetch(url).then(response => response.json()).then(data3 => {
                                          setIsPending(false)
                                      console.log(data3);
                                  
                                      alert("Status updated")
                                      setCount(count + 1);
                                      navigate("/kovil/tickets")
                                    }).catch((err)=>{
                                        console.log(err)
                                    })
                                });
                            });
 
                            }).catch((err) => {
                                setIsPending(false)

                                console.log(err.response);
                            })



                        }).catch((err) => {
                            setIsPending(false)

                            alert(err)
                            console.log(err)
                        })
                    }
                }).catch((err) => {
                    setIsPending(false)
                    alert(err);
                })

            }
            if (status === "Closed") {
                const cc = deleteFromCurrentTicket(ad.current_ticket, data.doc_id)
                const ct = addToClosedTicket(ad.closed_ticket, data)
                setIsPending(true)

                await updateDoc(docRef, {
                    status: "Closed",
                }).then((res) => {
                    setIsPending(true)

                    updateDoc(docRef2, {
                        current_ticket: cc,
                        closed_ticket: ct
                    }).then(async (res) => {

                        await axios.post("https://fcm.googleapis.com/fcm/send", {
                            "notification": {
                                "title": "Status-Closed",
                                "body": "Hey buddy, your ticket is closed",
                                "click_action": "http://localhost:3000/",
                                "icon": "http://url-to-an-icon/icon.png"
                            },
                            "to": ticUser.fcm_token
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": process.env.REACT_APP_MESSAGING_KEY
                            }
                        }).then((res) => {
                            const apikey= process.env.REACT_APP_SMS_API_KEY 
                            const mobile=Number(ad.phone_number )
                            const sender = 'KVLAPP';  
                            const username=String(ad.first_name) 
                            const tno=data.doc_id
                            const status="Closed" 
                            var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                            var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
                            fetch(url).then(response => response.json()).then(data1 => {
                                console.log(data1)
                                const apikey= process.env.REACT_APP_SMS_API_KEY 
                                const mobile=Number(data.user_mobile_number )
                                const sender = 'KVLAPP';  
                                const username=String(data.user_name) 
                                const tno=data.doc_id
                                const status="Closed" 
  var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

                                // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
                                fetch(url).then(response => response.json()).then(data2 => {
                                         console.log(data2)     
                                    const apikey= process.env.REACT_APP_SMS_API_KEY 
                                    const mobile=Number(superAdmin?.phone_number )
                                    const sender = 'KVLAPP';  
                                    const username=String(superAdmin?.user_name) 
                                    const tno=data.doc_id
                                    const status="Closed"
    //   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'
    var mms='Dear '+username+', ticket no '+tno+' status has been changed to '+status+' - KovilApp Team'
    
                                    // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                    var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(mms);
                                    fetch(url).then(response => response.json()).then(data3 => {
                                          setIsPending(false)
                                      console.log(data3);
                                  
                                      alert("Status updated")
                                      setCount(count + 1);
                                      navigate("/kovil/tickets")
                                    }).catch((err)=>{
                                        console.log(err)
                                    })
                                });
                            });
                             
                        }).catch((err) => {
                            console.log(err.response);
                        setIsPending(false)

                        })



                    }).catch((err) => {
                        setIsPending(false)

                        alert(err);
                    })
                }).catch((err) => {
                    setIsPending(false)

                    alert(err);
                })
            }
        }
        else {
            console.log(data.doc_id)
            const docRef = doc(db, "Complaints", data.doc_id);
            if (status === "In-Progress") {
                setIsPending(true)
                await updateDoc(docRef, {
                    status: "In-Progress",
                }).then(async (res) => {
                    await axios.post("https://fcm.googleapis.com/fcm/send", {
                        "notification": {
                            "title": "Status-Inprogress",
                            "body": "Hey buddy, your ticket is Inprogess",
                            "click_action": "http://localhost:3000/",
                            "icon": "http://url-to-an-icon/icon.png"
                        },
                        "to": ticUser.fcm_token
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": process.env.REACT_APP_MESSAGING_KEY
                        }
                    }).then((res) => { 
  const apikey= process.env.REACT_APP_SMS_API_KEY 
  const mobile=Number(now.phone_number )
  const sender = 'KVLAPP';  
  const username=String(now.first_name) 
  const tno=data.doc_id
  const status="In-Progress" 
  var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
  var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
  fetch(url).then(response => response.json()).then(data1 => {
    console.log(data1)
                                const apikey= process.env.REACT_APP_SMS_API_KEY 
                                const mobile=Number(data.user_mobile_number )
                                const sender = 'KVLAPP';  
                                const username=String(data.user_name) 
                                const tno=data.doc_id
                                const status="In-Progress" 
  var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

                                // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
                                fetch(url).then(response => response.json()).then(data2 => {
                                    console.log(data2)
                                    const apikey= process.env.REACT_APP_SMS_API_KEY 
                                    const mobile=Number(superAdmin?.phone_number )
                                    const sender = 'KVLAPP';  
                                    const username=String(superAdmin?.user_name) 
                                    const tno=data.doc_id
                                    const status="In-Progress"
    //   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'
    var mms='Dear '+username+', ticket no '+tno+' status has been changed to '+status+' - KovilApp Team'
    
                                    // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                    var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(mms);
                                    fetch(url).then(response => response.json()).then(data3 => {
                                          setIsPending(false)
                                      console.log(data3);
                                  
                                      alert("Status updated")
                                      setCount(count + 1);
                                      navigate("/kovil/tickets")
                                    }).catch((err)=>{
                                        console.log(err)
                                    })
                                });
  });

             
                    }).catch((err) => {
                        console.log(err.response);
                        setIsPending(false)

                    })


                }).catch((err) => {
                    setIsPending(false)
                    alert(err);
                })

            }
            if (status === "Closed") {
                setIsPending(true)
                await updateDoc(docRef, {
                    status: "Closed",
                }).then(async(res) => {

                    await axios.post("https://fcm.googleapis.com/fcm/send", {
                        "notification": {
                            "title": "Status-Closed",
                            "body": "Hey buddy, your ticket is closed",
                            "click_action": "http://localhost:3000/",
                            "icon": "http://url-to-an-icon/icon.png"
                        },
                        "to": ticUser.fcm_token
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": process.env.REACT_APP_MESSAGING_KEY
                        }
                    }).then((res) => {

                        const apikey= process.env.REACT_APP_SMS_API_KEY 
  const mobile=Number(now.phone_number )
  const sender = 'KVLAPP';  
  const username=String(now.first_name) 
  const tno=data.doc_id
  const status="Closed" 
  var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
  var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m3);
  fetch(url).then(response => response.json()).then(data1 => {
                
    console.log(data1)
    const apikey= process.env.REACT_APP_SMS_API_KEY 
    const mobile=Number(data.user_mobile_number )
    const sender = 'KVLAPP';  
    const username=String(data.user_name) 
    const tno=data.doc_id
    const status="Closed" 
var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'

    // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
    var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m4);
    fetch(url).then(response => response.json()).then(data2 => {
                  console.log(data2)
        const apikey= process.env.REACT_APP_SMS_API_KEY 
                                const mobile=Number(superAdmin?.phone_number )
                                const sender = 'KVLAPP';  
                                const username=String(superAdmin?.user_name) 
                                const tno=data.doc_id
                                const status="Closed"
//   var m4='Dear '+username+', Namaskaram, Your ticket no '+tno+' status has been changed to '+status+'. Please check the KovilApp for details. - KovilApp Team'
var mms='Dear '+username+', ticket no '+tno+' status has been changed to '+status+' - KovilApp Team'

                                // var m3='Dear '+username+', ticket no '+tno+' ticket status has been changed to '+status+' - KovilApp Team'
                                var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(mms);
                                fetch(url).then(response => response.json()).then(data3 => {
                                      setIsPending(false)
                                  console.log(data3);
                              
                                  alert("Status updated")
                                  setCount(count + 1);
                                  navigate("/kovil/tickets")
                                }).catch((err)=>{
                                    console.log(err)
                                })
    });
  });

 
                    }).catch((err) => {
                        setIsPending(false)

                        console.log(err.response);
                    })
                 

                }).catch((err) => {
                    setIsPending(false)
                    alert(err);
                })
            }
        }
    }
 

    return (
        <Box sx={{ minWidth: 120 }}>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Open</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={status}
                        onChange={handleChange}
                        required
                    >
                        <MenuItem disabled value="Open">Open</MenuItem>

                        <MenuItem value="In-Progress">In-Progress</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                    </Select>
                    <br />
                </FormControl>
                <Button
                    disabled={isPending}
                    type="submit" variant='outlined'>Submit</Button>
            </form>
        </Box>
    );
}