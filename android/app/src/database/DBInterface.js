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
                output.push(childSnapshot);
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
