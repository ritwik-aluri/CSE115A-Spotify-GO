export default class User {
    //constructor for a song object
    constructor(displayName, profileURL, product, spotifyID) {
        this.displayName = displayName;
        this.profileURL = profileURL;
        if (product == "free" || product == "open") {
            this.premium = false;
        } else {
            this.premium = true;
        }
        this.spotifyID = spotifyID;
    }

   

    toString() {
        //return a string representation of the user
        return this.displayName + " - " + this.profileURL + " " + this.premium + " " + this.spotifyID;
    }
}
