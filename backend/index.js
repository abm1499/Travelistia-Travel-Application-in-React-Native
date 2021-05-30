'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoutes = require('./routes/user')
const typeRoutes = require('./routes/type')
const bookingRoute = require('./routes/booking')
const placeRoute = require('./routes/places')
const rnrRoute = require('./routes/rnr')

var bcrypt = require('bcrypt')
var saltRouds = 10
const jwt = require("jsonwebtoken");

const app = express();


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const firebase = require('./db');
const booking = require('./routes/booking');
const userRef = firebase.database().ref('users/')
const dbRef = firebase.database().ref();



app.post("/signin", (req, res) => {
    try {
        let userpass
        let myuser
        //console.log(req.body.email)
        var user = {};
        user.email = req.body.email;
        user.password = req.body.password;
        console.log("ENTERED EMAIL: " + user.email)
        console.log("ENTERED PASSWORD: " + user.password)

        // user.password = req.body.password;


        dbRef.child("users").orderByChild('email').equalTo(user.email).on("value", async function (snapshot2) {
            if (!snapshot2.exists()) {
                res.status(500).json({
                    message: "User Does Not Exists..."
                })
            }
            else {
                let userids = Object.keys(snapshot2.val())
                await dbRef.child("users").child(userids[0]).get().then((snapshot3) => {
                    myuser = snapshot3.val()
                })
                dbRef.child("users").child(userids[0]).child("password").get().then((snapshot) => {
                    userpass = snapshot.val()

                    console.log(userpass)
                    console.log(user.password)
                    if (bcrypt.compareSync(user.password, userpass)) {
                        console.log(bcrypt.compareSync(user.password, userpass))
                        let token = jwt.sign({ user: user }, 'abcdefghijklmnopqrstuvwxyz');
                        res.status(200).json({
                            token,
                            user: myuser

                        })

                    } else {
                        res.json("User Unauthorized Access");
                    }
                })

            }
        })
    }
    catch (ex) {
        res.status(500).json({
            success: false,
            message: ex.toString()
        })
    }
});



app.post("/signup", async (req, res) => {
    try {
        let firebaseuser
        // Validate request
        if (!req.body.email) {
            res.status(400).json({
                message: "Please Enter Username"
            });
            return;
        }
        else if (!req.body.password) {
            res.status(400).json({
                message: "Please Enter Password"
            })
        }
        // Create a Credentials Object
        const credentials = {
            email: req.body.email,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            age: req.body.age,
            phonenumber: req.body.phonenumber
        };
        console.log(credentials.email)
        dbRef.child("users").orderByChild('email').equalTo(credentials.email).on("value", function (snapshot2) {
            if (snapshot2.exists()) {
                firebaseuser = true
            }
            else {
                firebaseuser = false
            }
        })
        console.log("Undefined? " + firebaseuser)
        if (firebaseuser) {
            res.status(500).json({
                message: "User already exists..."
            })
        }
        else {
            //console.log(snapshot2.val())

            let hash = await bcrypt.hash(credentials.password, saltRouds)

            credentials.password = hash

            //const data = req.body;
            let mGroupId = dbRef.child("users").push().getKey();
            //console.log(newid)
            credentials.id = mGroupId


            let admin = await firebase.database().ref('users/' + mGroupId).set(credentials);




            //let admin = await db.admin.create(credentials);
            //console.log(admin);

            let token = jwt.sign({ user: admin }, 'abcdefghijklmnopqrstuvwxyz');
            res.json({
                success: true,
                token
            });

        }

    }
    catch (ex) {
        res.status(500).send({
            success: false,
            message: ex.toString()
        })
    }
});

const authenticateMiddleware = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined 

    if (typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //Next middlware
        jwt.verify(req.token, "abcdefghijklmnopqrstuvwxyz", (err, authData) => {
            if (err) {
                console.log(err);
                res.sendStatus(403);
            } else {
                next();
            }
        });
    }
    else {
        res.sendStatus(403);
    }

}



app.use('/user', userRoutes.routes)
app.use('/type', typeRoutes.routes)
app.use('/booking', bookingRoute.routes)
app.use('/place', placeRoute.routes)
app.use('/rnr', rnrRoute.routes)

app.listen(config.port, () => console.log(
    "App is listening on url http://localhost:" + config.port
))