const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const { body, validationResult } = require('express-validator'); // Use 'body' instead of 'query' for POST request parameters
const bcrypt = require('bcryptjs');//encrpyt pass while creating acc
const jwt = require('jsonwebtoken');//generate token on login
const jwtSecret = "ThisIsSupposeToBeAJWTSecretIDontKnowItsUseYet"

// When this route is called, it creates a User based on input data

router.post('/createuser',//route
    [   //validation
        body('email', 'Incorrect Mail ID').isEmail(),
        body('password', 'Incorrect Password').isLength({ min: 5 }),
        body('name').notEmpty(),
        body('location').notEmpty()
    ],
    async (req, res) => {//req res

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt)

        try {
            await User.create({ //refers to User Schema and CREATE a user acc to given input
                name: req.body.name,
                password: secPass,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    });

//check if User Login with correct email and corresponding password.

router.post('/loginuser', 
[//validate email and pass before cheking it
    body('email', 'Incorrect Mail ID').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
],
    async (req, res) => {
        const email = req.body.email;
        try {
            const user = await User.findOne({ email });//search for the email in DB refer to it by user
            //new user input password bycrypt is compared with 
            //DB password(of corresponding email) bycrypt value
            const pwdCompare = await bcrypt.compare(req.body.password,user.password) 
            //either one is false we get error.
            //user exist ? (true/false) || pwd compares ? (true/false)
            if (!user || !pwdCompare) { //checks if either the user does not exist or the password comparison fails
                return res.status(400).json({ errors: "Invalid email or password" });
            }
            const data={
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data,jwtSecret);//JWT consits of 3 things:- Header(default), PayLoad(Data), SecretKey
            res.json({ success: true ,authToken});
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false });
        }
    });

module.exports = router;
