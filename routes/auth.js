const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation, loginValidation} = require('../validation');


// validation
router.post('/register', async(req,res) => {

    // we have to validate the data
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //  we check if user exists

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists,kindly choose new email')


    // password is hashed 
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //  user is created
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// our login routes
router.post('/login', async(req,res) => {

        // we have to validate the data
       const { error } = loginValidation(req.body);
       if (error) return res.status(400).send(error.details[0].message);

       //  we check if user exists
       const user = await User.findOne({email: req.body.email});
       if (!user) return res.status(400).send('Email or password is wrong');
        
       //  check if password is correct
       const validPass = await bcrypt.compare(req.body.password, user.password)

       if(!validPass) return res.status(400).send("Invalid password")
       
       //    create a token for user and also assign
       const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
       res.header('auth-token', token).send(token)

})


module.exports = router




