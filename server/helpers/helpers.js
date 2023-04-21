const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function hashKey(password, salt = 10) {
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}

async function compareHashKey(password, hashedPassword) {
    const comparedPassword = await bcrypt.compare(password, hashedPassword)
    return comparedPassword;
}

async function createJwt(payload, expiresIn = '24h') {
    const token = jwt.sign(payload, process.env.JWT_SECRETKEY, { expiresIn });
    return token;
}

async function verifyJwt(token) {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRETKEY);
    return decodedToken;
}

module.exports = { hashKey, compareHashKey, createJwt, verifyJwt }