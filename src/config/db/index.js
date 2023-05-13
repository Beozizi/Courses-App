const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/beozizi_blog_dev');
        console.log("connect succesesfully!!! ")
    } 
    catch (error) {
        console.log("connect fail!!! ")
    }
}

module.exports = {connect}