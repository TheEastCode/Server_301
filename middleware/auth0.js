const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const jwksClient = require('jwks-rsa');
const User = require('../models/userModel');
const cl = (i) => console.log(i);

const checkDBForUser = asyncHandler(async (authUser, token) => {
    if (token && authUser) {
        let user = await User.findOne({ email: authUser.email });
        if (!user) {
            user = await User.create(authUser);
            if (!user) {
                throw new Error('Invalid user data');
            }
        }
        user.token = token;
        await user.save();
        return user;
    }
});

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, getKey, {}, async (err, decodedTokenUser) => {
            if (err) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            try {
                const dbUser = await checkDBForUser(decodedTokenUser, token);
                req.user = { ...decodedTokenUser, id: dbUser.id, _id: dbUser._id };
                next();
            } catch (e) {
                next(e);
            }
        });
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

const client = jwksClient({
    jwksUri: process.env.JWKS_URI,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

module.exports = { protect };
