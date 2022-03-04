import {
    DataSnapshot,
    ref,
    set, update,
    get, query, child, orderByChild, startAt, endAt
} from "firebase/database";

// These could be passed as parameters to getNearbyUsers()
RADIUS = 100;
MAXNEARBYUSERS = 100;
// Firebase doesn't store values of null, so these are used for placeholder values instead
PLACEHOLDER_STRING = "-1";
PLACEHOLDER_VALUE = -1;

class DBInterface {
    constructor(database) {
        this.db = database;
    }

    initUser(userid, _name=PLACEHOLDER_STRING, _spotify_url=PLACEHOLDER_STRING,
             _premium=false, _sharing=false, _lat=PLACEHOLDER_VALUE,
             _long=PLACEHOLDER_VALUE, _playback=PLACEHOLDER_VALUE,
             songObj=null,
             _music_id=PLACEHOLDER_STRING, _music_url=PLACEHOLDER_STRING,
             _music_name=PLACEHOLDER_STRING, _music_artist=PLACEHOLDER_STRING,
             _music_art=PLACEHOLDER_VALUE) {
        const userRef = ref(this.db, 'users/' + userid);
        if (songObj !== null) {  // A structured song object was NOT passed in
            set(userRef, {
                // Everything has a default value so the database structure is maintained
                name: _name,  // User's display name
                spotify_url: _spotify_url,  // User's Spotify account URL
                playback: _playback,  // Whether user is currently listening to music
                premium: _premium,  // Whether user has Spotify Premium
                // When songObj is NOT null, it should match "music"'s format in the "else" statement
                music: songObj,
                sharing: _sharing,  // Whether user is sharing location
                coordinates: {
                    latitude: _lat,  // User's location: latitude
                    longitude: _long  // User's location: longitude
                },
            });
        }
        else {  // A structured song object WAS passed in
                // Everything is the same except "music"'s internal structure is handled manually
            set(userRef, {
                name: _name,
                spotify_url: _spotify_url,
                playback: _playback,
                premium: _premium,
                // When songObj IS null, it should follow this format:
                music: {  // Object containing variety of song data
                    song_id: _music_id,  // Song's ID on Spotify
                    song_url: _music_url,  // Spotify URL to the music
                    name: _music_name,  // Name of music on Spotify
                    artist: _music_artist,  // Name of artist of music on Spotify
                    art: _music_art  // Album art for this song on Spotify
                },
                sharing: _sharing,
                coordinates: {
                    latitude: _lat,
                    longitude: _long
                },
            });
        }
    }

    // For all functions starting with "update", pass in null to a field to keep it the same as
    // before.

    updateDisplayName(userid, _name=null) {
        const userRef = ref(this.db, 'users/' + userid);
        if (_name !== null) {
            update(userRef, { "name": _name });
        }
    }

    updateAccountURL(userid, _url=null) {
        const userRef = ref(this.db, 'users/' + userid);
        if (_name !== null) {
            update(userRef, { "spotify_url": _url });
        }
    }

    updatePlaybackState(userid, _playback=null) {
        const userRef = ref(this.db, 'users/' + userid);
        if (_playback !== null) {
            update(userRef, { "playback": _playback });
        }
    }

    updatePremiumStatus(userid, _premium=null) {
        const userRef = ref(this.db, 'users/' + userid);
        if (_premium !== null) {
            update(userRef, { "premium": _premium });
        }
    }

    // Update song with a structured song object (as shown in initUser) OR with complete data for
    // ALL of the fields that would create a complete song object
    updateSong(userid, songObj=null, _id=null, _url=null, _name=null, _artist=null, _art=null) {
        const userRef = ref(this.db, "users/" + userid);
        const userMusicRef = ref(this.db, "users/" + userid + "/music");
        if (songObj !== null) {
            update(userRef, { "music": songObj });
        }
        else if (songObj === null &&
                (_id !== null && _url !== null && _name !== null && _artist !== null &&
                _art !== null)) {
            update(userMusicRef, { "song_id": _id,
                                   "song_url": _url,
                                   "name": _name,
                                   "artist": _artist,
                                   "art": _art });
        }
    }

    updateLocationShareStatus(userid, _sharing=null) {
        const userRef = ref(this.db, 'users/' + userid);
        if (_sharing !== null) {
            update(userRef, { "sharing": _sharing });
        }
    }

    // Latitude and longitude can be updated independently of each other in this function (you do
    // not need to pass in values for both)
    updateLocation(userid, _lat=null, _long=null) {
        const coordinatesRef = ref(this.db, 'users/' + userid + '/coordinates');
        if (_lat !== null) {
            update(coordinatesRef, { "latitude": _lat });
        }
        if (_long !== null) {
            update(coordinatesRef, { "longitude": _long });
        }
    }

