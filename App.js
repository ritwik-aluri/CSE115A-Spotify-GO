import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { getDatabase } from "firebase/database";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
// import { Icon } from 'react-native-elements';

export default function App() {
  const[text, onChangeText] = React.useState("Search ...");
  const [hidden, setHidden] = React.useState(true);
  var config = {
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
  const database = getDatabase();
  // var rootRef = firebase.database().ref();
  // var key = rootRef.key();

  const dataset = [
    {
      id: 'test',
      title: 'User 1',
    },
    {
      id: 'test1',
      title: 'User 2',
    },
  ];

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
          title={'Test'}
          description={'Test Desc.'}
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
        <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
          <Text style = {[styles.buttonText]}>Relocate</Text>
        {/* <Icon name = 'direction' type = 'Entypo' color = 'rgba(45,45,45,255)' size = {35}/> */}
        </View>
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
        <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'refresh' type = 'EvilIcons' color = 'white' size = {40}/> */}
            <Text style = {[styles.buttonText]}>Resync</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity='1' style={[styles.button]}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            {/* <Icon name = 'list' type = 'entypo' color = 'white' size = {34}/> */}
            <Text style = {[styles.buttonText]} onPress = {() => setHidden(false)}>Nearby</Text>
          </View>
          {/* <View style = {{height: 8}}/> */}
        </TouchableOpacity>
        <View style = {{width: 90}}/>
        <TouchableOpacity activeOpacity='1' style={[styles.button]}></TouchableOpacity>
        <TouchableOpacity activeOpacity='1' style={[styles.button]}>
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
    }} onPress = {() => setHidden(true)}>
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
        data = {dataset}
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

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    width: 65,
    height: 65,
    borderRadius: 10,
    backgroundColor: 'rgba(45,45,45,255)',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    opacity: 0.9,
    elevation: 5
  },
  rightButton: {
    width: 65,
    height: 65,
    borderRadius: 10,
    backgroundColor: 'rgba(180,180,180,255)',
    shadowOpacity: 0.75,
    shadowRadius: 5,
    elevation: 3,
    opacity: 0.9
  },
  profileButtonInner: {
    alignSelf: 'center',
    bottom: -6,
    backgroundColor: 'rgba(180,180,180,255)',
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  buttonText: {
    position: 'relative',
    alignSelf: 'center',
    color: 'white',
  },
  musicMenu: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 110,
    width: '98%',
    height: 70,
    borderRadius: 10,
    backgroundColor: 'rgba(45,45,45,255)',
    opacity: 0.95,
    shadowOpacity: 0.75,
    shadowRadius: 5,
    zIndex: 1
  },
});

var darkMap = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];