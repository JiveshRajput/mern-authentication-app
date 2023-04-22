const { hashKey, compareHashKey, createJwt } = require('../helpers/helpers');
const UserModel = require('../model/User.model');
const otpGenerator = require('otp-generator');
  

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
        const user = await UserModel.findOne({ username }, { __v: 0, password: 0 });
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
        const { userId } = req.user;
        if (!userId) { next('Enter Valid ID.'); return; }

        // Fetching ID Data
        const user = await UserModel.findOne({ _id: userId });
        if (!user) { next("User Doesn't Exists"); return; }

        //// Updating Part
        const body = req.body;
        const { email, username } = body;

        // Checking whether username and email already exists
        if (username) {
            let usernameExists = await UserModel.findOne({ username });
            if (usernameExists) { return next("Username Already Exists") };
        }

        if (email) {
            let emailExists = await UserModel.findOne({ email });
            if (emailExists) { return next("Email Already Exists") };
        }

        // Updating values in user field
        await UserModel.updateOne({ _id: userId }, body);

        // Fetching user details again
        const userNewDetails = await UserModel.findOne({ _id: userId }, { password: 0, __v: 0 });

        // Sending response 
        res.status(200).send({
            status: 'OK',
            message: `User Details Updated Sucessfully!!!`,
            userDetails: userNewDetails
        });
    } catch (error) {
        next(error);
    }
}

// Get: http://localhost:8080/api/generateOTP
async function generateOTP(req, res, next) {
    try {
        // Generate OTP and save it locally
        req.app.locals.OTP = await otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });

        // Sending response 
        res.status(201).send({
            status: 'OK',
            message: `OTP Generated Sucessfully!!!`,
            code: req.app.locals.OTP,
        });

    } catch (error) {
        next(error);
    }
}

// Get: http://localhost:8080/api/verifyOTP
async function verifyOTP(req, res, next) {
    try {
        const { code } = req.query;

        // Verify Otp
        if (parseInt(code) !== parseInt(req.app.locals.OTP)) {
            return next('Invalid OTP')
        }

        req.app.locals.OTP = null; // Reset otp
        req.app.locals.resetSession = true; // start the session for reset 
        res.status(201).send({
            status: 'OK',
            message: `OTP Verified Sucessfully!!!`,
        });

    } catch (error) {
        next(error)
    }
}

// Successfully redirect user when OTP is valid 
// Get: http://localhost:8080/api/createResetSession
async function createResetSession(req, res, next) {
    try {
        if (req.app.locals.resetSession) {
            req.app.locals.resetSession = false;
            return req.status(201).send({ message: 'Access Granted' })
        }

        next("Session Expired!")
    } catch (error) {
        next(error);
    }
}

// Update password when the session is valid
// Put: http://localhost:8080/api/resetPassword
async function resetPassword(req, res, next) {
    try {
        if (!req.app.locals.resetSession) { next('Session Expired'); return; }

        const { username, password } = req.body;

        // Checking the exisiting user
        const user = await UserModel.findOne({ username });
        if (!user) { next("Username doesn't exists!"); return; };

        // Hashing the Password
        const hashPassword = await hashKey(password);

        // Saving the password
        user.password = hashPassword;
        const result = await user.save();

        req.app.locals.resetSession = false;
        res.send('Password Updated Successfully!!!');

    } catch (error) {
        next(error);
    }
}


module.exports = { register, login, getUser, updateUser, generateOTP, verifyOTP, createResetSession, resetPassword, verifyUser }
