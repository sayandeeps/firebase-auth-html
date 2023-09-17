import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdNA85YFPLf8M3xO47wW-CE1O5UUBuOsk",
    authDomain: "userpage-33951.firebaseapp.com",
    projectId: "userpage-33951",
    storageBucket: "userpage-33951.appspot.com",
    messagingSenderId: "950594980527",
    appId: "1:950594980527:web:f536a29d10ed440367625a",
    measurementId: "G-3YBFCE7D36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

auth.languageCode = 'it';

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
});
// const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
// console.log(recaptchaResponse)

const getCodeButton = document.getElementById('getCode');

getCodeButton.addEventListener('click', function (event) {
    event.preventDefault();
    const phoneNumber = "+91" + (document.getElementById('phoneNumber')).value
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            // ...
        }).catch((error) => {
            // Error; SMS not sent
            // ...
            console.log(error)
        });
});
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = (document.getElementById('code')).value;
    confirmationResult.confirm(code).then((result) => {
        // User signed in successfully.
        alert("signed in")
        const user = result.user;
        console.log('User details:', user);
        window.location.href = 'userdetails.html';
        // ...
    }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
    });
})

