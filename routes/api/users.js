const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

// User Model
const User = require('../../models/User');

// @route POST api/users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Simple validation
    if(!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Email validation
    if(!validateEmail(email)) {
        return res.status(400).json({ msg: 'Please enter valid email' });
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'User already exist' });

            const newUser = new User({ 
                name, 
                email, 
                password 
            });

           // Create salt & hash
           bcrypt.genSalt(10, (err, salt) => {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                   if(err) throw err;
                   newUser.password = hash;
                   newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            );

                        });
               });
           });
        });
});

function validateEmail(email) {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
}

module.exports = router;