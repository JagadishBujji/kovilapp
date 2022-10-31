import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { getAuth, updatePassword } from "firebase/auth";

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
  });
  console.log(props.data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log( typeof(formData.currentPassword) , typeof(props.data.password));
    // console.log(formData.currentPassword===props.data.password)
    const pd=String(props.data.password)
    if (formData.currentPassword === pd) {
      const docRef = doc(db, "userProfile", props.data.uid);
      const docRef2=doc(db,"admins",props.data.uid)
     await updatePassword(user, formData.newPassword)
        .then(async (res) => {
            console.log(res)
            await updateDoc(docRef2, {
                password: formData.newPassword
              })
                .then(async() => {
                    await updateDoc(docRef, {
                        password: formData.newPassword,
                        is_password_changed: true,
                      })
                        .then(() => {
                          props.setIsPasswordChanged("changed");
                          alert("password updated");
                        })
                        .catch((err) => {
                          alert(err);
                        });
                })
                .catch((err) => {
                  alert(err);
                });
          
        })
        .catch((error) => {
          alert(error);
        });
      // Set the "capital" field of the city 'DC'
    } else {
      alert("enter current password correctly");
    }
  };
  return (
    <div className="Passwordmodal">
      <form onSubmit={handleSubmit}>
        <Grid container direction={"column"} spacing={5}>
          <Grid item>
            <TextField
              id="outlined-password-input"
              label="Current Password"
              required
              type="password"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  currentPassword: e.target.value,
                });
              }}
              autoComplete="current-password"
            />
          </Grid>
          <Grid item>
            <TextField
              id="outlined-password-input"
              label="New Password"
              type="password"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  newPassword: e.target.value,
                });
              }}
              required
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={save}
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
      </form>
    </div>
  );
};

export default PasswordModal;
