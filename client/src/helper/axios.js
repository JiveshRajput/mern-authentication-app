import axios from 'axios';

// Make API Request
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Authenticate Function 
export async function authenticate(username) {
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (err) {
        return { error: "Username doesn't Exists" };
    }
}

// Get user details 
export async function getUser({ username }) {
    try {
        return await axios.get(`/api/user/${username}`, { username })
    } catch (err) {
        return { error: "Password doesn't match" };
    }
}

// Register user 
export async function registerUser({ username, email, password }) {
    try {
        const { data: { message }, status } = await axios.post(`/api/register`, { username, email, password })

        // Send Email
        if (status === 201) {
            await axios.post('/api/registerMail', { username, email, text: message, subject: 'Welcome the MERN Auth App. Thanks for registering' })
        }

    } catch (err) {
        return Promise.reject({ err });
    }
}

// Login function
export async function verifyPassword({ username, password }) {
    try {
        const { data } = await axios.post('/api/login', { username, password });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Password Doesn't Match" })
    }
}

// Update User Details Function
export async function updateUser(response) {
    try {
        const token = localStorage.getItem('token');
        const data = await axios.put('/api/updateUser', response, { headers: { "Authorization": `Bearer ${token}` } })
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error: "Couldn't Update Profile" })
    }
}

// Update User Details Function
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } })
        if (status == 201) {
            let { data: { email } } = await getUser({ username })
            let text = `Your Password recovery Code is ${code}`;
            await axios.post('api/registerMail', { username, email, text, subject: "Password Recovery OTP" })
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return { data, status };
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { username, password })
        return Promise.resolve({ data, status });
    } catch (error) {
        return Promise.reject({ error })
    }
}