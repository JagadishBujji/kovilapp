// import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { doc, updateDoc } from "firebase/firestore";


const MiniModal = (props) => {
    console.log(props.data.doc_id)
    const date = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    const currentDate = `${date}-${month}-${year}`;
    const newFeedBack = `${currentDate} , ${props.feedBack}`
    console.log(newFeedBack) 
    const handleClick=async()=>{
        const docRef=doc(db,"Complaints",props.data.doc_id)
        if(props.data.allFeedbacks)
        {
            console.log("feedback exits")
            console.log(props.data.allFeedbacks)
            const exisitingFB=props.data.allFeedbacks;
            exisitingFB.push(newFeedBack)
            console.log(exisitingFB)
            try{
                await  updateDoc(docRef,{
                    allFeedbacks:exisitingFB
                })
                props.setCount(props.count+1)
                alert("feedback added successfully")
                props.closeAllModal()
            }catch(err){
                console.log(err);
                props.setCount(props.count+1)
                alert("error occured")
                props.closeAllModal()
            }
            
        }
        else{
            console.log("feedback not present")
            const fb=[newFeedBack]
            // await updateDoc(docRef,{
            //     allFeedbacks:fb
            // }).then((res)=>{
            //     console.log(res)
            // }).catch((err)=>{
            //     console.log(err)
            // })
            try{
                await  updateDoc(docRef,{
                    allFeedbacks:fb
                })
                props.setCount(props.count+1)
                alert("feedback added successfully")
                props.closeAllModal()
            }catch(err){
                console.log(err);
                props.setCount(props.count+1)
                alert("error occured")
                props.closeAllModal()
            }
        }
    }
    return (
        <div className="Minimodal">
            <p>Submit Feedback?</p>
            <button className="btn" onClick={handleClick}>Confirm</button>
            {/* <button className="btn" onClick={props.onCancel}>Confirm</button> */}
            <button className="btn" onClick={props.onCancel}>Cancel</button>
        </div>
    )
}
export default MiniModal;
