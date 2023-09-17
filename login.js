import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
const signinForm = document.getElementById('signin-form');
auth.languageCode = 'it';
auth.useDeviceLanguage();
signinForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission

    const email = signinForm['emailin'].value;
    const password = signinForm['passwordin'].value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert('Sign in successful!'); // You can replace this with your desired success handling
            console.log('User details:', user);
            window.location.href = 'userdetails.html';

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Sign in error: ${errorMessage}`);
        });
});
const googleSignInButton = document.getElementById('google-signin-button');
googleSignInButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();

    // Sign in with Google using a popup
    signInWithPopup(auth, provider)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            window.location.href = 'userdetails.html';
            alert('Sign in with Google successful!');
            console.log('User details:', user);


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Sign in with Google error: ${errorMessage}`);
        });
});
const phonelogin = document.getElementById("phonelogin")
phonelogin.addEventListener('click', () => {
    window.location.href = 'loginwithphone.html';
})

