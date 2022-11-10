

const axios = require("axios");

const tlClient = axios.create({
  baseURL: "https://api.textlocal.in/",
  params: {
    apiKey: "wJyfpBVDtbg-rnMp7JmQ23XtMqxpH9K2CPbbbgCP9V", //Text local api key
    sender: "8956644"
  }
});

const smsClient = {
  sendPartnerWelcomeMessage: user => {
    if (user && user.phone && user.name) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        `Hi ${user.name},
Welcome to iWheels, Download our app to get bookings from our customers with better pricing. 
https://iwheels.co`
      );
      tlClient.post("/send", params);
    }
  },
  sendVerificationMessage: user => {
    if (user && user.phone) {
      const params = new URLSearchParams();
      params.append("numbers", [parseInt("91" + user.phone)]);
      params.append(
        "message",
        `Your iWheels verification code is ${user.verifyCode}`
      );
      tlClient.post("/send", params);
    }
  }
};

export default smsClient