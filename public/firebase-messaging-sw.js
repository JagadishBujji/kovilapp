
// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
import { initializeApp } from "firebase/app";
import { onBackgroundMessage } from "firebase/messaging/sw";

import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBWMklfkoB3Kt95_8i4w6XnQ6KscvjLlsY",
    authDomain: "templegrievance.firebaseapp.com",
    projectId: "templegrievance",
    storageBucket: "templegrievance.appspot.com",
    messagingSenderId: "799795262553",
    appId: "1:799795262553:web:28d104b3155248941bed48",
    measurementId: "G-6ZMTZ6X7KN",
  };

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp)

 

messaging.onBackgroundMessage(function(payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
if('serviceWorker' in navigator) { 
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
.then(function(registration) {
 console.log("Service Worker Registered");
messaging.useServiceWorker(registration);  
  }); 
  }