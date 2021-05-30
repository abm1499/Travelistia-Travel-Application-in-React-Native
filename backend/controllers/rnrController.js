'use strict';

const firebase = require('../db');
//const userRef = firebase.database().ref('type/')
const dbRef = firebase.database().ref();

const { upload } = require('../common/multer');
const e = require('express');

const addRnR = async (req, res) => {
    try {
        const data = req.body;
        let mGroupId = dbRef.child("ratingandreview").push().getKey();
        //console.log(newid)
        data.id = mGroupId

        console.log(data)
        await firebase.database().ref('ratingandreview/' + mGroupId).set(data);
        res.json({
            success: true,
            message: "Record Saved Successfully",
            data: data
        });
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const getRnR = (req, res) => {
    try {
        dbRef.child("ratingandreview").get().then((snapshot) => {
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







const editRnR = async (req, res) => {

    try {



        await dbRef.child("ratingandreview").child(req.params.id).update({
            rating: req.body.rating,
            review: req.body.review
        })



        res.json({
            success: true,
            message: "Record updated Successfully",
        });

    } catch (error) {
        res.status(400).send(error.message)
    }
}



const getUserRnR = async (req, res) => {
    console.log("Hi")
    try {
        var placeids
        var rnr = []
        var user = []
        var place = []
        var obj = {}
        var arr = []
        dbRef.child("ratingandreview").orderByChild('user_id')
            .equalTo(req.params.id).once('value', async function (snapshot) {

                if (snapshot.exists()) {
                    var user_id = snapshot.val();

                    user_id = Object.values(user_id);
                    rnr = (user_id)
                    console.log(rnr)


                    await dbRef.child("users").orderByChild('id')
                        .equalTo(req.params.id).once('value', function (snapshot2) {

                            if (snapshot2.exists) {
                                //console.log("User Details")
                                //console.log(snapshot2.val())
                                var userdetail = snapshot2.val()
                                userdetail = Object.values(userdetail)
                                console.log(userdetail)
                                user = userdetail
                                //console.log(user)




                            }
                        })

                    res.json({
                        success: true,
                        rnr: rnr,
                        user: user
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
    addRnR,
    getRnR,
    editRnR,
    getUserRnR
}