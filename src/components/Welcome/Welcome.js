import "./Welcome.css";
const Welcome = () => {
  return (
    <>
      <section className="welcome_main">
        <div className="welcome_inner">
          <h1>Thank You!</h1>
        </div>
      </section>
      <div className="welcome_text">
        <h4>Help us to know about you!</h4>
        <h3>Area of Interests</h3>
      </div>
      <div className="welcome_jobs">
        <div className="sub">
          <div className="row dept">
            <p id="welcome_dept" className="ai">
              AI
            </p>
            <p id="welcome_dept" className="ds">
              Data Science
            </p>
            <p id="welcome_dept" className="py">
              Python
            </p>
          </div>
          <div className="row dept">
            <p id="welcome_dept" className="bc">
              {" "}
              Block Chain
            </p>
            <p id="welcome_dept" className="ml">
              Machine Learning
            </p>
            <p id="welcome_dept" className="java">
              Java
            </p>
          </div>
        </div>
      </div>
      <div className="welcome_text1">
        <h4>Non Scholastic Activity</h4>
      </div>
      <div className="welcome_jobs1">
        <div className="sub1">
          <div className="row dept1">
            <p id="welcome_dept1" className="ca">
              Calligraphy
            </p>
            <p id="welcome_dept1" className="da">
              Dance
            </p>
            <p id="welcome_dept1" className="sin">
              Singing
            </p>
          </div>
          <div className="row dept1">
            <p id="welcome_dept1" className="Art">
              {" "}
              DIY Art
            </p>
          </div>
        </div>
      </div>
      <div className="row preference">
        <div className="col-lg-4 col-md-6 col-sm-12">
          <img src="/images/prof1.jpg" alt="" className="pref_img" />
          <div className="middle">
            <div className="text">
              {" "}
              <p>Seminar</p> <input type="radio" />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
        <img src="/images/prof1.jpg" alt="" className="pref_img" />
          <div className="middle">
            <div className="text">
              {" "}
              <p>webinar</p> <input type="radio" />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12"><img src="/images/prof1.jpg" alt="" className="pref_img" />
          <div className="middle">
            <div className="text">
              {" "}
              <p>Events</p> <input type="radio" />
            </div>
          </div></div>
        <div className="col-lg-4 col-md-6 col-sm-12"><img src="/images/prof1.jpg" alt="" className="pref_img" />
          <div className="middle">
            <div className="text">
              {" "}
              <p>Workshops</p> <input type="radio" />
            </div>
          </div></div>
        <div className="col-lg-4 col-md-6 col-sm-12">
        <img src="/images/prof1.jpg" alt="" className="pref_img" />
          <div className="middle">
            <div className="text">
              {" "}
              <p>Job match</p> <input type="radio" />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-12">
        <img src="/images/prof1.jpg" alt="" className="pref_img" />
          <div className="middle">
            <div className="text">
              {" "}
              <p>Networking</p> <input type="radio" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome;
