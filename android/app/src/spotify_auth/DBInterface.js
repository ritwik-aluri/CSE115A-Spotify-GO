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
        const curUserRef = ref(this.db, 'users/' + curUserID);
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

        /*await get(query(usersRef, orderByKey()));
        let nearbyUsers5 = await get(query(usersRef, orderByChild("coordinates/latitude"), startAt(2), endAt(3)));
        return nearbyUsers5;
*/
        /*let latVal = await get(child(curUserRef, "coordinates/latitude"));
        let longVal = await get(child(curUserRef, "coordinates/longitude"));
        let latQuery, longQuery;
        await get(query(usersRef, orderByChild("coordinates/latitude"), startAt(2), endAt(3))).then((latQueryX) => {
            latQuery = latQueryX;
            await get(query(usersRef, orderByChild("coordinates/longitude"), startAt(2), endAt(3))).then((longQueryX) => {
                longQuery = longQueryX;
            });
        });*/

        let latVal = await get(child(curUserRef, "coordinates/latitude"));
        let longVal = await get(child(curUserRef, "coordinates/longitude"));
        // Choosing to get by longitude; I decided that it would return a more consistent and lower
        // amount of total data on average for each user than using latitude (imagine people at the
        // poles vs the equator; equator people would end up taking in far more data due to
        // population density; but with longitude, it's pretty uniform no matter where in the world
        // the user is).
        // Note: get() returns null if nothing fits the query
        let longQueryResult = await get(query(usersRef, orderByChild("coordinates/longitude"), startAt(longVal.val() - 100), endAt(longVal.val() + 100)));
        return longQueryResult;

        // So, uh, according to this link:
        // https://stackoverflow.com/questions/48037766/how-can-i-query-and-filter-firebase-realtime-database
        // I can only sort by one value at a time. I can sort by latitude or longitude, but not both
        // Pick one, get the data, filter out the rest clientside
        //let latVal = await get(child(curUserRef, "coordinates/latitude"));
        //let longVal = await get(child(curUserRef, "coordinates/longitude"));
        //let latQuery = query(usersRef, orderByChild("coordinates"), startAt(latVal.val(), "coordinates/latitude"), endAt(100, "coordinates/longitude"));
        //let longQueryResult = await get(query(latQuery /*, startAt(-200, "longitude"), endAt(100, "longitude")*/));

        // THIS WORKS! I GET IT NOW!
        // I can't use the orderByChild("longitude") on latQuery because that already included orderByChild("latitude")!!!
        // I CAN'T STACK QUERIES! I CAN ONLY ADD THE CONSTRAINTS TO EXISTING QUERIES!
        // So the question is, how do I filter by both latitude AND longitude in the same query without using
        // a second orderBy function...?
        /*let latQuery = query(usersRef, orderByChild("latitude"), startAt(latVal.val()));
        let longQueryResult = await get(query(latQuery, endAt(100)));*/

        //let longQueryResult = await get(latQuery /*orderByChild("longitude"), startAt(longVal.val()), endAt(100)*/); // This works fine, but I still need the longitude to stack
        //let longQueryResult = await get(query(latQuery /*orderByChild("longitude"), startAt(longVal.val()), endAt(100)*/)); // This still allows me to return
        //return longQueryResult;
        //await get(query(usersRef, orderByKey()));
        //return get(query(usersRef, orderByChild("latitude"), startAt("N", "music"), endAt("v", "music")));
        //return get(query(usersRef, orderByChild("latitude"), startAt(0), endAt(100)));
        //let q1 = get(query(usersRef, orderByChild("music"), startAt("N"), endAt("v")));  // This is fine, but doing second query not working
        //await get(query(usersRef, orderByKey()));
        //let q2 = get(query(q1, orderByChild("longitude"), startAt(100), endAt(300)));
        //return q2;
        /*return get(query(usersRef, orderByChild("music"), startAt("N"), endAt("v"))).then((q1) => {
            return get(query(q1, orderByChild("longitude"), startAt(100), endAt(300))).then((output) => {
                return output;
            });
        })*/
        //let q1 = await get(query(usersRef, orderByChild("music"), startAt("N"), endAt("v")));
        //let q2 = await get(query(usersRef, orderByChild("longitude"), startAt(100), endAt(300)));
        //return q2;
        //let latQuery, longQuery;
        /*let filteredOutput = await get(query(usersRef, orderByChild("coordinates/latitude"), startAt(2), endAt(3))).then((latQuery) => {
            filteredOutput = latQuery;
            get(query(usersRef, orderByChild("coordinates/longitude"), startAt(2), endAt(3))).then((longQuery) => {
                filteredOutput = longQuery;
                return longQuery;
            });
        });
        return filteredOutput;*/
        //await get(query(usersRef, orderByChild("coordinates/longitude"), startAt(2), endAt(3)));

        /*await get(query(usersRef, orderByChild("coordinates/latitude"), startAt(2), endAt(3))).then((latQueryX) => {
            latQuery = latQueryX;
            await get(query(usersRef, orderByChild("coordinates/longitude"), startAt(2), endAt(3))).then((longQueryX) => {
                longQuery = longQueryX;
            });
        });*/
        //let longQuery = await get(query(latQuery, orderByChild("coordinates/longitude"), startAt(2), endAt(3)));
        //let longQuery = await get(query(latQuery, orderByChild("coordinates/longitude"), startAt(2), endAt(3)));
        //return longQuery;
        //return latQuery;
        //get(query(latQuery, orderByChild("coordinates/longitude"), startAt(longVal - 1), endAt(longVal + 1))).then((output) => { console.log(output); });
        //return longQuery;

        // This is the bare minimum code needed for this function to work as a test
        /*const usersRef = ref(this.db, "users/");
        await get(query(usersRef, orderByKey()));
        let nearbyUsers5 = await get(query(usersRef, orderByChild("coordinates/latitude"), startAt(2), endAt(3)));
        return nearbyUsers5;*/
    }
}

export default DBInterface;
