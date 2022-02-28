import React from 'react';
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export { userList };
export { longitude, latitude };
import { HomeScreen, ProfileScreen, SettingsScreen } from './interface.js';
import GetLocation from 'react-native-get-location';
import initAppAndGetDB from './android/app/src/database/DBConfig';
import DBInterface from './android/app/src/database/DBInterface';

let userList = [];
let longitude;
let latitude;

const Stack = createNativeStackNavigator();

export default function App() {
  const db = initAppAndGetDB();
  const DBInterfaceInstance = new DBInterface(db);
  DBInterfaceInstance.getNearbyUsers("DBsample").then((output) => { userList = output; });

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
  .then(location => {
    longitude = location.longitude;
    latitude = location.latitude;
  })
  .catch(error => {
    const { code, message } = error;
    console.warn(code, message);
  })

  // Use the DBInterface class instance to init users, update the database, and get nearby users
  // from now on! :)
  // The class is here: android/app/src/database/DBInterface.js
  // Also, note that each user in the outputted list of DBInterfaceInstance.getNearbyUsers() can be
  // treated as an object and their fields' data obtained with dot notation! All users are assumed
  // to be structured as the "DBsample" user is.
  // The last thing to note is that the parameter to getNearbyUsers() is supposed to be the current
  // user's Spotify auth key, used to index the users in the database (as an example, Gabe's is
  // already in there). So, Gabe, uh, replace that parameter that I've hardcoded to "DBsample" with
  // your thing above.
  //   - Ritwik
  /*
  // This is a new push to the database, completely testing.
  set(ref(db, 'users/' + "Guy"), {
    music: "Second Chance",
    premium: true,
    sharing: true,
    latitude: 37.78835,
    longitude: -122.4314
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
  */

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