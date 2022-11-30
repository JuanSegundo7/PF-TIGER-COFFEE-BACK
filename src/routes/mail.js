const { Router } = require('express');
const sendEmail = require("../controllers/mail/sendMail.js");
const router = Router();

router.post('/' , async function (req,res){

    //console.log("esto es body",req.body);
    const { email } = req.body
    try {
        if(!email) throw new Error('No Email has been provided');
        const resp = await sendEmail(req.body);
        res.status(200).send("mail has been sent")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;