const { Router } = require('express');
const createComment = require('../controllers/Comment/createComment');
const deleteComment = require('../controllers/Comment/deleteComment');
const getComments = require('../controllers/Comment/getComments');
const router = Router();

router.get('/', async (req,res)=>{
    try {
        const response = await getComments();
        res.send(response);
    } catch (error) {
        res.send('Error')
    }
})

router.post('/' , async (req,res) =>{
    console.log(req.body,"soy req.body");
    try {
        const response = await createComment(req.body);
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message);
    }
    
})

router.delete('/:_id', async (req,res) => {
    try {
        const{_id} = req.params;
        const response = await deleteComment(_id);
        res.send(response);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;