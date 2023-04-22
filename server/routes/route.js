const router = require('express').Router();
const { register, verifyUser, login, getUser, generateOTP, verifyOTP, resetPassword, updateUser, createResetSession } = require('../controllers/routeController');
const { auth, localVariables } = require('../middlewares/auth')
const { registerMail } = require('../controllers/mailer')

router.route('/register').post(register) // Register the user
router.route('/registerMail').post(registerMail) // Send the email
router.route('/authenticate').post(verifyUser, (req, res) => { res.end() }) // Authenticate User
router.route('/login').post(verifyUser, login) // Login the User
router.route('/user/:username').get(getUser) // User with username
router.route('/generateOTP').get(verifyUser, localVariables, generateOTP) // Generate Random OTP
router.route('/verifyOTP').get(verifyOTP) // Verify Generate OTP
router.route('/createResetSession').get(createResetSession) // Reset All the Variables
router.route('/updateUser').put(auth, updateUser) // Update user details
router.route('/resetPassword').put(verifyUser, resetPassword) // Reset Password

module.exports = router;