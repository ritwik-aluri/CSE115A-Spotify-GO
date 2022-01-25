import SwipeUpDown from 'react-native-swipe-up-down'
import React from "react";
import { StyleSheet, SafeAreaView, View, TouchableOpacity, Text, TextInput } from 'react-native';

function App() {
  const[text, onChangeText] = React.useState("Search ...")
  return (
    <>
    {/* <SwipeUpDown	//THIS IS THE SWIPE UP LIST
	      itemMini = {<li className = "buttonList"><button className = "barButton" id = "songListButton">List</button></li>} // Pass props component when collapsed
	      itemFull = {<div className = "songListDown" id = "songList">
        <a href = "#">1</a>
        <a href = "#">2</a>
        <a href = "#">3</a>
        <a href = "#">4</a>
        <a href = "#">5</a>
        <a href = "#">6</a>
        </div>} // Pass props component when show full
    	  onShowMini={() => console.log('mini')}
	      onShowFull={() => console.log('full')}
	      onMoveDown={() => console.log('down')}
	      onMoveUp={() => console.log('up')}
	      disablePressToShow={false} // Press item mini to show full
	      style={{
          backgroundColor: 'green',
          zIndex: 100,
        }} // style for swipe
      /> */}
    <View style = {{ // THIS IS THE BACKGROUND OF THE APP
      flexDirection: 'column',
      flex: 1,
    }}>
      <View style = {{ // THIS IS THE SEARCH BAR
        backgroundColor: 'white',
        top: 20,
        left: 5,
        borderWidth: 1,
        borderRadius: 10,
        width: "50%",
        padding: 5,
      }}>
        <TextInput styles = {{
            borderColor: "black",
            width: "50%",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
          }}
            onChangeText = {onChangeText}
            placeholder = "Search..."
        ></TextInput>
      </View>

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
          <TouchableOpacity activeOpacity='0.8' style={[styles.button]}> 
            <Text style = {[styles.buttonText]}>Resync</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity='0.8' style={[styles.button]}></TouchableOpacity>
          <View style = {{width: 90}}/>
          <TouchableOpacity activeOpacity='0.8' style={[styles.button]}></TouchableOpacity>
          <TouchableOpacity activeOpacity='0.8' style={[styles.button]}>
          <Text style = {[styles.buttonText]}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style = {{ // Background
        position: 'absolute',
        bottom: 0,
        width: '100%'
      }}>
        <View style = {{ // Background gradiance
          position: 'relative',
          alignSelf: 'center',
          background: 'linear-gradient(to top, rgba(40,40,40,255), rgba(255,0,0,0))',
          width: '100%',
          height: 30
        }} />
        <View style = {{ // Background color
          position: 'relative',
          bottom: 0,
          backgroundColor: 'rgba(40,40,40,255)',
          width: '100%',
          height: 70
        }} />
      </View>
      <TouchableOpacity activeOpacity='0.8' style = {{ // Profile button
        position: 'absolute',
        alignSelf: 'center',
        background: 'linear-gradient(to top, rgba(35,35,35,255), rgba(60,60,60,255))',
        shadowOpacity: 1,
        shadowRadius: 10,
        width: 85,
        height: 85,
        borderRadius: 50,
        bottom: 20,
        zIndex: 10
      }} >
        <View style = {[styles.profileButtonInner]} />
       </TouchableOpacity>
    </View>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  button: {
    width: 65,
    height: 65,
    borderRadius: 10,
    backgroundColor: 'rgba(45,45,45,255)',
    shadowOpacity: 0.75,
    shadowRadius: 5,
  },
  profileButtonInner: {
    alignSelf: 'center',
    bottom: -6,
    backgroundColor: 'rgba(100,100,100,255)',
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  buttonText: {
    position: 'relative',
    top: 40,
    alignSelf: 'center',
    color: 'white',
  },
});
