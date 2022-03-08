import DBInterface from "../android/app/src/database/DBInterface";
import initAppAndGetDB from '../android/app/src/database/DBConfig';
import { ref } from "firebase/database"

let db;
let testInterface;

// Links used to inspire testing structure:
// https://www.testim.io/blog/node-js-unit-testing-get-started-quickly-with-examples/
// https://jestjs.io/docs/asynchronous


/*
test("test_desc", () => {
    expect(function_call).tobe(value)
});
*/


test("Initialize database and ensure the reference to the users is correct", (done) => {
    function initializeAndReturn() {
        try {
            db = initAppAndGetDB();
            dbRef = ref(db);
            expect(JSON.stringify(dbRef)).toBe("\"https://spotify-go-ba7bf-default-rtdb.firebaseio.com/\"");
            testInterface = new DBInterface(db);
            done();
        }
        catch(error) {
            done(error);
        }
    }
    initializeAndReturn();
});

// Testing with
test("Initialize sample users in database and ensure that they exist", (done) => {
    function initializeUserAndReturn() {
        try {
            // Test (User) A: No songObj field
            userid_A = "TestA1UserID";
            name_A = "TestA2Name";
            spotify_url_A = "TestA3SpotifyURL";
            avatar_A = "TestA4AvatarURL";
            premium_A = false;  // A5
            sharing_A = false;  // A6
            playback_A = false;  // A7
            lat_A = -500;  // A8
            long_A = -500;  // A9
            songObj_A = null;  // A10
            music_id_A = "TestA11MusicID";
            music_url_A = "TestA12MusicURL";
            music_name_A = "TestA13MusicName";
            music_artist_A = "TestA14MusicArtist";
            music_art_A = "TestA15MusicAlbumArt";
            testInterface.initUser(userid_A, name_A, spotify_url_A, avatar_A, premium_A, sharing_A,
                                   playback_A, lat_A, long_A, songObj_A, music_id_A, music_url_A,
                                   music_name_A, music_artist_A, music_art_A);
            // Test (User) B: Pass in songObj field
            userid_B = "TestB1UserID";
            name_B = "TestB2Name";
            spotify_url_B = "TestB3SpotifyURL";
            avatar_B = "TestB4AvatarURL";
            premium_B = false;  // B5
            sharing_B = false;  // B6
            playback_B = false;  // B7
            lat_B = -499;  // B8
            long_B = -501;  // B9
            songObj_B = {  // B10
                music_id: "TestB11MusicID",
                music_url: "TestB12MusicURL",
                music_name: "TestB13MusicName",
                music_artist: "TestB14MusicArtist",
                music_art: "TestB15MusicAlbumArt"
            }
            testInterface.initUser(userid_B, name_B, spotify_url_B, avatar_B, premium_B, sharing_B,
                                   playback_B, lat_B, long_B, songObj_B);
            // Test (User) C: Fail to initialize invalid user
            expect(testInterface.initUser(1)).toThrow();
            done();  // First 2 users did not throw errors and 3rd one did; success!
        }
        catch(error) {
            done(error);
        }
    }
    initializeAndReturn();
});

// Test getters
// TRY TO GET UNINITIALIZED USER AND SHOW THAT IT FAILS!!!
// Wait, what happens if I try to get a user that doesn't exist? What's returned? I should print that!

// Test setters (then get and check the values to see if they've changed)
// FOR SETTERS ADD TYPECHECKS TO DBINTERFACE!!! AND MAKE SURE OF FAIL

// Test getNearbyUsers
// NOTE: ensure no other users in db currently have latitude/longitude  values around -500

// Test deleting users (get a deleted user and show nothing is returned