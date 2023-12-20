const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const jwksClient = require('jwks-rsa')

const protect = asyncHandler(async (req, res, next) => {
    let token
    const valid = (err, user) => {
        if (err) { next(err) }
        request.user = user;
        next()
    }

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, getKey, {}, valid)
            req.user = user
        } catch (e) {
            console.log(error)
            res.status(401).next('Not Authorized')
            throw new Error('Not authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

// DEFINE A CLIENT
// This is a connection to YOUR auth0 account
// Use the URL given in your auth0 dashboard
const client = jwksClient({
    jwksUri: process.env.JWKS_URI,
})

// VALIDATE KEY
// Match the JWT's key to your Auth0 Account Key
function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey
        callback(null, signingKey)
    })
}

module.exports = protect