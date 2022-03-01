import React from 'react';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
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
  } from 'react-native';
import { styles } from './interfaceStyle.js';
import { darkMap } from './mapStyle.js';
import Icon_Entypo from 'react-native-vector-icons/Entypo';
import Icon_EvilIcons from 'react-native-vector-icons/EvilIcons';
import Spotify from "./android/app/src/spotify_auth/spotifyAPI";
import authHandler from "./android/app/src/spotify_auth/authenticationHandler";
import {longitude, latitude} from "./App.js";

let token_data;
authHandler.onLogin().then((result) => { token_data = result; console.log("token set"); });


export { HomeScreen, ProfileScreen, SettingsScreen };
import { userList } from './App.js';

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
  }

  const handleSongTest = () => {
    console.log(token_data);
    Spotify.getCurrSong(token_data["accessToken"]);
    Spotify.getCurrUserInfo(token_data["accessToken"]);
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
            />
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

  const listMenu = (
    <View style={[styles.collapsedMenu]}>
      <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto'}}>
        <View style={{
          width: 60,
          height: 60,
          left: 5,
          backgroundColor: 'rgba(10,120,50,100)',
          borderRadius: 5,
          shadowOpacity: 0.75,
          shadowRadius: 5,
          elevation: 4
          }}
        />
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
      { hidden && (listMenu) }
    </View>
  );
};
  
function ProfileScreen({navigation}){
  const profileHeader = (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <Text style = {{fontSize: 40, fontWeight: "bold"}}>
        Profile
      </Text>
    </View>
  );

  const profileText = (
    <View style={{ flex: 3, justifyContent: 'flex-start' }}>
      <Text style = {{fontSize: 20}}>
        Username:
      </Text>
      <Text>
        {"\n"}
      </Text>
      <Text style={{fontSize:20}}>
        Current Song Playing:
      </Text>
    </View>
    );

  return (
    <View style={styles.container}>
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
  const settingsText = (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        Settings Screen
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
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
