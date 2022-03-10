import { StyleSheet } from 'react-native';
export { styles };

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      width: '100%',
      backgroundColor: "#555555",
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
    bigButton: {
      width: 138,
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
    profileAvatar: {
      alignSelf: 'center',
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
    templateEntry: {
      width: 60,
      height: 60,
      left: 5,
      backgroundColor: 'rgba(10,120,50,100)',
      borderRadius: 5,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 4
    },
    calloutMenu: {
      width: 375,
      height: 70,
      borderRadius: 5,
      backgroundColor: 'rgba(45,45,45,255)',
      opacity: 0.95,
      shadowOpacity: 0.75,
      shadowRadius: 5,
      elevation: 1
    },
    calloutPointer: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 0,
      height: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderTopWidth: 20,
      borderStyle: 'solid',
      backgroundColor: 'transparent',
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'rgba(45,45,45,255)',
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
    },
    markerCircle: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: 'rgba(90,118,88,255)',
    },
    markerInner: {
      position: 'relative',
      marginTop: 'auto',
      marginBottom: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 10,
      height: 10,
      borderRadius: 4, 
      backgroundColor: 'rgba(74,203,79,255)'
    }
  });
  