
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useEffect } from 'react';
import { addToClosedTicket, deleteFromCurrentTicket } from '../TicketStatusChange/DeleteFromCurrentTicket';
import { useNavigate } from 'react-router-dom';

export default function BasicSelect({ data, count, setCount }) {
    const [status, setStatus] = React.useState('');
    const admin = JSON.parse(localStorage.getItem("admin"));
    const navigate=useNavigate();
    const subadmin = JSON.parse(localStorage.getItem("subadmin"));
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const [ad, setAd] = React.useState();
    useEffect(() => {
        if(subadmin)
        {
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
    else{
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
        getAdmin()
    }
    }, [])

    //   if(ad)
    //   {
    //     console.log(deleteFromCurrentTicket(ad.current_ticket,data.doc_id))
    //     console.log(addToClosedTicket(ad.closed_ticket,data))
    //   }
    const [isPending, setIsPending] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(subadmin)
        {
            
        const docRef = doc(db, "Complaints", data.doc_id);
        const docRef2 = doc(db, "admins", subadmin.uid);
        if (status === "In-Progress") {
            setIsPending(true)
            await updateDoc(docRef, {
                status: "In-Progress",
            }).then((res) => {
                if(ad.current_ticket)
                {
                setIsPending(true)

                updateDoc(docRef2, {
                    current_ticket: [...ad.current_ticket, data]
                }).then((res) => {
                    setIsPending(false)
                    alert("Status updated")
                    setCount(count + 1);
                    navigate("/kovil/tickets")
                }).catch((err)=>{
                    alert(err)
                    console.log(err)
                })
                }else{
                    setIsPending(true)

                    updateDoc(docRef2, {
                        current_ticket: [data]
                    }).then((res) => {
                        setIsPending(false)
                        alert("Status updated")
                        setCount(count + 1);
                    navigate("/kovil/tickets")

                    }).catch((err)=>{
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
                }).then((res) => {
                    setCount(count + 1);
                    alert("status updated")
                    navigate("/kovil/tickets")


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
    else{
        const docRef = doc(db, "Complaints", data.doc_id); 
        if (status === "In-Progress") {
            setIsPending(true)
            await updateDoc(docRef, {
                status: "In-Progress",
            }).then((res) => { 
                    setIsPending(false)
                    alert("Status updated")
                    setCount(count + 1); 
                    navigate("/kovil/tickets")

            }).catch((err) => {
                setIsPending(false)
                alert(err);
            })

        }
        if (status === "Closed") {
            setIsPending(true) 
            await updateDoc(docRef, {
                status: "Closed",
            }).then((res) => {
                setIsPending(false) 
                    setCount(count + 1);
                    alert("status updated") 
                    navigate("/kovil/tickets")

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
                    <br/>
                </FormControl>
                <Button
                disabled={isPending}
                type="submit" variant='outlined'>Submit</Button>
            </form>
        </Box>
    );
}