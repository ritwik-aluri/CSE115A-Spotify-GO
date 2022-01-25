import "./style.css"
import SwipeUpDown from 'react-native-swipe-up-down'
import React from "react"
import {SafeAreaView, StyleSheet, TextInput} from "react-native"
import { View, Text } from "react-native";

function App() {
  const[text, onChangeText] = React.useState("Search ...")


  return (
    <>
    <SwipeUpDown	//THIS IS THE SWIPE UP LIST
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
      />
    <View style = {{ //THIS IS THE BACKGROUND OF THE APP
      backgroundColor: 'black',
      flexDirection: 'column',
      flex: 1,
    }}>
      <View style = {{ //THIS IS THE SEARCH BAR
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
          placeholder = "Search ..."
      ></TextInput>
    </View>
      <View style = {{
        position: 'absolute',
        alignSelf: 'center',
        backgroundColor: 'rgba(255,0,0,0)',
        bottom: 0,
        width: '100%',
        height: 100,
      }}>
        <View style = {{
          position: 'relative',
          alignSelf: 'center',
          background: 'linear-gradient(to top, rgba(50,50,50,255), rgba(255,0,0,0))',
          width: '100%',
          height: 30
        }} />
        <View style = {{
          position: 'relative',
          bottom: 0,
          backgroundColor: 'rgba(50,50,50,255)',
          width: '100%',
          height: 100
        }} />
      </View>
      <View style = {{ 
        position: 'absolute',
        alignSelf: 'center',
        background: 'linear-gradient(to top, rgba(35,35,35,255), rgba(60,60,60,255))',
        shadowOpacity: 1,
        shadowRadius: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
        bottom: 20,
        zIndex: 10
       }} />
    </View>
    </>



  );
}



export default App;

