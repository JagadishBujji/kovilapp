import React, { useEffect, useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

import HomeTabs from "../../Reuseable/Tabs/HomeTabs";

const HomePost = () => {
  // const [jobs, setJobs] = useState([]);
  // const [showSavedJobs, setShowSavedJobs] = useState(false);

  // const savedJobes = useSelector((state) => state.savedJobs.savedJobs);

  // console.log(savedJobes);
  // useEffect(() => {
  //   axios
  //     .get("https://ideez.herokuapp.com/api/jobs")
  //     .then((res) => {
  //       console.log("res: ", res.data);
  //       setJobs(res.data);
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <>
      <HomeTabs />
    </>
  );
};

export default HomePost;
