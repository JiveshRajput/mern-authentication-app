require('./envConfig');
const app = require('./app');
const connectToDB = require('./database/connection');


connectToDB().then(() => {
    try {    
        app.listen(process.env.PORT, () => {
            console.log(`Server: Started at http://localhost:${process.env.PORT}`)
        })
    } catch (error) {
        console.log('Cannot connect to server')
    }
}).catch(()=> {
    console.log('Invalid Database connection...')
})