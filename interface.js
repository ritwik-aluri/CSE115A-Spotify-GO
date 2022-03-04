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
  } from 'react-native';
import { styles } from './interfaceStyle.js';
import { darkMap } from './mapStyle.js';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import Icon_EvilIcons from 'react-native-vector-icons/EvilIcons';
import Spotify from "./android/app/src/spotify_auth/spotifyAPI";
import authHandler from "./android/app/src/spotify_auth/authenticationHandler";
import { longitude, latitude, token_data } from "./App.js";


let profileInfo = "Username: \n\nCurrent Song Playing:";
let username = "";
let currSong = "";

export { HomeScreen, ProfileScreen, SettingsScreen };
import { userList } from './App.js';
let toggleSwitch;



function HomeScreen({navigation}){
  let [text, onChangeText] = React.useState("Search ...");
  let [hidden, setHidden] = React.useState(true);
  
  const Item = ({ item }) => (
    <View style={[styles.listItem]}>
      <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto'}}>
        <View style={{width: '90%', flexDirection: 'row'}}>
          <View style={{
            width: 60,
            height: 60,
            left: 5,
            backgroundColor: 'rgba(10,120,50,100)',
            borderRadius: 5
            }}
          />
          <View style={{flexDirection: 'column', justifyContent: 'center', left: 12}}>
            <Text style={{color: 'white'}}>{item.title}</Text>
            <Text style={{color: 'grey'}}>{item.artist}</Text>
            <Text style={{color: 'grey'}}>
              User: {item.id}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.5}
          style={{justifyContent: 'center', width: '10%'}}
        >
          <Icon_Entypo
            name="dots-three-horizontal"
            color="grey"
            size={18}
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

  let [currLatitude, setLatitude] = React.useState(0);
  let [currLongitude, setLongitude] = React.useState(0);

  const handleResync = () => {
    setLatitude(currLatitude = latitude);
    setLongitude(currLongitude = longitude);
    profileInfo = "Username: " + username + "\n\nCurrent Song Playing: " + currSong;
  }

  const handleSongTest = () => {
    console.log(token_data);
    Spotify.getCurrSong(token_data["accessToken"]).then((data) => {console.log(data); currSong = data.item.name;});
    Spotify.getCurrUserInfo(token_data["accessToken"]).then((userdata) => {console.log(userdata); username = userdata.display_name;});

    
    /*Spotify.saveSong("4cOdK2wGLETKBW3PvgPWqT", token_data["accessToken"])*/ 
  }

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
      showsUserLocation={true}>
      {userList[0] != null && userList.map((marker, index) => {
        console.log(userList[0]);
        if (marker.latitude != null && marker.longitude != null) {
          return (
            <MapView.Marker
              key={index}
              pinColor={'navy'}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title={marker.id}
              description={"Current Song: " + marker.title}
            >
              <View style={[styles.markerCircle]}>
                <View style={[styles.markerInner]}></View>
              </View>
              <Callout tooltip>
                <View>
                  <View style={[styles.calloutMenu]}>
                    <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto'}}>
                      <View style={[styles.templateEntry]}
                      />
                      <View style={{flexDirection: 'column',
                                    justifyContent: 'center',
                                    left: 12}}
                      >
                        <Text style={{color: 'white'}}>
                          {marker.title}
                        </Text>
                        <Text style={{color: 'grey'}}>
                          N/A
                        </Text>
                        <Text style={{color: 'grey'}}>
                          User: {marker.id}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.calloutPointer]}></View>
                </View>
              </Callout>
            </MapView.Marker>
          );
        }
      })}
    </MapView>
  );

  const searchBar = ( // Search Bar Display
    <View style={[styles.searchBar]}>
      <TextInput
        styles={[styles.searchBarText]}
        onChangeText={onChangeText}
        placeholder={"Search..."}
      />
    </View>
  );

  const rightSideButtons = ( // Right-side buttons
    <View style = {{
      position: 'absolute',
      top: 20,
      right: 5
    }}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.rightButton]}
      >
      </TouchableOpacity>

      <View style={{height: 10}}/>
      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.rightButton]}
      >
        <Icon_Entypo
          name="direction"
          color='rgba(45,45,45,255)'
          size={35}
          style={{marginLeft: 'auto',
                  marginRight: 'auto',
                  marginTop: '23%'}}
        />
        <Text style={[styles.buttonText]}></Text>
      </TouchableOpacity>
    </View>
  );

  const bottomNagivationBackground = ( // Background
    <View style={{
      position: 'absolute',
      bottom: 0,
      width: '100%'
    }}>
      {/* <View style = {{ // Background gradiance
        position: 'relative',
        alignSelf: 'center',
        background: 'linear-gradient(to top, rgba(40,40,40,255), rgba(255,0,0,0))',
        width: '100%',
        height: 30
      }} /> */}
      <View style={{ // Background color
        position: 'relative',
        bottom: 0,
        backgroundColor: 'rgba(40,40,40,255)',
        width: '100%',
        height: 70
      }}/>
    </View>
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
        <View style={[styles.templateEntry]}/>
        <View style={{flexDirection: 'column',
                      justifyContent: 'center',
                      left: 12}}
        >
          <Text style={{color: 'white'}}>
            N/A
          </Text>
          <Text style={{color: 'grey'}}>
            N/A
          </Text>
          <Text style={{color: 'grey'}}>
            User: N/A
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {mapView}
      {bottomNagivationBackground}
      {searchBar}
      {rightSideButtons}
      {bottomNagivationButtons(
        handleResync,
        "Resync",
        () => setHidden(hidden = false),
        "Nearby",
        () => handleSongTest(),
        "Test Button",
        () => navigation.navigate('Settings'),
        "Settings"
      )}
      {profileButton(() => navigation.navigate('Profile'))}
      { !hidden && (musicMenu) }
      { hidden && (collapsedMenu) }
    </View>
  );
};
  
