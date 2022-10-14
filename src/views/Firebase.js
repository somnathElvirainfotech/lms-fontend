import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCJBDB1nYNz3gH9vAg5zy3LN0S3PlMkbr8",
    authDomain: "auth-demo-27748.firebaseapp.com",
    projectId: "auth-demo-27748",
    storageBucket: "auth-demo-27748.appspot.com",
    messagingSenderId: "631612013334",
    appId: "1:631612013334:web:079752fb34afa9cb19ae37"
};

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var gprovider = new firebase.auth.GoogleAuthProvider();
var mprovider = new firebase.auth.OAuthProvider('microsoft.com');
export { auth, gprovider, mprovider,firebase };



