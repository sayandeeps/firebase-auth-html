import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
const db = getFirestore();
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
            console.log('User details:', user.uid);


            //adding in firestore 
            async function adddoc_uid() {
                const data = {
                    useruid: user.uid,
                    userdisplayname: user.displayName,
                    userphotourl: user.photoURL,
                    useremail: user.email,
                    userphone: user.phoneNumber,
                    usergender: "N/A",
                    useraddress: "N/A",
                    userorganization: "N/A",
                    userdesignation: "N/A"
                };

                const docRef = doc(db, "userlist", user.uid);

                // Check if the document already exists before adding it
                getDoc(docRef)
                    .then((docSnapshot) => {
                        if (!docSnapshot.exists()) {
                            // Document doesn't exist, so add it
                            setDoc(docRef, data)
                                .then(() => {
                                    console.log("Data added since the document didn't exist.");
                                })
                                .catch((error) => {
                                    console.error("Error:", error);
                                });
                        } else {
                            console.log("Document already exists. No data added.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error checking document existence:", error);
                    });
            }
            adddoc_uid()


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

const fb = document.getElementById('fb')


fb.addEventListener('click', () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;


            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;
            alert('Sign in with Google successful!');
            window.location.href = 'userdetails.html';


            // IdP data available using getAdditionalUserInfo(result)
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });


})
const github = document.getElementById('github')


github.addEventListener('click', () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            alert('Sign in was successful!');
            window.location.href = 'userdetails.html';


            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            alert("error")
            console.log(error)
            // ...
        });



})
