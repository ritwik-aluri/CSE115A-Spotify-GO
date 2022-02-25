import { getDatabase, ref, set, onValue, child, get, query, orderByChild, orderByKey, orderByValue, startAt, endAt, once, DataSnapshot } from "firebase/database";

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
        //const curUserRef = ref(this.db, 'users/' + curUserID);
        const usersRef = ref(this.db, "users/");
        //console.log("Helloooooo " + usersRef);  // usersRef is an object!
        // Notes: query() can be called on a ref!
        //        //get(query(usersRef)).then((output) => { console.log("output: "); console.log(output); return output; });  // THIS PRINTS ALL USERS SUCCESSFULLY! But still returns nothing to the outside
        //        typeof() value returned from database (for coordinates/latitude and longitude and I assume everything else) is undefined! Or an object. But def not a number!

        // For some reason, the nearbyUsers5 line only works if the nearbyUsers2 line is also active
        // Doesn't have to assign to nearbyUsers2 variable, though, as long as
        //    await get(query(usersRef, orderByKey()));
        // runs on a line
        /*//let nearbyUsers = await get(query(usersRef));
        let nearbyUsers2 = await get(query(usersRef, orderByKey()));
        //let nearbyUsers3 = await get(query(usersRef, orderByChild("music")));
        //let nearbyUsers4 = await get(query(usersRef, orderByChild("music"), startAt("S")));
        let nearbyUsers5 = await get(query(usersRef, orderByChild("coordinates/latitude"), startAt(2), endAt(3)));
        return nearbyUsers5;*/

        await get(query(usersRef, orderByKey()));
        let nearbyUsers5 = await get(query(usersRef, orderByChild("coordinates/latitude"), startAt(2), endAt(3)));
        return nearbyUsers5;

        // This is the bare minimum code needed for this function to work as a test
        /*const usersRef = ref(this.db, "users/");
        await get(query(usersRef, orderByKey()));
        let nearbyUsers5 = await get(query(usersRef, orderByChild("coordinates/latitude"), startAt(2), endAt(3)));
        return nearbyUsers5;*/
    }
}

export default DBInterface;
