import React from 'react';
import { getDatabase, ref, set, onValue, child, get } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { encode, decode } from 'firebase-encode';
export { getNearby, updateCurrUserInfo };
export { currUser, currSong , userList};
export { token_data , DBInterfaceInstance};
import { HomeScreen, ProfileScreen, SettingsScreen, toggleSwitch } from './interface.js';
import GetLocation from 'react-native-get-location';
import initAppAndGetDB from './android/app/src/database/DBConfig';
import DBInterface from './android/app/src/database/DBInterface';
import Spotify from "./android/app/src/spotify_auth/spotifyAPI";
import authHandler from "./android/app/src/spotify_auth/authenticationHandler";
import User from './android/app/src/spotify_auth/user.js';
import Song from './android/app/src/spotify_auth/song.js';
import { TouchableOpacity, View, Text } from 'react-native';

import { styles } from './interfaceStyle.js';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import Icon_EvilIcons from 'react-native-vector-icons/EvilIcons';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

let userList = [];
let currUser = new User("null", "null", "free", -1);
let currSong = new Song("No Song Playing", "N/A", "https://cdn.discordapp.com/attachments/937180470611955753/949886090205093958/black.png", "", -1);
let token_data;
let DBInterfaceInstance;
let latitude = 0;
let longitude = 0;
const Stack = createNativeStackNavigator();

export default function App() {
  const db = initAppAndGetDB();
  DBInterfaceInstance = new DBInterface(db);

  let [login, setLogin] = React.useState(true);
  const dimensions = useWindowDimensions();

  const handleAuth = () => {
    authHandler.onLogin().then((result) => {
      token_data = result;
      console.log("token set");
      updateCurrUserInfo();
      setLogin(login = false);
    })
    .catch(error => {
      const { code, message } = error;
    });
  }
  
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

function getNearby(){ 
  DBInterfaceInstance.getNearbyUsers(currUser.spotifyID).then((output) => {
    userList = output;
    console.log(output);
  }).catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
  });
  return;
}

function updateCurrUserInfo(){
  (Spotify.getCurrUserInfo(token_data["accessToken"])).then((currentUser) => {
    currentUser.spotifyID = encode(currentUser.spotifyID);  // Firebase doesn't like certain available Spotify username chars in its keys
    currUser = currentUser;
    DBInterfaceInstance.initUser(currentUser.spotifyID, currentUser.displayName, currentUser.profileURL, currentUser.premium, true, 0, 0, true);
    (Spotify.getCurrSong(token_data["accessToken"])).then((currentSong) => {
        console.log(currentSong);
        if(currentSong != null && currentSong != undefined){
          currSong = currentSong;
        }
        else{
          currSong = new Song("No Song Playing", "N/A", "https://cdn.discordapp.com/attachments/937180470611955753/949886090205093958/black.png", "", -1);
        }
        DBInterfaceInstance.updateSong(currentUser.spotifyID, currSong);
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
