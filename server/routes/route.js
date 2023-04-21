const router = require('express').Router();
const controller = require('../controllers/routerController');

// Register the user
router.route('/register').post(controller.register)

// Send the email
// router.route('/registerMail').post((req, res) => { res.json('Register Mail Route')})

// Authenticate User
router.route('/authenticate').post((req, res) => {
    res.json('Authenticate Route')
})

// Login the User
router.route('/login').post(controller.verifyUser, controller.login)

// User with username
router.route('/user/:username').get(controller.getUser)

// Generate Random OTP
router.route('/generateOTP').get(controller.generateOTP)

// Verify Generate OTP
router.route('/verifyOTP').get(controller.verifyOTP)

// Reset All the Variables
router.route('/createResetSession').get(controller.createResetSession)

// Update user details
router.route('/updateUser').put(controller.updateUser)

// Reset Password
router.route('/resetPassword').put(controller.resetPassword)


module.exports = router;