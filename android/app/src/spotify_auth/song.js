class Song {
    //constructor for a song object
    constructor(name, artist, artUrl, url, spotifyID) {
        this.name = name;
        this.artist = artist;
        this.artUrl = artUrl;
        this.url = url;
        this.spotifyID = spotifyID;
    }

    toString() {
        return this.artist + " - " + this.name + " " + this.thumbnail + " " + this.url + " " + this.spotifyID;
    }
}

module.exports = Song;