    // The functions all starting with "get" return data for a specific value for a specific user
    // from the database EXCEPT getNearbyUsers(), which returns a list of data for multiple users.

    async getUser(userid) {
        const userRef = ref(this.db, 'users/' + userid);
        let user = await get(userRef);
        return user.val();
    }

    async getDisplayName(userid) {
        const userRef = ref(this.db, 'users/' + userid);
        let name = await get(child(userRef, "name"));
        return name.val();
    }

    async getAccountURL(userid) {
        const userRef = ref(this.db, 'users/' + userid);
        let spotify_url = await get(child(userRef, "spotify_url"));
        return spotify_url.val();
    }

    async getPlaybackState(userid) {
        const userRef = ref(this.db, 'users/' + userid);
        let playback = await get(child(userRef, "playback"));
        return playback.val();
    }

    async getPremiumStatus(userid) {
        const userRef = ref(this.db, 'users/' + userid);
        let premium = await get(child(userRef, "premium"));
        return premium.val();
    }

    // Update song with a structured song object (as shown in initUser) OR with complete data for
    // ALL of the fields that would create a complete song object
    async getSong(userid) {
        const userRef = ref(this.db, "users/" + userid);
        let song = await get(child(userRef, "music"));
        return song.val();
    }

    async getLocationShareStatus(userid) {
        const userRef = ref(this.db, 'users/' + userid);
        let sharing = await get(child(userRef, "sharing"));
        return sharing.val();
    }

    // Unlike the other "get" functions, getLocation() returns an object containing the latitude and
    // longitude of a user
    async getLocation(userid) {
        const coordinatesRef = ref(this.db, 'users/' + userid + '/coordinates');
        let latVal = await get(child(coordinatesRef, "latitude"));
        let longVal = await get(child(coordinatesRef, "longitude"));
        return {
                    latitude: latVal.val(),
                    longitude: longVal.val()
               };
    }

    // Get "nearby" users entails getting users within +/- 0.5 latitude/longitude of the current user
    // (Getting radius of miles around user is complicated with only latitude/longitude, but doable;
    // this can be added later).
    // Note: Wanted to query by both latitude and longitude simultaneously to avoid taking in excess
    //       data, but that is IMPOSSIBLE with Realtime Database (but possible with Firestore,
    //       though unsure if database structure would've had to change). Firestore would've also
    //       given us actual documentation to make learning about this issue easier.
    //       Sources:
    //         https://stackoverflow.com/questions/48037766/how-can-i-query-and-filter-firebase-realtime-database
    //         and https://firebase.google.com/docs/database/rtdb-vs-firestore
    //       If this app is ever something we decide to fully develop, we should shift to Firestore,
    //       despite the overhead effort for the shift!
    async getNearbyUsers(curUserID) {
        const curUserRef = ref(this.db, 'users/' + curUserID);
        const usersRef = ref(this.db, "users/");
        let latVal = await get(child(curUserRef, "coordinates/latitude"));
        let longVal = await get(child(curUserRef, "coordinates/longitude"));
        // Choosing to get() by longitude; I decided that it would return a more consistent and
        // lower amount of total data on average for each user than using latitude (imagine people
        // at the poles vs the equator; equator people would end up taking in far more data due to
        // population density; but with longitude, it's pretty uniform no matter where in the world
        // the user is).
        // Note: get() returns null if nothing fits the query
        let longQueryResult = await get(query(usersRef, orderByChild("coordinates/longitude"),
                                              startAt(longVal.val() - RADIUS),
                                              endAt(longVal.val() + RADIUS)));
        // Filter by latitude manually
        let output = [];
        let childKey, childData;
        longQueryResult.forEach((childSnapshot) => {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey !== curUserID &&
                childData.coordinates.latitude >= latVal.val() - RADIUS &&
                childData.coordinates.latitude <= latVal.val() + RADIUS) {
                output.push(childSnapshot.val());
            }
        });
        // Shuffle output and return first MAXNEARBYUSERS to put in "nearby users" list.
        // Shuffle algorithm source: Accepted answer at
        // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        // *** Start cited portion ***
        let curIndex = output.length;
        let randIndex;
        // While elements to shuffle remain, pick one of the elements at a random index (randIndex)
        // and swap it with the element at the curIndex!
        while (curIndex != 0) {
          randIndex = Math.floor(Math.random() * curIndex);
          curIndex--;
          [output[curIndex], output[randIndex]] = [output[randIndex], output[curIndex]];
        }
        // *** End cited portion ***
        // Return minimum between all found users and maximum allowed nearby users
        return output.slice(0, Math.min(output.length, MAXNEARBYUSERS));
    }
}

export default DBInterface;
