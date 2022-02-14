//update users current song function updateSong(userid, songObj)

//initialize user userInit(userid, display_name, spotify_url, premium, long, lat, playback)

//update users current location updateLocation(userid, long, lat)

//update users playback state(userid, playback_state)

class SpotifyToDB {
    constructor() {}

    initUser(db, userid, _name=null, _spotify_url=null,
             _premium=false, _lat=null, _long=null, _playback=null) {
        const userRef = ref(db, 'users/' + userid)
        // What's spotify_url and playback??? And do we really need them?
        set(userRef, {
            // For now the things I don't know are set to null
            name: _name,  // Display name
            music: null,  // Song being listened to
            premium: _premium,  // Whether user has Spotify Premium
            sharing: null,  // Whether user is sharing location
            coordinates.latitude: _lat,  // User's location: latitude
            coordinates.longitude: _long  // User's location: longitude
            // Unsure about these two below, but adding them anyway
            spotify_url: _spotify_url
            playback: _playback
        });
        // The stuff above should work, but in case the coordinates cause problems,
        // comment out those two lines and uncomment the stuff below:
        /*set(ref(db, 'users/' + userid + '/coordinates'), {
            latitude: _lat,
            longitude: _long
        });*/
    }

    updateSong(userid, songObj) {
        const userRef = ref(db, 'users/' + userid)
        update(userRef, { music: songObj });
    }

    // Pass in null to _lat/_long to keep it the same as before
    updateLocation(db, userid, _lat=null, _long=null) {
        const coordinatesRef = ref(db, 'users/' + userid + 'coordinates');
        if (_lat !== null) {
            update(coordinatesRef, { latitude: _lat });
        }
        if (_long !== null) {
            update(coordinatesRef, { longitude: _long });
        }
    }

    getPlaybackState(authtoken) {

    }

    getCurrSong(authtoken) {

    }

    getObjectInfo(spotifyObj, authtoken) {

    }

    getCurrUserInfo(authtoken) {

    }
}

const SpotifyToDB = new SpotifyToDB();

export default SpotifyToDB;