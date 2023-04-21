const { hashKey, compareHashKey, createJwt } = require('../helpers/helpers');
const UserModel = require('../model/User.model');
const jwt = require('jsonwebtoken');


// Middleware for verify user
async function verifyUser(req, res, next) {
    try {
        const { username } = req.method === 'GET' ? req.query : req.body;
        let exists = await UserModel.findOne({ username });
        if (!exists) { res.status(400).send("Username did not get find.") };
        next();

    } catch (error) {
        return res.send(400).send({ error: "Authentication failed" });
    }
}

/* Post: http://localhost:8080/api/register
    {
        "username": "example123",
        "password": "admin123",
        "email": "jivesh@gmail.com",
        "firstName": "jivesh",
        "lastName": "rajput",
        "mobileNo": "9517425033",
        "address": "9517425033",
        "profile": "",
    }
*/
async function register(req, res, next) {
    try {
        const { username, password, profile, email } = req.body;

        // Checking the exisiting user
        const existUsername = await UserModel.findOne({ username })
        if (existUsername) { next('Username already exists!'); return; }

        // Checking the exisiting mail
        const existEmail = await UserModel.findOne({ email })
        if (existEmail) { next('Email already exists!'); return; }

        // Hashing the Password
        const hashPassword = await hashKey(password);

        // Saving the User
        const user = new UserModel({ username, email, password: hashPassword, profile: profile || '' });
        const result = await user.save();

        // Sending Response
        res.status(201).json({
            status: 'OK',
            message: `${username} registered successfully!!!`,
            userId: result._id,
        })

    } catch (error) {
        next(error)
    }
}

/* Post: http://localhost:8080/api/login
    {
        "username": "example123",
        "password": "admin123"
    }
*/
async function login(req, res, next) {
    try {
        const { username, password } = req.body;

        // Checking the exisiting user
        const user = await UserModel.findOne({ username });
        if (!user) { next("Username doesn't exists!"); return; };

        // Comparing the password
        const passwordCheck = await compareHashKey(password, user.password);
        if (!passwordCheck) { next("Wrong User Credentials"); return; };

        // Creating JWT Token
        const token = await createJwt({ userId: user._id, username: user.username });
        // console.log(token)
        res.status(200).send({
            status: 'OK',
            message: `Login Successfully!!!`,
            username: user.username,
            token,
        })
    } catch (error) {
        next(error)
    }
}

/* Get: http://localhost:8080/api/getUser/example123
    {
        "username": "example123",
        "password": "admin123"
    }
*/
async function getUser(req, res, next) {
    try {
        const { username } = req.params;
        // Check whether username is given
        if (!username) { next('Enter Valid Username') }

        // Check whether username exists
        const user = await UserModel.findOne({ username }, { _id: 0, __v: 0, password: 0 });
        if (!user) { next("Username doesn't exists!"); return; };

        // Send Json Response
        res.status(200).json({
            status: 'OK',
            message: `User Details Found.`,
            user,
        });
    } catch (error) {
        next(error)
    }
}

/* Put: http://localhost:8080/api/updateUser
    {
        id: userId    
    }
    body : {
        "firstName": "",
        "address": "",
        "profile": "",
    }
*/
async function updateUser(req, res, next) {
    try {
        const { } = req.params;


        res.send('Working on Update User Route')
    } catch (error) {
        next(error);
    }
}

// Get: http://localhost:8080/api/generateOTP
async function generateOTP(req, res) {
    res.send('generateOTP Route')
}

// Get: http://localhost:8080/api/verifyOTP
async function verifyOTP(req, res) {
    res.send('verifyOTP Route')
}


// Successfully redirect user when OTP is valid 
// Get: http://localhost:8080/api/createResetSession
async function createResetSession(req, res) {
    res.send('createResetSession Route')
}

// Update password when the session is valid
// Get: http://localhost:8080/api/resetPassword
async function resetPassword(req, res) {
    res.send('resetPassword Route')
}


module.exports = { register, login, getUser, updateUser, generateOTP, verifyOTP, createResetSession, resetPassword, verifyUser }
