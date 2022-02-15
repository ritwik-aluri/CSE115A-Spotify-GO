import React from 'react';
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export { userList };
import { HomeScreen, ProfileScreen, SettingsScreen } from './interface.js';

let userList = [];


const Stack = createNativeStackNavigator();

export default function App() {
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
  const db = getDatabase();

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
          artist: 'N/A',
          premium: child.val().premium,
          sharing: child.val().sharing,
          latitude: child.val().latitude,
          longitude: child.val().longitude
        })
      })
    })
  };

  userList.length = 0;
  populateList();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
    headerShown: false, animation: "none",
      }}>
        <Stack.Screen name = "Home" component={HomeScreen}/>
        <Stack.Screen name = "Profile" component={ProfileScreen}/>
        <Stack.Screen name = "Settings" component={SettingsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
