'use strict';

const firebase = require('../db');
const User = require('../models/user');
const userRef = firebase.database().ref('users/')
const dbRef = firebase.database().ref();
var bcrypt = require('bcrypt')
var saltRouds = 10

const { upload } = require('../common/multer');
const e = require('express');

const addUser = async (req, res) => {
    try {
        const data = req.body;
        let mGroupId = dbRef.child("users").push().getKey();
        //console.log(newid)
        data.id = mGroupId

        console.log(data)
        await firebase.database().ref('users/' + mGroupId).set(data);
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

const getUser = (req, res) => {
    try {
        dbRef.child("users").get().then((snapshot) => {
            let userids = Object.keys(snapshot.val())
            for (let i = 0; i < userids.length; i = i + 1) {
                dbRef.child("users").child(userids[i]).child("email").get().then((snapshot2) => {
                    console.log(snapshot2.val())
                })
            }
            if (snapshot.exists()) {
                // let userids = Object.keys(snapshot.val())
                console.log(userids.length)
                res.json({
                    success: true,
                    data: (snapshot.val()),
                    ids: userids
                });
            } else {
                res.send("No data available");
            }
        })
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const getUsers = (req, res) => {

    try {
        let mGroupId;

        dbRef.child("users/").once('value').then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.getChildren().iterator().next().getKey())

                mGroupId = dbRef.child("users").push().getKey();
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


const editUser = async (req, res) => {

    try {
        // let password = req.body.password
        // let hash = await bcrypt.hash(password, saltRouds)


        // password = hash


        if (req.file) {
            let picture
            req.body.picture = req.file.filename
            picture = req.file.filename
            await dbRef.child("users").child(req.params.id).update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                // password: password,
                // picture: picture

            })
        }
        else {
            await dbRef.child("users").child(req.params.id).update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                // password: password
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


const editPassword = async (req, res) => {

    try {
        let password = req.body.password
        let hash = await bcrypt.hash(password, saltRouds)


        password = hash



        await dbRef.child("users").child(req.params.id).update({
            password: password
        })


        res.json({
            success: true,
            message: "Password changed Successfully",
        });

    } catch (error) {
        res.status(400).send(error.message)
    }
}

module.exports = {
    addUser,
    getUser,
    getUsers,
    editUser,
    editPassword
}