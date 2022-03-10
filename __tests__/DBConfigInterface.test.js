import DBInterface from "../android/app/src/database/DBInterface";
import initAppAndGetDB from '../android/app/src/database/DBConfig';
import { ref } from "firebase/database"

let db;
let testInterface;
let userid_A;
let userid_B;

// Links used to inspire testing structure:
// https://www.testim.io/blog/node-js-unit-testing-get-started-quickly-with-examples/
// https://jestjs.io/docs/asynchronous


/*
// Format of tests:
test("test_desc", () => {
    expect(value).tobe(value)
});
*/

test("Initialize database and ensure the reference to the users is correct", (done) => {
    function initializeDBAndReturn() {
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
    initializeDBAndReturn();
});

test("Initialize sample users in database and ensure that they exist", (done) => {
    function initializeUsersAndReturn() {
        try {
            // Test (User) A: No songObj field
            userid_A = "TestA1UserID";
            let name_A = "TestA2Name";
            let spotify_url_A = "TestA3SpotifyURL";
            let avatar_A = "TestA4AvatarURL";
            let premium_A = false;  // A5
            let sharing_A = false;  // A6
            let playback_A = false;  // A7
            let lat_A = -500;  // A8
            let long_A = -500;  // A9
            let songObj_A = null;  // A10
            let music_id_A = "TestA11MusicID";
            let music_url_A = "TestA12MusicURL";
            let music_name_A = "TestA13MusicName";
            let music_artist_A = "TestA14MusicArtist";
            let music_art_A = "TestA15MusicAlbumArt";
            testInterface.initUser(userid_A, name_A, spotify_url_A, avatar_A, premium_A, sharing_A,
                                   playback_A, lat_A, long_A, songObj_A, music_id_A, music_url_A,
                                   music_name_A, music_artist_A, music_art_A);
            testInterface.getUser(userid_A).then((out) => {
                expect(out).not.toBe(null);
            });
            // Test (User) B: Pass in songObj field
            userid_B = "TestB1UserID";
            let name_B = "TestB2Name";
            let spotify_url_B = "TestB3SpotifyURL";
            let avatar_B = "TestB4AvatarURL";
            let premium_B = false;  // B5
            let sharing_B = false;  // B6
            let playback_B = false;  // B7
            let lat_B = -499;  // B8
            let long_B = -501;  // B9
            let songObj_B = {  // B10
                music_id: "TestB11MusicID",
                music_url: "TestB12MusicURL",
                music_name: "TestB13MusicName",
                music_artist: "TestB14MusicArtist",
                music_art: "TestB15MusicAlbumArt"
            }
            testInterface.initUser(userid_B, name_B, spotify_url_B, avatar_B, premium_B, sharing_B,
                                   playback_B, lat_B, long_B, songObj_B);
            testInterface.getUser(userid_B).then((out) => {
                expect(out).not.toBe(null);
            });
            // Test (User) C: Fail to initialize invalid user
            expect(() => { testInterface.initUser(1); }).toThrow();
            done();  // First 2 users did not throw errors and 3rd one did; success!
        }
        catch(error) {
            done(error);
        }
    }
    initializeUsersAndReturn();
});

test("Try getter functions apart from getUser()", (done) => {
    function tryGetters() {
        try {
            testInterface.getDisplayName(userid_A).then((out) => {
                expect(out).toBe("TestA2Name");
            });
            testInterface.getAccountURL(userid_A).then((out) => {
                expect(out).toBe("TestA3SpotifyURL");
            });
            testInterface.getAccountAvatar(userid_A).then((out) => {
                expect(out).toBe("TestA4AvatarURL");
            });
            testInterface.getPlaybackState(userid_A).then((out) => {
                expect(out).toBe(false);
            });
            testInterface.getPremiumStatus(userid_A).then((out) => {
                expect(out).toBe(false);
            });
            testInterface.getSong(userid_A).then((out) => {
                expect(typeof(out)).toBe("object");
                expect(out.music_id).toBe("TestA11MusicID");
                expect(out.music_url).toBe("TestA12MusicURL");
                expect(out.music_name).toBe("TestA13MusicName");
                expect(out.music_artist).toBe("TestA14MusicArtist");
                expect(out.music_art).toBe("TestA15MusicAlbumArt");
            });
            testInterface.getLocationShareStatus(userid_A).then((out) => {
                expect(out).toBe(false);
            });
            testInterface.getLocation(userid_A).then((out) => {
                expect(out.latitude).toBe(-500);
                expect(out.longitude).toBe(-500);
            });
            done();
        }
        catch(error) {
            done(error);
        }
    }
    tryGetters();
});

test("Try setters", (done) => {
    function trySetters() {
        try {
            testInterface.updateDisplayName(userid_A, "TestA2NewName");
            testInterface.getDisplayName(userid_A).then((out) => {
                expect(out).toBe("TestA2NewName");
            });
            testInterface.updateAccountURL(userid_A, "TestA3NewSpotifyURL");
            testInterface.getAccountURL(userid_A).then((out) => {
                expect(out).toBe("TestA3NewSpotifyURL");
            });
            testInterface.updateAccountAvatar(userid_A, "TestA4NewAvatarURL");
            testInterface.getAccountAvatar(userid_A).then((out) => {
                expect(out).toBe("TestA4NewAvatarURL");
            });
            testInterface.updatePlaybackState(userid_A, true);
            testInterface.getPlaybackState(userid_A).then((out) => {
                expect(out).toBe(true);
            });
            testInterface.updatePremiumStatus(userid_A, true);
            testInterface.getPremiumStatus(userid_A).then((out) => {
                expect(out).toBe(true);
            });
            let newSongObj = {
                music_id: "TestA11NewMusicID",
                music_url: "TestA12NewMusicURL",
                music_name: "TestA13NewMusicName",
                music_artist: "TestA14NewMusicArtist",
                music_art: "TestA15NewMusicAlbumArt"
            }
            testInterface.updateSong(userid_A, newSongObj);
            testInterface.getSong(userid_A).then((out) => {
                expect(typeof(out)).toBe("object");
                expect(out.music_id).toBe("TestA11NewMusicID");
                expect(out.music_url).toBe("TestA12NewMusicURL");
                expect(out.music_name).toBe("TestA13NewMusicName");
                expect(out.music_artist).toBe("TestA14NewMusicArtist");
                expect(out.music_art).toBe("TestA15NewMusicAlbumArt");
            });
            testInterface.updateSong(userid_B, null, "TestB11NewMusicID", "TestB12NewMusicURL",
                                     "TestB13NewMusicName", "TestB14NewMusicArtist",
                                     "TestB15NewMusicAlbumArt");
            testInterface.getSong(userid_B).then((out) => {
                expect(typeof(out)).toBe("object");
                expect(out.music_id).toBe("TestB11NewMusicID");
                expect(out.music_url).toBe("TestB12NewMusicURL");
                expect(out.music_name).toBe("TestB13NewMusicName");
                expect(out.music_artist).toBe("TestB14NewMusicArtist");
                expect(out.music_art).toBe("TestB15NewMusicAlbumArt");
            });
            testInterface.updateLocationShareStatus(userid_A, true);
            testInterface.getLocationShareStatus(userid_A).then((out) => {
                expect(out).toBe(true);
            });
            testInterface.updateLocation(userid_A, -1000, -1000);
            testInterface.getLocation(userid_A).then((out) => {
                expect(typeof(out)).toBe("object");
                expect(out.latitude).toBe(-1000);
                expect(out.longitude).toBe(-1000);
            });
            done();
        }
        catch(error) {
            done(error);
        }
    }
    trySetters();
});

test("Try getting nearby users", (done) => {
    function tryGettingNearbyUsers() {
        try {
            // No nearby users
            testInterface.updateLocation(userid_A, -1500, -1500);
            testInterface.getLocation(userid_A).then((out) => {
                expect(typeof(out)).toBe("object");
                expect(out.latitude).toBe(-1500);
                expect(out.longitude).toBe(-1500);
            });
            testInterface.updateLocation(userid_B, -1502, -1498);
            testInterface.getLocation(userid_B).then((out) => {
                expect(typeof(out)).toBe("object");
                expect(out.latitude).toBe(-1502);
                expect(out.longitude).toBe(-1498);
            });
            testInterface.getNearbyUsers(userid_A, 1).then((out) => {
                expect(out.length).toBe(0);
            });
            // Now there should be nearby users
            testInterface.updateLocation(userid_B, -1501, -1499);
            testInterface.getLocation(userid_B).then((out) => {
                expect(typeof(out)).toBe("object");
                expect(out.latitude).toBe(-1501);
                expect(out.longitude).toBe(-1499);
            });
            testInterface.getNearbyUsers(userid_A, 1).then((out) => {
                expect(out.length).toBe(1);
            });
            done();
        }
        catch(error) {
            done(error);
        }
    }
    tryGettingNearbyUsers();
});

test("Try removing users", (done) => {
    function tryRemovingUsers() {
        try {
            // Delete first test user
            testInterface.getUser(userid_A).then((outA1) => {
                expect(outA1).not.toBe(null);
                testInterface.deleteUser(userid_A).then(() => {
                    testInterface.getUser(userid_A).then((outA2) => {
                        expect(outA2).toBe(null);
                    });
                });
            });
            // Delete second test user
            testInterface.getUser(userid_B).then((outB1) => {
                expect(outB1).not.toBe(null);
                testInterface.deleteUser(userid_B).then(() => {
                    testInterface.getUser(userid_B).then((outB2) => {
                        expect(outB2).toBe(null);
                    });
                });
            });
            done();
        }
        catch(error) {
            done(error);
        }
    }
    tryRemovingUsers();
});
