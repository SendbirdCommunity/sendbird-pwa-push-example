import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

/*
Go to firebase console.
Click on settings cog
Under General click Add App if not done so. Choose Webapp.
Provide a name and register.
You should now see the credentials required below.
 */
const firebaseApp = initializeApp({
  apiKey: "******",
  authDomain: "*******",
  databaseURL: "*******",
  projectId: "*******",
  storageBucket: "*******",
  messagingSenderId: "*******",
  appId: "*******",
  measurementId: "*******"
};);

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {

   console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };
  self.registration.showNotification(notificationTitle,  notificationOptions).then(() => {
    console.log("Notification Complete")
  }).catch(error => {
    console.log(error)
  });
})
