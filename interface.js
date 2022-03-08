import React from 'react';

import MapView, { Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Switch,
    Image,
    Linking
  } from 'react-native';
import { WebView } from 'react-native-webview';
import { styles } from './interfaceStyle.js';
import { darkMap } from './mapStyle.js';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import Icon_EvilIcons from 'react-native-vector-icons/EvilIcons';
import Icon_AntDesign from 'react-native-vector-icons/AntDesign';
import Spotify from "./android/app/src/spotify_auth/spotifyAPI";
import authHandler from "./android/app/src/spotify_auth/authenticationHandler";
import {currUser, currSong, token_data, getNearby, updateCurrUserInfo, DBInterfaceInstance} from "./App.js";
import GetLocation from 'react-native-get-location';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

let profileInfo = "Username: \n\nCurrent Song Playing:";
let username = "";
let currentSongPlaying = "";
let toggleSwitch = false;

export { HomeScreen, ProfileScreen, SettingsScreen };
export {toggleSwitch};
import { userList } from './App.js';
import DBInterface from './android/app/src/database/DBInterface.js';

function HomeScreen({navigation}) {
  let [text, onChangeText] = React.useState("Search ...");
  let [hidden, setHidden] = React.useState(true);
  let [currLatitude, setLatitude] = React.useState(0);
  let [currLongitude, setLongitude] = React.useState(0);
  let [login, setLogin] = React.useState(true);

  const handleLink = (event) => {
    if (typeof(event) == 'string') {
      Linking.openURL(event);
    }
  }

  const handleResync = () => {
    setLogin(login = false);
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
    .then(location => {
      setLatitude(currLatitude = location.latitude);
      setLongitude(currLongitude = location.longitude);
      updateCurrUserInfo();
    })
    .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
    })
    username = currUser.displayName;
    currentSongPlaying = currSong.name;
    profileInfo = "Username: " + username + "\n\nCurrent Song Playing: " + currentSongPlaying;
  }

  const handleSongTest = () => {
    console.log(token_data);
    // Spotify.saveSong("4cOdK2wGLETKBW3PvgPWqT", token_data["accessToken"])
  }

  const Item = ({ item }) => (
    <View style={[styles.listItem]}>
      <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto'}}>
        <View style={{width: '90%', flexDirection: 'row'}}>
        <View style={[styles.templateEntry]}>
          <Image style={{width: 60, height: 60}} 
            source={{
              uri: item.music.artUrl,
            }}>
          </Image>
        </View>
          <View style={{flexDirection: 'column', justifyContent: 'center', left: 12}}>
            <Text style={{color: 'white'}}>{item.music.name}</Text>
            <Text style={{color: 'grey'}}>{item.music.artist}</Text>
            <Text style={{color: 'grey'}}>
              User: {item.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{justifyContent: 'center', width: '10%'}}
          onPress={() => handleLink(item.music.url)}
        >
          <Icon_AntDesign
            name="export2"
            color="grey"
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({item}) => {
    return (
      <Item item={item}/>
    );
  };

  const mapView = ( // Map Display
    <MapView
      provider={PROVIDER_GOOGLE} // Remove this if we're not using Google Maps
      style={styles.map}
      customMapStyle={darkMap}
      region={{
        latitude: currLatitude, // 0 for testing purposes, then change to 'latitude'
        longitude: currLongitude, // 0 for testing purposes, then change to 'longitude'
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      showsUserLocation={true}
      showsMyLocationButton={true}>
        
      {userList[0] != null && userList.map((marker, index) => {
        if (marker.coordinates.latitude != null && marker.coordinates.longitude != null && marker.sharing === true) {
          return (
            <MapView.Marker
              key={index}
              pinColor={'navy'}
              coordinate={{
                latitude: marker.coordinates.latitude,
                longitude: marker.coordinates.longitude
              }}
              title={marker.name}
              description={"Current Song: " + marker.music.name}
            >
              <View style={[styles.markerCircle]}>
                <View style={[styles.markerInner]}></View>
              </View>
              <Callout
                tooltip
                onPress={() => handleLink(marker.music.url)}
              >
                <View>
                  <View style={[styles.calloutMenu]}>
                    <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto'}}>
                    <View style={[styles.templateEntry]}>
                        <WebView style={{ height: 60 , width: 60 }} source={{ uri: marker.music.artUrl }} />
                     </View>
                     <View style={{flexDirection: 'column',
                                    justifyContent: 'center',
                                    left: 12}}
                      >
                        <Text style={{color: 'white'}}>
                          {marker.music.name}
                        </Text>
                        <Text style={{color: 'grey'}}>
                          {marker.music.artist}
                        </Text>
                        <Text style={{color: 'grey'}}>
                          User: {marker.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.calloutPointer]}/>
                </View>
              </Callout>
            </MapView.Marker>
          );
        }
      })}
    </MapView>
  );

  const musicMenu = (
  <View style={[styles.musicMenu, {position: 'absolute'}]}>
    <TouchableOpacity
      activeOpacity={0.5} // Exit button for menu
      style={[styles.exitButton]}
      onPress={() => setHidden(hidden = true)}
    >
      <View style={[styles.centering]}>
        <Icon_Entypo
          name='back'
          color='rgba(45,45,45,255)'
          size={26}
          style={[styles.centering]}
        />
      </View>
    </TouchableOpacity>
      <SafeAreaView style={[styles.listArea]}>
        <FlatList
          data={userList}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
  </View>
  );

  const collapsedMenu = (
    <View style={[styles.collapsedMenu]}>
      <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto'}}>
        <View style={[styles.templateEntry]}>
        <Image style={{width: 60, height: 60}} 
            source={{
              uri: currSong.artUrl,
            }}>
          </Image>
        </View>
        <View style={{flexDirection: 'column',
                      justifyContent: 'center',
                      left: 12}}
        >
        <Text style={{color: 'white'}}>
          {currSong.name}
        </Text>
       <Text style={{color: 'grey'}}>
          {currSong.artist}
        </Text>
       <Text style={{color: 'grey'}}>
          User: {currUser.displayName}
        </Text>
        </View>
      </View>
    </View>
  );

  const dimensions = useWindowDimensions();
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
      <Text style={{marginLeft: 'auto', marginRight: 'auto', color: 'grey', bottom: 10}}>Logged in</Text>
      <TouchableOpacity activeOpacity={0.5} onPress={handleResync}>
        <View style={{width: 170, height: 50, borderRadius: 25, backgroundColor: 'rgba(30,190,96,255)'}}>
          <Text style={[styles.centering, {bottom: 2.5, fontSize: 20, color: 'black'}]}>Continue</Text>
        </View>
      </TouchableOpacity>
    </View>
    </>
  )

  return (
    <>
    <View style={styles.container}>
      {mapView}
      {bottomNagivationBackground}
      {bottomNagivationButtons(
        handleResync,
        'Resync',
        () => navigation.navigate('Settings'),
        'Settings',
        () => setHidden(hidden = false),
        'Nearby',
        () => navigation.navigate('Profile'),
        'Profile',
        'menu'
      )}
      {profileButton(() => navigation.navigate('Profile'))}
      { !hidden && (musicMenu) }
      { hidden && (collapsedMenu) }
    </View>
    {login && (loginScreen)}
    </>
  );
};
  
