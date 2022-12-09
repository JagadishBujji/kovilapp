import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { getAuth, updatePassword } from "firebase/auth";
import InputAdornments from "../../components/Password/Password";

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

const PasswordModal = (props) => {
  const auth = getAuth();

  const user = auth.currentUser;
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  // console.log(props.data);
  const [isPending, setIsPending] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( typeof(formData.currentPassword) , typeof(props.data.password));
    // console.log(formData.currentPassword===props.data.password)
    const pd = String(props.data.password);
    if (formData.confirmPassword === formData.newPassword) {
      if (formData.currentPassword === pd) {
        setIsPending(true);
        // const docRef = doc(db, "userProfile", props.data.uid);
        const docRef2 = doc(db, "admins", props.data.uid);
        await updatePassword(user, formData.newPassword)
          .then(async (res) => {
            console.log(res);
            await updateDoc(docRef2, {
              password: formData.newPassword,
              is_password_changed: true,
            })
              // .then(async() => {
              //     await updateDoc(docRef, {
              //         password: formData.newPassword,
              //         is_password_changed: true,
              //       })
              .then(() => {
 
                const apikey= process.env.REACT_APP_SMS_API_KEY 
                const mobile=Number(props.data.phone_number )
                const sender = 'KVLAPP'; 
                // const name = "prabhu"
                const username=String(props.data.first_name)
                console.log(apikey,mobile,username)
                var m10='Dear '+username+', Namaskaram, Your profile password has been successfully changed - KovilApp Team'
  // var message = 'Dear '+username+' - Namaskaram! Please enter the OTP: '+otp+' in your Kovil App to create your account. Thank you!';
                var url = 'https://api.textlocal.in/send/?apikey=' + apikey + '&numbers=' + mobile + '&sender=' + sender + '&message=' + encodeURIComponent(m10);
                fetch(url).then(response => response.json()).then(data => {
                  props.setIsPasswordChanged("passwordChanged");
                  alert("password updated");
                  setIsPending(false);
                  console.log(data)
                });




              })
              .catch((err) => {
                alert(err);
                setIsPending(false);

              });
            // })
            // .catch((err) => {
            //   alert(err);
            // });
          })
          .catch((error) => {
            alert(error);
            setIsPending(false);

          });
        // Set the "capital" field of the city 'DC'
      } else {
        alert("enter current password correctly");

      }
    }
    else {
      alert("New password and comfirm password does not match")
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card sx={{ p: 3 }} className="Passwordmodal">
          <div className="row user-tabs">
            <h4>Password Reset</h4>
            <span className="crossBtn" onClick={props.onCancel}>
              <b>X</b>
            </span>
          </div>
          <div>

            <TextField
              id="outlined-password-input"
              label="Current Password"
              required
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              className="Pass-inner"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  currentPassword: e.target.value,
                });
              }}
              autoComplete="current-password"
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="New Password"
              type="password"
              fullWidth
              sx={{ mb: 2 }}
              className="Pass-inner"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  newPassword: e.target.value,
                });
              }}
              required
              autoComplete="current-password"
            />
          </div>
          <div>
            <InputAdornments formData={formData} setFormData={setFormData} />
          </div>

          <Button
            type="submit"
            variant="contained"
            sx={save}
            disabled={isPending}
            onClick={props.onCancel}
          >
            Save
          </Button>
          <Button
            disabled
            variant="outlined"
            sx={cancel}
            onClick={props.onCancel}
          >
            Cancel
          </Button>
        </Card>
      </form>
    </>
  );
};

export default PasswordModal;
