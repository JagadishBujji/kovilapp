import React from "react";
import Education from "../../Reuseable/profile/Education";
import EmploymentExperience from "../../Reuseable/profile/EmploymentExperience";
import Resume from "../../Reuseable/profile/Resume";
import Skills from "../../Reuseable/profile/Skills";
import ProfileCard from "./ProfileCard";

const ProfileUser = () => {
  return (
    <>
      <ProfileCard />
      <Resume />
      <Skills />
      <EmploymentExperience />
      <Education />
    </>
  );
};

export default ProfileUser;