function ProfileScreen({navigation}){
  const profileHeader = (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <Text style={{fontSize: 40, fontWeight: "bold", color: "white"}}>
        Profile
      </Text>
    </View>
  );

  const profileText = (
    <View style={{ flex: 5, justifyContent: 'flex-start' }}>
      <Text style={{fontSize: 20, color: "white"}}>{profileInfo}</Text>  
    </View>
    );

  return (
    <View style={styles.container}>
      {profileHeader}
      {profileText}
      {bottomNagivationBackground}
      {bottomNagivationButtons(
        () => navigation.navigate('Profile'),
        'Profile',
        () => navigation.navigate('Settings'),
        'Settings',
        () => (navigation.navigate('Home')),
        'Return',
        () => (navigation.navigate('Home')),
        'Settings',
        'other'
      )}
      {profileButton(() => navigation.navigate('Profile'))}
    </View>
  );
};

function SettingsScreen({navigation}){
  const [enabled, isEnabled] = React.useState(toggleSwitch);

  const settingsHeader = (<View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
    <Text style={{fontSize: 40, fontWeight: "bold", color: "white"}}>Settings</Text>
  </View>)

  const settingsText = (<View style={{ flex: 5, justifyContent: 'flex-start' }}>
    <Text style={{fontSize: 20, color: "white"}}>Remove consent to sharing map data </Text>
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={enabled ? "#f5dd4b" : "#f4f3f4"}
      onValueChange={() => {toggleSwitch = !enabled; isEnabled(previousState => !previousState); DBInterfaceInstance.updateLocationShareStatus(currUser.spotifyID, toggleSwitch);}}
      value={enabled}
    />
  </View>)
  
  return (
    <View style={styles.container}>
      {settingsHeader}
      {settingsText}
      {bottomNagivationBackground}
      {bottomNagivationButtons(
        () => navigation.navigate('Profile'),
        'Profile',
        () => navigation.navigate('Settings'),
        'Settings',
        () => (navigation.navigate('Home')),
        'Return',
        () => (navigation.navigate('Home')),
        'Settings',
        'other'
      )}
      {profileButton(() => navigation.navigate('Profile'))}
    </View>
  );
};