function ProfileScreen({navigation}){
  const profileHeader = (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <Text style = {{fontSize: 40, fontWeight: "bold", color: "white"}}>
        Profile
      </Text>
    </View>
  );

  const profileText = (
    <View style={{ flex: 5, justifyContent: 'flex-start' }}>
      <Text style = {{fontSize: 20, color: "white"}}>{profileInfo}</Text>  
    </View>
    );

    const exitButton = (
      <TouchableOpacity activeOpacity = '1' style={[styles.button]} onPress={() => navigation.navigate('Home')}>
        <View style = {{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}><Icon_Entypo name="cross" color="white" size={33}/></View>
        <View style = {{marginTop: '10%'}}><Text style = {[styles.buttonText]}>Return</Text></View>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      {exitButton}
      {profileHeader}
      {profileText}
      {bottomNagivationButtons(
        () => ("NULL"),
        "Resync",
        () => ("NULL"),
        "Nearby",
        () => navigation.navigate('Profile'),
        "Test Button",
        () => navigation.navigate('Settings'),
        "Settings"
      )}
      {profileButton(() => navigation.navigate('Profile'))}
    </View>
  );
};

function SettingsScreen({navigation}){
  const [enabled, isEnabled] = React.useState(true);
  const exitButton = (
    <TouchableOpacity activeOpacity = '1' style={[styles.button]} onPress={() => navigation.navigate('Home')}>
      <View style = {{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}><Icon_Entypo name="cross" color="white" size={33}/></View>
      <View style = {{marginTop: '10%'}}><Text style = {[styles.buttonText]}>Return</Text></View>
    </TouchableOpacity>
  )
  const settingsHeader = (<View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
    <Text style = {{fontSize: 40, fontWeight: "bold", color: "white"}}>Settings</Text>
  </View>)
  const settingsText = (<View style={{ flex: 5, justifyContent: 'flex-start' }}>
    <Text style = {{fontSize: 20, color: "white"}}>Remove consent to sharing data </Text>
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  </View>)
  
  return (
    <View style={styles.container}>
      {exitButton}
      {settingsHeader}
      {settingsText}
      {bottomNagivationButtons(
        () => ("NULL"),
        "Resync",
        () => ("NULL"),
        "Nearby",
        () => navigation.navigate('Profile'),
        "Test Button",
        () => navigation.navigate('Settings'),
        "Settings"
      )}
      {profileButton(() => navigation.navigate('Profile'))}
    </View>
  );
};


// Bottom bar button navigation
const bottomNagivationButtons = (left, leftText, midLeft, midLeftText, midRight, midRightText, right, rightText) => (
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
          <Text style = {[styles.buttonText]}>
            {leftText}
          </Text>
          </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.button]}
        onPress={midLeft}
      >
        <View style={[styles.centering]}>
          <Icon_Entypo
            name='list'
            color='white'
            size={34}
            style={{marginLeft: 'auto',
                    marginRight: 'auto'}}
          />
        </View>
        <View style={{marginBottom: '10%'}}>
          <Text style = {[styles.buttonText]}>
            {midLeftText}
          </Text>
        </View>
      </TouchableOpacity>

      <View style = {{width: 90}}/>

      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.button]}
        onPress={midRight}
      >
        <View style={[styles.centering]}>
          <Text style={[styles.buttonText]}>
            {midRightText}
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={[styles.button]}
        onPress={right}
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
            {rightText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

const profileButton = (press) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={[styles.profileButton]}
    onPress={press}
  >
    <View style={[styles.profileButtonInner]}/>
  </TouchableOpacity>
);
