import { getDatabase, ref, set, onValue, child, get, query, orderByChild, startAt, endAt, once, DataSnapshot } from "firebase/database";

class DBInterface {
    constructor(database) {
        this.db = database;
    }

    // Get users with nearby latitude/longitude (it's not a perfect, uniform radius, but it'll have to do)
    // Order by random values (key/child/latitude/longitude/etc., limit to 100 values and then shuffle)
    // Call this function every time database values change
    // To shuffle output: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // Alternative to avoid querying for useless data is just query for all users in lat/long
    // range, THEN shuffle and provide first 100 users in a list after shuffling
    async getNearbyUsers(curUserID) {
        const curUserRef = ref(this.db, 'users/' + curUserID);
        //const curUserSnapshot = once(curUserRef, )
        const usersRef = ref(this.db, "users/");
        //const latQueryRef = query(usersRef, orderByChild("coordinates/latitude"));
        //const latQueryRef = query(usersRef, orderByChild("coordinates/latitude"), startAt(1));
        //const latQueryRef = query(usersRef, orderByChild("coordinates/latitude"), startAt(child(curUserRef, "coordinates/latitude")));
        //return 1;
        console.log("Helloooooo " + usersRef);  // usersRef is an object!
        //let latVal;
        ///////////get(child(curUserRef, "coordinates/latitude")).then((output) => { latVal = output.val(); console.log(latVal); return latVal; });
        //return latVal;
        //return child(curUserRef, "coordinates/latitude"); WORKS! Now how do I get data???
        //let latQueryRef;
        /////////////////get(child(curUserRef, "coordinates/latitude")).then((output) => { latVal = output.val(); console.log(latVal); return latVal; });
        get(query(usersRef, orderByChild("coordinates/latitude"))).then((output) => { return output; });
        //////////////////////////
        // GET FUNCTION NOT WORKING CURRENTLY! Need proper query where "usersRef" is! But idk how to get one without using an existing query!
        //////////////////////////
        //return 1;
        /*let latVal, longVal;
        let latQueryRef, longQueryRef;
        get(child(curUserRef, "coordinates/latitude")).then((output) => {
            latVal = output.val();
            console.log("latVal obtained");
            get(child(curUserRef, "coordinates/longitude")).then((output) => {
                longVal = output.val();
                console.log("longVal obtained");
                get(query(usersRef, orderByChild("coordinates/latitude"), startAt(latVal - 1, ""), endAt(latVal + 1, ""))).then((latQueryOutputSnapshot) => {
                    latQueryRef = latQueryOutputSnapshot;
                    console.log("latQueryRef obtained");
                    get(query(latQueryRef, orderByChild("coordinates/longitude"), startAt(longVal - 1), endAt(longVal + 1))).then((longQueryOutputSnapshot) => {
                        longQueryRef = longQueryOutputSnapshot;
                        console.log("All nesting successful!");
                        console.log(longQueryRef);
                        return longQueryRef;
                    });
                });
            });
        });*/
        /*get(child(curUserRef, "coordinates/longitude")).then((output) => { longVal = output.val(); });
        //get(query(usersRef, orderByChild("coordinates/latitude"), startAt(child(curUserRef, "coordinates/latitude").val()))).then((queryOutput) => { latQueryRef = queryOutput; });
        get(query(usersRef, orderByChild("coordinates/latitude"), startAt(child(curUserRef, "coordinates/latitude").val()))).then((queryOutput) => { latQueryRef = queryOutput; });
        return 1;
        console.log("Printing latitude of current user");
        return 1;
        console.log(child(curUserRef, "coordinates/latitude").val());
        //const latQueryRef = query(usersRef, orderByChild("coordinates/latitude").startAt(child(curUserRef, "coordinates/latitude").val() - 1).endAt(child(curUserRef, "coordinates/latitude").val() + 1));
        return 1;*/
        //const longQueryRef = query(longQueryRef, orderByChild("coordinates/longitude").startAt(child(curUserRef, "coordinates/longitude").val() - 1).endAt(child(curUserRef, "coordinates/longitude").val() + 1));
        //return longQueryRef;
    }

    //
}

export default DBInterface;
