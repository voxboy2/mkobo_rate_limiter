const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// const rateLimit = require("express-rate-limit");
 
 
// const limiter = rateLimit({
//   windowMs: 60 * 1000, 
//   max: 5,
//   message: "Too many accounts created from this IP, please try"

// });




// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');






dotenv.config();


// connect to database
mongoose.connect(
         process.env.DB_CONNECT,
        { useNewUrlParser:true },
        () => console.log('connected to db!')
);

app.use(express.json());


// Routes MIddlware
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

// app.use('/api/posts', limiter, postRoute)


// install mongoose


app.listen(3000, () => console.log('Server Up and running'));