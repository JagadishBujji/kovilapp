import React from "react";
import ProfileEditModal from "../../Reuseable/profile/Modal/ProfileEditModal";

const ProfileCard = () => {
  return (
    <>
      <div className="row container m-auto">
        <div className="Card jobpost">
          <div className="row">
            <div className="col-md-3">
              <img src="/images/profile.png" alt="" className="profilelogo" />
            </div>
            <div className="col-md-9 pl-5">
              <div className="edit-modal">
                <p className="profile-name">
                  <b>
                    <img src="/images/id-card.png" alt="" className="tel-img" />
                    K P Jagadish Kumar
                  </b>
                </p>
                {/* <img
                  src="/images/edit-button.png"
                  alt=""
                  className="profile-edit"
                /> */}
                <ProfileEditModal />
              </div>

              <p>
                {" "}
                <img src="/images/design.png" alt="" className="tel-img" />
                UI/UX designer
              </p>
              <p>
                <img src="/images/location.png" alt="" className="tel-img" />
                Chennai
              </p>

              <p>
                <img src="/images/description.png" alt="" className="tel-img" />
                Enthusiastic & Fast Learner.I’m Looking For Java Developer Role
              </p>
              <p>
                <img src="/images/mail.png" alt="" className="tel-img" />
                jagadish00198@gmail.com
              </p>
              <p>
                <img src="/images/telephone.png" alt="" className="tel-img" />
                123456789
              </p>
              {/* <Divider /> */}
              {/* <br /> */}
              {/* <div className="row btnrow">
                <div className="job-button">
                  <Button sx={save} variant="outlined" className="mr-2">
                    Save
                  </Button>
                  <Button sx={apply} variant="outlined">
                    Apply
                  </Button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
