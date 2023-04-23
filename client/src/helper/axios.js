import axios from 'axios';
import jwt_decode from 'jwt-decode';


// Make API Request
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

// Get username from token
export async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) return Promise.reject('Cannot Find Token');
    let decode = jwt_decode(token);
    return decode;
}

// Authenticate Function 
export async function authenticate(username) {
    try {
        const { data, status } = await axios.post('/api/authenticate', { username })
        return { data, status };
    } catch (err) {
        return { error: "Username doesn't Exists" };
    }
}

// Get user details 
export async function getUser({ username }) {
    try {
        const { data, status } = await axios.get(`/api/user/${username}`, { username })
        return { data, status };
    } catch (err) {
        return { error: "Something went wrong!!!" };
    }
}

// Register user 
export async function registerUser(creds) {
    const { username, email } = creds
    try {
        const { data, status } = await axios.post(`/api/register`, creds)

        // Send Email
        if (status === 201) {
            await axios.post('/api/registerMail', { username, email, text: data.message, subject: 'Welcome the MERN Auth App. Thanks for registering' })
        }
        return { data, status };
    } catch (error) {
        return { error };
    }
}

// Login function
export async function verifyPassword({ username, password }) {
    try {
        const { data, status } = await axios.post('/api/login', { username, password });
        return { data, status };
    } catch (error) {
        return { error: "Password Doesn't Match" };
    }
}

// Update User Details Function
export async function updateUser(response) {
    try {
        const token = localStorage.getItem('token');
        const { data } = await axios.put('/api/updateUser', response, { headers: { "Authorization": `Bearer ${token}` } })
        return { data }
    } catch (error) {
        return { error: error.response }
    }
}

// Update User Details Function
export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username: username } });

        if (status === 201) {
            let { data: { user: { email } } } = await getUser({ username: username });
            let text = `Your Password recovery Code is ${code}`;
            var msgResponse = await axios.post('/api/registerMail', { username: username, email, text })
        }

        return { code, response: msgResponse.data };
    } catch (error) {
        return error
    }
}

export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return { data, status };
    } catch (error) {
        return { error }
    }
}

export async function resetPassword({ username, password }) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username: username, password: password })
        return { data, status };
    } catch (error) {
        return { error }
    }
}