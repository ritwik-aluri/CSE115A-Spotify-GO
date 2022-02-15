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


var token_data;
authHandler.onLogin().then((result) => { token_data = result; console.log("token set"); });


export { HomeScreen, ProfileScreen, SettingsScreen };
import { userList } from './App.js';

function HomeScreen({navigation}){
    let [text, onChangeText] = React.useState("Search ...");
    let [hidden, setHidden] = React.useState(true);
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
      </TouchableOpacity>
    );
  
    const [selectedId, setSelectedId] = React.useState(null);
    const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "grey" : "grey";
      const color = item.id === selectedId ? 'white' : 'black';
      return (
        <Item
          item={item}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };
  
    
    const mapView = ( // Map Display
      <MapView
          provider={PROVIDER_GOOGLE} // Remove this if we're not using Google Maps
          style={styles.map}
          customMapStyle={darkMap}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}>
          <Marker
            coordinate={{latitude: 37.78825, longitude: -122.4324}}
            pinColor={'darkgrey'}
            title={userList[0].id}
            description={userList[0].title}
          />
        </MapView>
    );
  
    const searchBar = ( // Search Bar Display
      <View style = {{
        position: 'absolute',
        backgroundColor: 'white',
        top: 20,
        left: 5,
        borderWidth: 1,
        borderRadius: 6,
        width: '65%',
        padding: 5,
      }}>
        <TextInput styles = {{
            borderColor: 'black',
            width: '50%',
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
            onChangeText = {onChangeText}
            placeholder = "Search..."
        ></TextInput>
      </View>
    );
  
    const rightSideButtons = (
      <View style = {{ // Right-side buttons
        position: 'absolute',
        top: 20,
        right: 5
      }}>
        <TouchableOpacity activeOpacity = '1' style = {[styles.rightButton]}>
        </TouchableOpacity>
        <View style = {{height: 10}}/>
        <TouchableOpacity activeOpacity = '1' style = {[styles.rightButton]}>
            <Icon_Entypo name = "direction" color = 'rgba(45,45,45,255)' size = {35} style = {{marginLeft: 'auto', marginRight: 'auto', marginTop: '23%'}}/>
          <Text style = {[styles.buttonText]}></Text>
        </TouchableOpacity>
      </View>
    )
  
    const bottomNagivationBackground = (
      <View style = {{ // Background
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
        <View style = {{ // Background color
          position: 'relative',
          bottom: 0,
          backgroundColor: 'rgba(40,40,40,255)',
          width: '100%',
          height: 70
        }} />
      </View>
    )
  
  const bottomNagivationButtons = (
    <View style = {{ // Bottom bar button navigation
      position: 'absolute',
      bottom: 30,
      width: '100%',
      zIndex: 1
    }}>
      <View style = {{ // Spacing Buttons
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      }}>
        <TouchableOpacity activeOpacity='1' style={[styles.button]}>
          <View style = {{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}><Icon_EvilIcons name = 'refresh' color = 'white' size = {40}/></View>
          <View style = {{marginBottom: '10%'}}><Text style = {[styles.buttonText]}>Resync</Text></View>

        </TouchableOpacity>
  
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress = {() => setHidden(hidden = false)}>
          <View style = {{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}><Icon_Entypo name = 'list' color = 'white' size = {34} style = {{marginLeft: 'auto', marginRight: 'auto'}}/></View>
          <View style = {{marginBottom: '10%'}}><Text style = {[styles.buttonText]} >Nearby</Text></View>
          {/* <View style = {{height: 8}}/> */}
        </TouchableOpacity>
        <View style = {{width: 90}}/>
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress={() => navigation.navigate('Profile')}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto', marginBottom: '10%'}}>
            <Text style={[styles.buttonText]} onPress={() => { console.log(token_data); Spotify.getCurrSong(token_data["accessToken"]); Spotify.getCurrUserInfo(token_data["accessToken"]); /*Spotify.saveSong("4cOdK2wGLETKBW3PvgPWqT", token_data["accessToken"])*/ }}>test button</Text>
            <Text style = {[styles.buttonText]}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress={() => navigation.navigate('Settings')}>
          <View style = {{ marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 'auto'}}><Icon_EvilIcons name = 'gear' color = 'white' size = {33}/></View>
          <View style = {{marginBottom: '10%'}}><Text style = {[styles.buttonText]}>Settings</Text></View>
        </TouchableOpacity>
      </View>
    </View>
  )
  
    const profileButton = (
      <TouchableOpacity activeOpacity='1' style = {{ // Profile button
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'rgba(60,60,60,255)',
        shadowOpacity: 1,
        shadowRadius: 10,
        width: 85,
        height: 85,
        borderRadius: 50,
        bottom: 20,
        zIndex: 10,
        opacity: 0.95
      }}>
        <View style = {[styles.profileButtonInner]} />
       </TouchableOpacity>
    )
  
    const musicMenu = (<View style = {{ // Template menu
      position: 'absolute',
      alignSelf: 'center',
      width: '98%',
      height: '80%',
      bottom: 110,
      borderRadius: 10,
      backgroundColor: 'rgba(45,45,45,255)',
      opacity: 0.95,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 3
    }}>
      <TouchableOpacity activeOpacity = '1' style = {{ // Exit button for menu
        position: 'relative',
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'red',
        elevation: 4
      }} onPress = {() => setHidden(hidden = true)}>
        <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
          {/* <Icon name = 'cross' type = 'entypo' color = 'black' size = {38}/> */}
        </View>
      </TouchableOpacity>
      <SafeAreaView style = {{
        flex: 1,
        position: 'relative',
        alignSelf: 'center',
        width: '95%',
        height: '10%',
        top: 10,
        //backgroundColor: 'black'
      }}>
        <FlatList
          data = {userList}
          renderItem = {renderItem}
        />
      </SafeAreaView>
    </View>
    );
    return (
      <View style={styles.container}>
        {mapView}
        {bottomNagivationBackground}
        {searchBar}
        {rightSideButtons}
        {bottomNagivationButtons}
        {profileButton}
        { !hidden && (musicMenu)}
        { hidden && (<TouchableOpacity // Music Menu
          style = {[styles.musicMenu]}
          activeOpacity = {0.95}
        />)}
      </View>
    );
  }
  
function ProfileScreen({navigation}){
  const bottomNagivationButtons = (
    <View style = {{ // Bottom bar button navigation
      position: 'absolute',
      bottom: 30,
      width: '100%',
      zIndex: 1
    }}>
      <View style = {{ // Spacing Buttons
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      }}>
        <TouchableOpacity activeOpacity='1' style={[styles.button]}>
        <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'refresh' type = 'EvilIcons' color = 'white' size = {40}/> */}
            <Text style = {[styles.buttonText]}>Resync</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress = {() => setHidden(hidden = false)}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'list' type = 'entypo' color = 'white' size = {34}/> */}
            <Text style = {[styles.buttonText]} >Nearby</Text>
          </View>
          {/* <View style = {{height: 8}}/> */}
        </TouchableOpacity>
        <View style = {{width: 90}}/>
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress={() => navigation.navigate('Profile')}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'gear' type = 'evilicon' color = 'white' size = {33}/> */}
            {/* <View style = {{height: 2}}/> */}
            <Text style = {[styles.buttonText]}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress={() => navigation.navigate('Settings')}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'gear' type = 'evilicon' color = 'white' size = {33}/> */}
            {/* <View style = {{height: 2}}/> */}
            <Text style = {[styles.buttonText]}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
  const profileButton = (
    <TouchableOpacity activeOpacity='1' style = {{ // Profile button
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: 'rgba(60,60,60,255)',
      shadowOpacity: 1,
      shadowRadius: 10,
      width: 85,
      height: 85,
      borderRadius: 50,
      bottom: 20,
      zIndex: 10,
      opacity: 0.95
    }}>
      <View style = {[styles.profileButtonInner]} />
     </TouchableOpacity>
  )
  const profileText = (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Profile Screen</Text>
</View>)
  return (
    <View style={styles.container}>
      {profileText}
      {bottomNagivationButtons}
      {profileButton}
    </View>
  );
}

function SettingsScreen({navigation}){
  const bottomNagivationButtons = (
    <View style = {{ // Bottom bar button navigation
      position: 'absolute',
      bottom: 30,
      width: '100%',
      zIndex: 1
    }}>
      <View style = {{ // Spacing Buttons
        justifyContent: 'space-evenly',
        flexDirection: 'row',
      }}>
        <TouchableOpacity activeOpacity='1' style={[styles.button]}>
        <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'refresh' type = 'EvilIcons' color = 'white' size = {40}/> */}
            <Text style = {[styles.buttonText]}>Resync</Text>
          </View>
        </TouchableOpacity>
  
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress = {() => setHidden(hidden = false)}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'list' type = 'entypo' color = 'white' size = {34}/> */}
            <Text style = {[styles.buttonText]} >Nearby</Text>
          </View>
          {/* <View style = {{height: 8}}/> */}
        </TouchableOpacity>
        <View style = {{width: 90}}/>
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress={() => navigation.navigate('Profile')}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'gear' type = 'evilicon' color = 'white' size = {33}/> */}
            {/* <View style = {{height: 2}}/> */}
            <Text style = {[styles.buttonText]}>Profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity='1' style={[styles.button]} onPress={() => navigation.navigate('Settings')}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'gear' type = 'evilicon' color = 'white' size = {33}/> */}
            {/* <View style = {{height: 2}}/> */}
            <Text style = {[styles.buttonText]}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
  const profileButton = (
    <TouchableOpacity activeOpacity='1' style = {{ // Profile button
      position: 'absolute',
      alignSelf: 'center',
      backgroundColor: 'rgba(60,60,60,255)',
      shadowOpacity: 1,
      shadowRadius: 10,
      width: 85,
      height: 85,
      borderRadius: 50,
      bottom: 20,
      zIndex: 10,
      opacity: 0.95
    }}>
      <View style = {[styles.profileButtonInner]} />
     </TouchableOpacity>
  )
  const settingsText = (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Settings Screen</Text>
</View>)
  return (
    <View style={styles.container}>
      {settingsText}
      {bottomNagivationButtons}
      {profileButton}
    </View>
  );
}
