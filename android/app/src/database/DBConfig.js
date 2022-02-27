import firebase from 'firebase/compat/app';
import { getDatabase } from "firebase/database";

function initAppAndGetDB() {
    let config = {
        apiKey: "AIzaSyBBogvZGpzfWJeUeloFvvH2xguSyMnmPJA",
        authDomain: "spotify-go-ba7bf.firebaseapp.com",
        // The value of `databaseURL` depends on the location of the database
        databaseURL: "https://spotify-go-ba7bf-default-rtdb.firebaseio.com",
        projectId: "spotify-go-ba7bf",
        storageBucket: "spotify-go-ba7bf.appspot.com",
        // messagingSenderId: "SENDER_ID",
        appId: "1:445520680219:android:f2b7a5d240013fe1dc2fbe",
        // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
        measurementId: "G-MEASUREMENT_ID",
    };
    firebase.initializeApp(config);
    const database = getDatabase();
    return database;
}

export default initAppAndGetDB;
