//update users current song function updateSong(userid, songObj)

//initialize user userInit(userid, display_name, spotify_url, premium, long, lat, playback)

//update users current location updateLocation(userid, long, lat)

//update users playback state(userid, playback_state)
import { ref, set, update } from "firebase/database";
//import { getDatabase, ref, set, onValue, get, update, setValue, child } from "firebase/database";
//import { update, setValue, child } from "firebase/reference";

// Firebase doesn't store values of null
PLACEHOLDER_STRING = "-1";
PLACEHOLDER_VALUE = -1;

class SpotifyToDB {
    constructor(database) {
        this.db = database;
    }

    initUser(userid, _name=PLACEHOLDER_STRING, _spotify_url=PLACEHOLDER_STRING,
             _premium=false, _sharing=false, _lat=PLACEHOLDER_VALUE,
             _long=PLACEHOLDER_VALUE, _playback=PLACEHOLDER_VALUE) {
        const userRef = ref(this.db, 'users/' + userid);
        // Do we want to add options to initialize with a song or whether they're
        // sharing their location
        // What's spotify_url and playback??? And do we really need them?
        set(userRef, {
            // For now the things I don't know are set to null
            name: _name,  // Display name
            music: PLACEHOLDER_STRING,  // Song being listened to
            premium: _premium,  // Whether user has Spotify Premium
            sharing: _sharing,  // Whether user is sharing location
            coordinates: {
                latitude: _lat,  // User's location: latitude
                longitude: _long  // User's location: longitude
            },
            // Unsure about these two below, but adding them anyway
            spotify_url: _spotify_url,  // User's Spotify account URL
            playback: _playback  // Whether user is listening to music
        });
    }

    updateSong(userid, songObj=null) {
        const userRef = ref(this.db, 'users/' + userid);
        if (songObj !== null) {
            update(userRef, { "music": songObj });
        }
    }

    // Pass in null to _lat/_long to keep it the same as before
    updateLocation(userid, _lat=null, _long=null) {
        const coordinatesRef = ref(this.db, 'users/' + userid + '/coordinates');
        if (_lat !== null) {
            //coordinatesRef.child("latitude").setValue(_lat);
            update(coordinatesRef, { "latitude": _lat });
        }
        if (_long !== null) {
            //coordinatesRef.child("longitude").setValue(_long);
            update(coordinatesRef, { "longitude": _long });
        }
    }

    updatePlaybackState(userid, _playback=null) {
        const userRef = ref(this.db, 'users/' + userid);
        if (_playback !== null) {
            //userRef.child("playback").setValue(_playback);
            update(userRef, { "playback": _playback });
        }
    }
}

export default SpotifyToDB;
