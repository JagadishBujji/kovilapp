import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase";

const AuthContext = React.createContext({
  user: {
    id: "",
    name: "",
    email: ""
  },
  role: "",
  isLoggedIn: false,
  currentUser: {},
  currentDevice: {},
  setCurrentUser: (user) => {},
  setCurrentDevice: (device) => {},
  setUser: (user) => {},
  setRole: (role) => {},
  setIsLoggedIn: () => {},
  logout: () => {}
});

export const AuthContextProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDevice, setCurrentDevice] = useState(null);

  useEffect(() => {
    let userId = sessionStorage.getItem("userId");
    if (userId !== null) {
      // sudo - super admin
      const docRef = doc(db, "admin", userId);
      getDoc(docRef)
        .then((d) => {
          sessionStorage.setItem("userId", userId);
          setIsLoggedIn(true);
          let data = d.data();
          setUser(data);
          setRole("sudo");
          // getOrders(data, (orders) => {
          //   setOrders(orders);
          // });
          // navigate to home page
          navigate("/admin/users", { replace: true });
        })
        .catch((e) => console.log(e));
    }
  }, []);

  const setMyUser = (user) => {
    setUser(user);
  };

  const setMyRole = (role) => {
    setRole(role);
  };

  const setLoggedIn = (status) => {
    setIsLoggedIn(status);
  };

  const logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        // console.log("Signed out successfully!!!", role);
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("role");
        navigate("/", { replace: true });
      })
      .catch((e) => console.log(e));
  };

  const setMyCurrentUser = (user) => {
    setCurrentUser(user);
  };

  const setMyCurrentDevice = (device) => {
    setCurrentDevice(device);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setMyUser,
        isLoggedIn: isLoggedIn,
        setIsLoggedIn: setLoggedIn,
        role: role,
        setRole: setMyRole,
        logout: logoutHandler,
        currentUser: currentUser,
        currentDevice: currentDevice,
        setCurrentUser: setMyCurrentUser,
        setCurrentDevice: setMyCurrentDevice
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
