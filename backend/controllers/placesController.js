'use strict';

const firebase = require('../db');
const dbRef = firebase.database().ref();

const { upload } = require('../common/multer');
const e = require('express');

const addPlace = async (req, res) => {
    try {
        const data = req.body;
        let mGroupId = dbRef.child("places").push().getKey();
        //console.log(newid)
        data.id = mGroupId

        console.log(data)
        await firebase.database().ref('places/' + mGroupId).set(data);
        res.json({
            success: true,
            message: "Record saved Successfully",
            data: data
        });
    }
    catch (error) {
        res.status(400).send(error.message)
    }
}

const getPlace = (req, res) => {
    try {
        dbRef.child("places").get().then((snapshot) => {
            //let placeids = Object.keys(snapshot.val())
            // for (let i = 0; i < userids.length; i = i + 1) {
            //     dbRef.child("users").child(userids[i]).child("email").get().then((snapshot2) => {
            //         console.log(snapshot2.val())
            //     })
            // }
            if (snapshot.exists()) {
                let placeids = Object.keys(snapshot.val())
                // console.log(userids.length)
                res.json({
                    success: true,
                    data: (snapshot.val()),
                    ids: placeids
                });
            } else {
                res.send("No data available");
            }
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getPlaces = (req, res) => {

    try {
        let mGroupId;

        dbRef.child("places/").once('value').then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.getChildren().iterator().next().getKey())

                mGroupId = dbRef.child("places").push().getKey();
                console.log(mGroupId);
                res.send((snapshot.val()));
            } else {
                res.send("No data available");
            }
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const editPlace = async (req, res) => {

    try {

        await dbRef.child("place").child(req.params.id).update({
            lat: req.body.lat,
            long: req.body.long,
            name: req.body.name
        })

        res.json({
            success: true,
            message: "Record updated Successfully",
        });

    } catch (error) {
        res.status(400).send(error.message)
    }
}


module.exports = {
    addPlace,
    getPlace,
    getPlaces,
    editPlace,
}