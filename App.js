//import SwipeUpDown from 'react-native-swipe-up-down'
import React from 'react';
import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native';
import { FlatList } from 'react-native';
import { Dimensions } from 'react-native'; 
import { Animated, PanResponder } from 'react-native'; 
import { SafeAreaView } from 'react-native';
import { StatusBar } from 'react-native';
import { Icon } from 'react-native-elements';

function App() {
  const[text, onChangeText] = React.useState("Search ...");
  const pan = useRef(new Animated.ValueXY()).current;
  const [hidden, setHidden] = React.useState(true);

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

  // Attempt at pull menu, doesn't work
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderGrant: () => {
  //       pan.setOffset({
  //         y: pan.y._value,
  //       });
  //     },
  //     onPanResponderMove: Animated.event([null, { dy: pan.y }], {useNativeDriver: false}),
  //     onPanResponderRelease: () => {
  //       pan.flattenOffset();
  //     },
  //   })
  // ).current;

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
    { !hidden && (
      <View style = {{ // Template menu
        position: 'fixed',
        alignSelf: 'center',
        width: '98%',
        height: '80%',
        bottom: 110,
        borderRadius: 10,
        backgroundColor: 'rgba(45,45,45,255)',
        opacity: 0.95,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        zIndex: 10
      }}>
        <TouchableOpacity activeOpacity = '1' style = {{ // Exit button for menu
          position: 'relative',
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'rgba(35,35,35,255)',
          zIndex: 11
        }} onPress = {() => setHidden(true)}>
          <View style = {{marginTop: 'auto', marginBottom: 'auto'}}>
            <Icon name = 'cross' type = 'entypo' color = 'black' size = {38}/>
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
      </View>)}
    <View style = {{ // THIS IS THE BACKGROUND OF THE APP
      flexDirection: 'column',
      flex: 1,
    }}>
      <View style = {{ // THIS IS THE SEARCH BAR
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
          <Icon name = 'direction' type = 'entypo' color = 'rgba(45,45,45,255)' size = {35}/>
          </View>
          <Text style = {[styles.buttonText]}></Text>
        </TouchableOpacity>
      </View>

      { hidden && (<TouchableOpacity // Music Menu
        style = {[styles.musicMenu]}
        activeOpacity = {0.95}
      >
        {/* <Animated.View style = {{
          position: 'relative',
          alignSelf: 'center',
          backgroundColor: 'rgba(100,100,100,255)',
          height: 4,
          borderRadius: 5,
          width: "10%",
          top: 2,
          zIndex: 2
        }}/> */}
      </TouchableOpacity>)}
      {/* {!hidden && ( // Attempt at pull menu, doesn't work
        <Animated.View
          style = {{
            transform: [{ translateY: pan.y }],
            position: 'absolute',
            bottom: 100
          }}
          {...panResponder.panHandlers}>
            <View style={{
              height: 100,
              width: 600,
              backgroundColor: 'blue',
              zIndex: 40
            }} />
        </Animated.View>
      )} */}
        
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
          <View style = {{marginTop: 'auto', marginBottom: 'auto', bottom: 3}}>
              <Icon name = 'refresh' type = 'evilicon' color = 'white' size = {40}/>
              <Text style = {[styles.buttonText]}>Resync</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity='1' style={[styles.button]}>
            <View style = {{marginTop: 'auto', marginBottom: 'auto', top: 2}}>
              <Icon name = 'list' type = 'entypo' color = 'white' size = {34}/>
            </View>
            <Text style = {[styles.buttonText]} onPress = {() => setHidden(false)}>Nearby</Text>
            <View style = {{height: 8}}/>
          </TouchableOpacity>

          <View style = {{width: 90}}/>

          <TouchableOpacity activeOpacity='1' style={[styles.button]}></TouchableOpacity>

          <TouchableOpacity activeOpacity='1' style={[styles.button]}>
            <View style = {{marginTop: 'auto', marginBottom: 'auto', bottom: -1}}>
              <Icon name = 'gear' type = 'evilicon' color = 'white' size = {33}/>
              <View style = {{height: 2}}/>
              <Text style = {[styles.buttonText]}>Settings</Text>
            </View>
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
      <TouchableOpacity activeOpacity='1' style = {{ // Profile button
        position: 'absolute',
        alignSelf: 'center',
        background: 'linear-gradient(to top, rgba(35,35,35,255), rgba(60,60,60,255))',
        shadowOpacity: 1,
        shadowRadius: 10,
        width: 85,
        height: 85,
        borderRadius: 50,
        bottom: 20,
        zIndex: 10,
        opacity: 0.95
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
    opacity: 0.9,
    zIndex: 20
  },
  rightButton: {
    width: 65,
    height: 65,
    borderRadius: 10,
    backgroundColor: 'rgba(180,180,180,255)',
    shadowOpacity: 0.75,
    shadowRadius: 5,
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
  item: {
    position: 'relative',
    alignSelf: 'center',
    top: 0,
    width: '100%',
    height: 50,
    borderRadius: 5,
  }
});
