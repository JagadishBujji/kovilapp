import { useNavigate } from "react-router-dom";
const MiniModal = (props) => {
    const navigate = useNavigate();
    return(
        <div className="Minimodal">
        <p>Submit Feedback?</p>
        <button className="btn" onClick={props.onCancel}>Confirm</button>
        <button  className="btn" onClick={props.onCancel}>Cancel</button>
        </div>
    )
}
export default MiniModal;
