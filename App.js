import React from 'react';
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export { userList };
import { HomeScreen, ProfileScreen, SettingsScreen } from './interface.js';

import initAppAndGetDB from './DBConfig';
import SpotifyToDB from './android/app/src/spotify_auth/spotifyToDB';
import DBInterface from './android/app/src/spotify_auth/DBInterface';

let userList = [];


const Stack = createNativeStackNavigator();

export default function App() {
  /*let config = {
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
  const db = getDatabase();*/
  const db = initAppAndGetDB();
  console.log("Starting test to create and get sample user");
  const SpotifyToDBInterface = new SpotifyToDB(db);
  SpotifyToDBInterface.initUser("DBsample", "Bubbles", "PLACEHOLDER", false, false, 4, 5, false);
  console.log("User initialized");
  SpotifyToDBInterface.updateSong("DBsample", "test1song");
  //SpotifyToDBInterface.updateLocation("DBsample", "test2lat", "test3long");
  SpotifyToDBInterface.updateLocation("DBsample", 2, 3);
  SpotifyToDBInterface.updatePlaybackState("DBsample", "test4playback");
  console.log("Update functions called using SpotifyToDB");
  SpotifyToDBInterface.updateSong("DBsample", "test5songagain");
  SpotifyToDBInterface.updateLocation("DBsample");
  SpotifyToDBInterface.updatePlaybackState("DBsample");
  console.log("Update functions called using SpotifyToDB again; nothing should change but song");
  //const userRef = ref(db, 'users/');
  console.log("Starting test to create DB interface");
  const DBInterfaceInstance = new DBInterface(db);
  console.log("Getting nearby users");
  //let nearbyUsers;
  //DBInterfaceInstance.getNearbyUsers("DBsample").then((output) => { nearbyUsers = output; console.log(output); });
  let nearbyUsers;
  DBInterfaceInstance.getNearbyUsers("DBsample").then((output) => { nearbyUsers = output; console.log("Printing nearbyUsers:"); console.log(nearbyUsers); });
  //console.log(nearbyUsers);
  console.log("Printing nearby users above! Or below!");
  //console.log(nearbyUsers);
  //console.log("Success! :D");
  //////////

  // This is a new push to the database, completely testing.
  set(ref(db, 'users/' + "Guy"), {
    music: "Second Chance",
    premium: true,
    sharing: true,
    latitude: 20,
    longitude: 100
  });

  // Populates the nearby user list from the Users table
  const populateList = () => {
    const users = ref(db, 'users/');
    onValue(users, (snapshot) => {
      snapshot.forEach((child) => {
        userList.push({
          id: child.key,
          title: child.val().music,
          premium: child.val().premium,
          sharing: child.val().sharing,
          latitude: child.val().latitude,
          longitude: child.val().longitude
        })
      })
    })
  };
  populateList();
  //////64 blank
  const users = ref(db, 'users/')
  ///////////
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false
      }}>
        <Stack.Screen name = "Home" component={HomeScreen}/>
        <Stack.Screen name = "Profile" component={ProfileScreen}/>
        <Stack.Screen name = "Settings" component={SettingsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
