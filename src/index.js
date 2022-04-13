import SendBird from "sendbird";
import {initializeApp} from "firebase/app";
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { firebaseConfig } from "./firebaseConfig";

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging();

const appId = 'D70D1F08-9EEB-4C33-82B6-639E6D652564';
const userId = "User1";
const vapidKey = 'YOUR_VAPID_KEY - https://firebase.google.com/docs/cloud-messaging/js/client#configure_web_credentials_in_your_app';

const sb = new SendBird({appId});

sb.connect(userId, (user, error) => {
    Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
            getToken(messaging, { vapidKey })
                .then(currentToken => {
                    if (currentToken) {
                        sb.registerGCMPushTokenForCurrentUser(currentToken, (response, error) => {
                            if(error) console.log(error);
                            console.log("Token Registered:", currentToken)
                        });
                    }
                })
                .catch(err => {
                    console.log('An error occurred while retrieving token. ', err);
                });
        } else {
            console.log('Unable to get permission to notify.');
        }
    })
})

//Register your service worker.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(new URL('../firebase-messaging-sw.js', import.meta.url), {type: 'module'})
      .then(function(response) {
        // Service worker registration done
        console.log('Registration Successful', response);
      }, function(error) {
        // Service worker registration failed
        console.log('Registration Failed', error);
      })
}



onMessage(messaging, (payload) => {
  console.log('Notification received!', payload);
});
