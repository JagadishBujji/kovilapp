const UserModal = (props) => {
    return(
        <div className="Minimodal">
        <p>Do you want to Cancel?</p>
        <button className="btn" onClick={props.onConfirm}>Confirm</button>
        <button  className="btn" onClick={props.onCancel}>Cancel</button>
        </div>
    )
}
export default UserModal;