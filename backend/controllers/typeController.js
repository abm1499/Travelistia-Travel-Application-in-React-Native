'use strict';

const firebase = require('../db');
const User = require('../models/user');
const userRef = firebase.database().ref('type/')
const dbRef = firebase.database().ref();
var bcrypt = require('bcrypt')
var saltRouds = 10

const { upload } = require('../common/multer');
const e = require('express');

const addType = async (req, res) => {
    try {
        const data = req.body;
        let mGroupId = dbRef.child("type").push().getKey();
        //console.log(newid)
        data.id = mGroupId

        console.log(data)
        await firebase.database().ref('type/' + mGroupId).set(data);
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

const getType = (req, res) => {
    try {
        dbRef.child("type").get().then((snapshot) => {
            let typeids = Object.keys(snapshot.val())

            if (snapshot.exists()) {
                // let userids = Object.keys(snapshot.val())
                console.log(userids.length)
                res.json({
                    success: true,
                    data: (snapshot.val()),
                    ids: typeids
                });
            } else {
                res.send("No data available");
            }
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const editType = async (req, res) => {

    try {
        let password = req.body.password
        let hash = await bcrypt.hash(password, saltRouds)


        password = hash


        if (req.file) {
            let picture
            req.body.picture = req.file.filename
            picture = req.file.filename
            await dbRef.child("users").child(req.params.id).update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                password: password,
                picture: picture

            })
        }
        else {
            await dbRef.child("users").child(req.params.id).update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                password: password
            })
        }


        res.json({
            success: true,
            message: "Record updated Successfully",
        });

    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    addType,
    getType,
    editType,
}