import Song from './song.js'
import User from './user.js'

class SpotifyAPI {
    constructor() {}

    async getCurrSong(authtoken) {
        try {
            let response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + authtoken,
                    'Content-Type': 'application/json'
                }
            });
            if(response.status != 200){
                return null;
            }

            let data = await response.json();
            /*console.log("Currently playing " + data.item.name + " by " + data.item.artists[0].name + " " + data.item.external_urls.spotify + " " + data.item.album.images[2].url + " " + data.item.id)
            console.log("getCurrSong: " + JSON.stringify(data));*/
            //return data;
            return new Song(data.item.name, data.item.artists[0].name, data.item.album.images[2].url, data.item.external_urls.spotify, data.item.id);

            
        } catch (error) {
            console.error(error);
        }
    }

    async getObjectInfo(spotifyObj, authtoken) {
        try {
            console.log(authtoken)
            let objURL = "https://api.spotify.com/v1/tracks/" + spotifyObj
            let response = await fetch(objURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + authtoken,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            console.log("getObjInfo: " + JSON.stringify(data));
        } catch (error) {
            console.error(error);
        }
    }

    async getCurrUserInfo(authtoken) {
        try {
            let response = await fetch('https://api.spotify.com/v1/me', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + authtoken,
                    'Content-Type': 'application/json'
                }
            });
            let userdata = await response.json();
            //return userdata;
            return new User(userdata.display_name, userdata.external_urls.spotify, userdata.product, userdata.id);
            //console.log(userdata.display_name + " " + userdata.external_urls.spotify + " " + userdata.id + " " + userdata.product)
            //console.log("getCurrUserdata: " + JSON.stringify(userdata));
        } catch (error) {
            console.error(error);
        }

    }

    async saveSong(spotifyObj, authtoken) {
        var id_json = {"ids": [spotifyObj]}
        console.log(JSON.stringify(id_json))
        try {
            let response = await fetch('https://api.spotify.com/v1/me/tracks', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + authtoken,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "ids": [spotifyObj] })
            });

            const data = await response;
            console.log("saveCurrSong: status:" + data.status);
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

const Spotify = new SpotifyAPI();

export default Spotify;