// Bottom bar button navigation
const bottomNagivationButtons = (left, leftText, midLeft, midLeftText, midRight, midRightText, right, rightText, screenView) => {

  return (
  <View style={{
    position: 'absolute',
    bottom: 30,
    width: '100%',
    zIndex: 1
  }}>
    
    <View style={{ // Spacing Buttons
      justifyContent: 'space-evenly',
      flexDirection: 'row', 
    }}>
      
      {screenView == 'menu' && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.button]}
          onPress={left}
        >
          <View style={[styles.centering]}>
            <Icon_EvilIcons
              name='refresh'
              color='white'
              size={40}
            />
          </View>
          <View style={{marginBottom: '10%'}}>
            <Text style={[styles.buttonText]}>
              {leftText}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      
      {screenView == 'other' && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.button]}
          onPress={left}
        >
          <View style={[styles.centering]}>
            <Icon_EvilIcons
              name='user'
              color='white'
              size={40}
            />
          </View>
          <View style={{marginBottom: '10%'}}>
            <Text style={[styles.buttonText]}>
              {leftText}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.button]}
          onPress={midLeft}
        >
        <View style={[styles.centering]}>
          <Icon_EvilIcons 
            name='gear'
            color='white'
            size={33}
          />
        </View>
        <View style={{marginBottom: '10%'}}>
          <Text style={[styles.buttonText]}>
            {midLeftText}
          </Text>
        </View>
      </TouchableOpacity>
      

      
      
      <View style={{width: 90}}/>

      {screenView == 'menu' && (
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.bottomExitButton]}
        onPress={midRight}
      >
        <View style={[styles.centering]}>
          <Icon_Entypo
            name='list'
            color='white'
            size={34}
            style={{marginLeft: 'auto',
            marginRight: 'auto'}}></Icon_Entypo>
            
          
        </View>
        <View style={{marginBottom: '10%'}}>
          <Text style={[styles.buttonText]}>
            {midRightText}
          </Text>
        </View>
      </TouchableOpacity>
      )}
      {screenView == 'other' && (
        <TouchableOpacity
          activeOpacity={0.5}
          style={[styles.bottomExitButton]}
          onPress={midRight}
        >
        <View style={[styles.centering]}>
          <Icon_Entypo
              name='back'
              color='white'
              size={30}
              style={{marginLeft: 'auto',
                    marginRight: 'auto'}}
            />
        </View>
        <View style={{marginBottom: '10%'}}>
            <Text style={[styles.buttonText]}>
              {midRightText}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      
    </View>
  </View>
  );
};

const profileButton = (press) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={[styles.profileButton]}
    onPress={press}
  >
    <View style={[styles.profileButtonInner]}/>
  </TouchableOpacity>
);

const bottomNagivationBackground = ( // Background
<View style={{
  position: 'absolute',
  bottom: 0,
  width: '100%'
}}>
  <View style={{ // Background color
    position: 'relative',
    bottom: 0,
    backgroundColor: 'rgba(40,40,40,255)',
    width: '100%',
    height: 70
  }}/>
</View>
);
