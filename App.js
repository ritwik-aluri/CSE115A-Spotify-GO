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

let nearbyUsers, nearbyUsers2;
export { nearbyUsers, nearbyUsers2 };
export default function App() {
  const db = initAppAndGetDB();
  const SpotifyToDBInterface = new SpotifyToDB(db);
  const DBInterfaceInstance = new DBInterface(db);
  console.log("Getting nearby users");
  DBInterfaceInstance.getNearbyUsers("DBsample").then((output) => { nearbyUsers = output; console.log("Printing nearbyUsers:"); console.log(nearbyUsers); });
  nearbyUsers2 = 0; //await DBInterfaceInstance.getNearbyUsers("DBsample");  // Doesn't work; await requires using function to be async
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
