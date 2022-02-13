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
  