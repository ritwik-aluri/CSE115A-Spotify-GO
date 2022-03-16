import React from 'react';
import { getDatabase,
         ref,
         set,
         get,
         onValue,
         child } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { encode,
         decode } from 'firebase-encode';
import GetLocation from 'react-native-get-location';
import { Text,
         TouchableOpacity,
         View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import initAppAndGetDB from './android/app/src/database/DBConfig';
import DBInterface from './android/app/src/database/DBInterface';
import Spotify from "./android/app/src/spotify_auth/spotifyAPI";
import authHandler from "./android/app/src/spotify_auth/authenticationHandler";
import User from './android/app/src/spotify_auth/user.js';
import Song from './android/app/src/spotify_auth/song.js';
import { HomeScreen,
         ProfileScreen,
         SettingsScreen,
         toggleSwitch } from './interface.js';
import { styles } from './interfaceStyle.js';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

export { getNearby,
         updateCurrUserInfo,
         token_data,
         DBInterfaceInstance,
         userList,
         currUser,
         currSong };


let userList = []; // Array to populate the nearby users
let currUser = new User("null", "null", "free", -1); // Template user information
let currSong = new Song("No Song Playing", "N/A", "https://cdn.discordapp.com/attachments/937180470611955753/949886090205093958/black.png", "", -1); // Template user song
let token_data; // Authentication token
let DBInterfaceInstance; // Database Interface interface
let latitude = 0; // Template coordinate latitude
let longitude = 0; // Template coordinate longitude
const Stack = createNativeStackNavigator(); // User interface page stack navigator

export default function App() {
  // Initialize database
  const db = initAppAndGetDB();
  DBInterfaceInstance = new DBInterface(db);

  // Variables
  let [login, setLogin] = React.useState(true);
  const dimensions = useWindowDimensions();

  // Handler for authentication
  const handleAuth = () => {
    authHandler.onLogin().then((result) => { // If login authentication is successful
      token_data = result;
      console.log("token set");
      updateCurrUserInfo();
      setLogin(login = false);
    })
    .catch(error => { // Return error if failed
      const { code, message } = error;
    });
  }
  
  // Login Screen View
  const loginScreen = (
    <>
      <View style={{width: dimensions.width,
                    height: dimensions.height,
                    backgroundColor: 'rgba(40,40,40,255)'}}
      >
        <View style={[styles.centering]}>
          <Icon_Entypo
            name='spotify'
            color='grey'
            size={100}
            style={{marginLeft: 'auto',
                    marginRight: 'auto'}}
          />
          <View style={{height: 20}}/>
          <Text style={[styles.centering, {fontSize: 40, color: 'white'}]}>Spotify GO</Text>
        </View>
      </View>

      <View style={{marginLeft: 'auto', marginRight: 'auto', bottom: '30%'}}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleAuth}>
          <View style={{width: 170, height: 50, borderRadius: 25, backgroundColor: 'rgba(30,190,96,255)'}}>
            <Text style={[styles.centering, {bottom: 2.5, fontSize: 20, color: 'black'}]}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  )

  return (
    <>
      {login && (loginScreen)}
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false,
                          animation: "none",
          }}>
          <Stack.Screen name="Home" component={HomeScreen}/>
          <Stack.Screen name="Profile" component={ProfileScreen}/>
          <Stack.Screen name="Settings" component={SettingsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

// Function to get nearby users
function getNearby(){ 
  DBInterfaceInstance.getNearbyUsers(currUser.spotifyID).then((output) => {
    userList = output;
    console.log(output);
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
  return;
}

// Function to update current user information
function updateCurrUserInfo(){
  (Spotify.getCurrUserInfo(token_data["accessToken"])).then((currentUser) => {
    currentUser.spotifyID = encode(currentUser.spotifyID);  // Firebase doesn't like certain available Spotify username chars in its keys
    currUser = currentUser;
    (Spotify.getCurrSong(token_data["accessToken"])).then((currentSong) => {
        console.log(currentSong);
        if(currentSong != null && currentSong != undefined){
          currSong = currentSong;
        }
        else{
          currSong = new Song("No Song Playing", "N/A", "https://cdn.discordapp.com/attachments/937180470611955753/949886090205093958/black.png", "", -1);
        }
        DBInterfaceInstance.initUser(currentUser.spotifyID, currentUser.displayName, currentUser.profileURL, currentUser.avatarURL, currentUser.premium, true, true, 0, 0, currSong);
    });
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      DBInterfaceInstance.updateLocationShareStatus(currentUser.spotifyID, toggleSwitch);
      DBInterfaceInstance.updateLocation(currentUser.spotifyID, location.latitude, location.longitude);
      getNearby();
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    })
    return;
});
}
