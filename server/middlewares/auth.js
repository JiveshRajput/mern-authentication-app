const { verifyJwt } = require("../helpers/helpers");

async function auth(req, res, next) {
    try {
        // Access Authorize Header to Validate Request
        const token = req.headers.authorization.split(' ')[1];

        // Retrieve details of logged in user;
        const decodedToken = await verifyJwt(token);
        req.user = decodedToken;
        next();

    } catch (error) {
        next(error);
    }
}

async function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
        resetSession: false
    }
    next();
}

module.exports = { auth, localVariables }