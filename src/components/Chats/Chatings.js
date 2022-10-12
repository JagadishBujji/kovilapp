import React from "react";
import Applicant from "../../Reuseable/Applicant";
import Experience from "../../Reuseable/Experience";
import JobFilter from "../../Reuseable/JobFilter";
import JobLocation from "../../Reuseable/JobLocation";
import JobType from "../../Reuseable/JobType";
import Profile from "../../Reuseable/profile/Profile";
import WorkExperience from "../../Reuseable/profile/WorkExperience";
import Search from "../../Reuseable/Search/Search";
// import JobPostCard from "./JobPostCard";
import ChatsCard from "./ChatsCard";

const Chatings = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-3 jobsearch">
          <div className="whatsapp_main_sidemenu">
            <div className="whatapp_main_sidemenu_top">
              <div className="row">
                <div className="Avatar col-lg-4 col-md-4 col-sm-2">
                  <img
                    style={{
                      borderRadius: "50%",
                      height: "49px",
                      width: "49px",
                    }}
                    src="/images/profile.png"
                    alt=""
                  />
                </div>
                <div className="col-lg-8 col-md-8 col-sm-10">
                  <div className="row text-center my-3">
                    <div className="col-4">
                      <i
                        style={{ color: "#777" }}
                        className="fa fa-sync-alt"
                      ></i>
                    </div>
                    <div className="col-4">
                      <i
                        style={{ color: "#777" }}
                        className="fa fa-envelope"
                      ></i>
                    </div>
                    <div className="col-4">
                      <i
                        style={{ color: "#777" }}
                        className="fas fa-ellipsis-v"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="whatsapp_main_sidemenu_middle">
              <i className="fa fa-search"></i>
              <input type="search" name="search" placeholder="search" />
            </div>
            <div className="whatapp_main_sidemenu_bottom">
              <div className="whatapp_main_sidemenu_bottom_chat">
                <ul className="list-group chat-card">
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile.png"
                          className="Avatar"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h6
                          style={{ fontSize: "14px" }}
                          className="font-weight-bold"
                        >
                          User Name
                        </h6>
                        <p className="discription">
                          <span>
                            <svg
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                            >
                              <path
                                fill="#4FC3F7"
                                d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                              ></path>
                            </svg>
                          </span>{" "}
                          Message
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile.png"
                          className="Avatar"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h6
                          style={{ fontSize: "14px" }}
                          className="font-weight-bold"
                        >
                          User Name
                        </h6>
                        <p className="discription">
                          <span>
                            <svg
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                            >
                              <path
                                fill="#4FC3F7"
                                d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                              ></path>
                            </svg>
                          </span>{" "}
                          Message
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile.png"
                          className="Avatar"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h6
                          style={{ fontSize: "14px" }}
                          className="font-weight-bold"
                        >
                          User Name
                        </h6>
                        <p className="discription">
                          <span>
                            <svg
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                            >
                              <path
                                fill="#4FC3F7"
                                d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                              ></path>
                            </svg>
                          </span>{" "}
                          Message
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile.png"
                          className="Avatar"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h6
                          style={{ fontSize: "14px" }}
                          className="font-weight-bold"
                        >
                          User Name
                        </h6>
                        <p className="discription">
                          <span>
                            <svg
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                            >
                              <path
                                fill="#4FC3F7"
                                d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                              ></path>
                            </svg>
                          </span>{" "}
                          Message
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile.png"
                          className="Avatar"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h6
                          style={{ fontSize: "14px" }}
                          className="font-weight-bold"
                        >
                          User Name
                        </h6>
                        <p className="discription">
                          <span>
                            <svg
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                            >
                              <path
                                fill="#4FC3F7"
                                d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                              ></path>
                            </svg>
                          </span>{" "}
                          Message
                        </p>
                      </div>
                    </div>
                  </li>

                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile.png"
                          className="Avatar"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h6
                          style={{ fontSize: "14px" }}
                          className="font-weight-bold"
                        >
                          User Name
                        </h6>
                        <p className="discription">
                          <span>
                            <svg
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                            >
                              <path
                                fill="#4FC3F7"
                                d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                              ></path>
                            </svg>
                          </span>{" "}
                          Message
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile.png"
                          className="Avatar"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h6
                          style={{ fontSize: "14px" }}
                          className="font-weight-bold"
                        >
                          User Name
                        </h6>
                        <p className="discription">
                          <span>
                            <svg
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                            >
                              <path
                                fill="#4FC3F7"
                                d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                              ></path>
                            </svg>
                          </span>{" "}
                          Message
                        </p>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-3">
                        <img
                          src="/images/profile.png"
                          className="Avatar"
                          alt=""
                        />
                      </div>
                      <div className="col-9">
                        <h6
                          style={{ fontSize: "14px" }}
                          className="font-weight-bold"
                        >
                          User Name
                        </h6>
                        <p className="discription">
                          <span>
                            <svg
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 18 18"
                              width="18"
                              height="18"
                            >
                              <path
                                fill="#4FC3F7"
                                d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"
                              ></path>
                            </svg>
                          </span>{" "}
                          Message
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9 ">
          <div class="whatsapp_main_body">
            <div className="whatapp_main_sidemenu_top">
              <div className="row">
                <div className="Avatar  col-lg-4 col-md-4 col-sm-2">
                  <div className="row chats">
                    <img
                      style={{
                        borderRadius: "50%",
                        height: "49px",
                        width: "49px",
                      }}
                      src="/images/profile.png"
                      alt=""
                    />
                    <p className="m-0 pl-5">jagadish</p>
                  </div>
                </div>
                <div className="col-lg-8 col-md-8 col-sm-10">
                  <div className="row text-center d-flex justify-content-end my-3">
                    <div className="col-4">
                      <i
                        style={{ color: "#777" }}
                        className="fas fa-ellipsis-v"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul className="personal-chat">
                <div className="row chat1">
                  <li className="personal-edit">
                    kjbo;abc onaos cljalwboae knaeowfulekwjfniuewoin
                  </li>
                </div>

                <div className="row chat2">
                  <li className="personal-oppsite">hi</li>
                </div>
                <div className="row chat1">
                  <li className="personal-edit">hi</li>
                </div>

                <div className="row chat2">
                  <li className="personal-oppsite">hi</li>
                </div>
                <div className="row chat1">
                  <li className="personal-edit">hi</li>
                </div>

                <div className="row chat2">
                  <li className="personal-oppsite">hi</li>
                </div>
                <div className="row chat1">
                  <li className="personal-edit">hi</li>
                </div>

                <div className="row chat2">
                  <li className="personal-oppsite">hi</li>
                </div>
                <div className="row chat1">
                  <li className="personal-edit">hi</li>
                </div>

                <div className="row chat2">
                  <li className="personal-oppsite">hi</li>
                </div>
                <div className="row chat1">
                  <li className="personal-edit">hi</li>
                </div>

                <div className="row chat2">
                  <li className="personal-oppsite">hi</li>
                </div>
              </ul>
            </div>

            <div className="whatsapp_main_sidemenu_middle">
              <img src="/images/smile.png" className="smile" alt="" />
              <img src="/images/clip.png" className="smile" alt="" />
              <textarea
                className="w-100 message"
                type="text"
                name="text"
                placeholder="Message"
                rows="2"
              />
              <a href="" className="send">
                send
              </a>
            </div>
            {/* <div class="whatsapp_main_body_image">
              <img
                src="https://web.whatsapp.com/img/c98cc75f2aa905314d74375a975d2cf2.jpg"
                alt=""
              />
            </div> */}
            {/* <div class="whatapp_main_body_content ">
              <h1
                style={{
                  color: "#4b5961",
                  fontSize: "36px",
                  fontWeight: "100",
                }}
              >
                Idezz For Desktop
              </h1>
              <h6
                style={{
                  fontSize: "10px",
                  color: "#929fa6",
                  textAlign: "center",
                  lineHeight: "20px",
                }}
              >
                Ideez connects to your phone to sync messages. To reduce data
                usage, connect your phone to Wi-Fi.
              </h6>
              <hr
                style={{ marginBottom: "34px", backgroundColor: "#E1E9EB" }}
              />
              <p
                style={{
                  fontSize: "14px",
                  color: "#929fa6",
                  lineHeight: "20px",
                  display: "-ms-inline-flexbox",
                  display: "inline-flex",
                  msFlexAlign: "center",
                }}
              >
                <i class="mr-2 fa fa-laptop"></i>
                WhatsApp is available for Windows.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatings;
