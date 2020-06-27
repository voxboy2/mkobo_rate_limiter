const router = require('express').Router();
const verify = require('./verifyToken');



 

router.get('/', verify, (req,res) => {
    res.json({
        posts: {
        title: 'I want to work for mkobo microfinance bank',
        description: 'I am a talented programmer and will offer my best when giving the job,if giving(which i pray will come true)'
    }})
})




module.exports = router;