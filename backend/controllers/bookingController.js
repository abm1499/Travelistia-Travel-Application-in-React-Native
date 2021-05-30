'use strict';

const firebase = require('../db');
//const userRef = firebase.database().ref('type/')
const dbRef = firebase.database().ref();

const { upload } = require('../common/multer');
const e = require('express');

const addBooking = async (req, res) => {
    try {
        const data = req.body;
        let mGroupId = dbRef.child("booking").push().getKey();
        //console.log(newid)
        data.id = mGroupId

        console.log(data)
        await firebase.database().ref('booking/' + mGroupId).set(data);
        res.json({
            success: true,
            message: "Record Booked Successfully",
            data: data
        });
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const getBooking = (req, res) => {
    try {
        dbRef.child("booking").get().then((snapshot) => {
            let bookingids = Object.keys(snapshot.val())

            if (snapshot.exists()) {
                // let userids = Object.keys(snapshot.val())
                console.log(bookingids.length)
                res.json({
                    success: true,
                    data: (snapshot.val()),
                    ids: bookingids
                });
            } else {
                res.send("No data available");
            }
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}







const editBooking = async (req, res) => {

    try {



        await dbRef.child("booking").child(req.params.id).update({
            departure_city: req.body.departure_city,
            place_id: req.body.place_id,
            time: req.body.time,
            type: req.body.type,
            user_id: req.body.user_id
        })



        res.json({
            success: true,
            message: "Record updated Successfully",
        });

    } catch (error) {
        res.status(400).send(error.message)
    }
}



const getUserBooking = async (req, res) => {
    console.log("Hi")
    try {
        var placeids
        var booking = []
        var user = []
        var place = []
        var obj = {}
        var arr = []
        dbRef.child("booking").orderByChild('user_id')
            .equalTo(req.params.id).once('value', async function (snapshot) {

                if (snapshot.exists()) {
                    var user_id = snapshot.val();
                    //console.log("Booking Object")
                    //console.log(user_id)
                    user_id = Object.values(user_id);
                    booking = (user_id)
                    //console.log("Booking")
                    //console.log(booking)
                    //console.log("Booking Array")
                    //console.log(user_id)
                    user_id = user_id[0].user_id;
                    //console.log("userID")
                    //console.log(user_id)
                    var place_id = snapshot.val();
                    //console.log("Booking OBJ")
                    //console.log(place_id)
                    place_id = Object.values(place_id)
                    //console.log("Booking Array")
                    //console.log(place_id)
                    placeids = place_id
                    //console.log("Place IDS")
                    // console.log(placeids)

                    var plength = place_id.length
                    //console.log(plength)


                    //console.log(snapshot.val())

                    await dbRef.child("users").orderByChild('id')
                        .equalTo(req.params.id).once('value', function (snapshot2) {

                            if (snapshot2.exists) {
                                //console.log("User Details")
                                //console.log(snapshot2.val())
                                var userdetail = snapshot2.val()
                                userdetail = Object.values(userdetail)
                                //console.log(userdetail)
                                user = userdetail
                                //console.log(user)




                            }
                        })
                    for (let i = 0; i < placeids.length; i++) {
                        await dbRef.child("places").orderByChild('id')
                            .equalTo(placeids[i].place_id).once('value', function (snapshot3) {

                                if (snapshot3.exists) {
                                    //console.log("Place Details")
                                    //console.log(snapshot3.val())
                                    var places = snapshot3.val();
                                    //console.log("Place OBJ")
                                    console.log(places)
                                    places = Object.values(places)
                                    //console.log("Place Array")
                                    //console.log(places)
                                    place.push(places[0])
                                    //console.log(place)
                                    // myobj.user = user[i]
                                    // myobj.booking = booking[i]
                                    // myobj.place = place[i]

                                    // placeids = place_id
                                    // console.log("Place IDS")
                                    // console.log(placeids)



                                }


                            })


                    }
                    res.json({
                        success: true,
                        booking: booking,
                        user: user,
                        place: place,
                        arr: arr
                        //obj: myobj
                    })


                }
                else {
                    res.send("No data available");
                }







            })
    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = {
    addBooking,
    getBooking,
    editBooking,
    getUserBooking
}