import { StyleSheet } from 'react-native';
export { styles };

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
      opacity: 1,
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
    profileButton: {
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
      // position: 'absolute',
      alignSelf: 'center',
      width: '95%',
      height: '80%',
      bottom: 110,
      borderRadius: 5,
      backgroundColor: 'rgba(45,45,45,255)',
      opacity: 0.95,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 4
    },
    collapsedMenu: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 110,
      width: '95%',
      height: 70,
      borderRadius: 5,
      backgroundColor: 'rgba(45,45,45,255)',
      opacity: 0.95,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 1
    },
    exitButton: {
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: 5,
      backgroundColor: 'rgba(100,100,100,255)',
      elevation: 4
    },
    listArea: {
      position: 'relative',
      alignSelf: 'center',
      top: 5,
      width: '100%',
      height: '92%'
    },
    listItem: {
      position: 'relative',
      alignSelf: 'center',
      width: '100%',
      height: 70,
      borderRadius: 5,
      opacity: 0.95
    },
    centering: {
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    searchBar: {
      position: 'absolute',
      backgroundColor: 'white',
      top: 20,
      left: 5,
      borderWidth: 1,
      borderRadius: 6,
      width: '65%',
      padding: 5,
    },
    searchBarText: {
      borderColor: 'black',
      width: '50%',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    }
  });
  