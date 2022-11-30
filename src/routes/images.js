const { Router } = require('express');
const router = Router();
const createImage = require('../controllers/Image/createImage');
const deleteImage = require('../controllers/Image/deleteImage');
const getImages = require('../controllers/Image/getImages');
const getImageById = require('../controllers/Image/getImageById');
const updateImage = require('../controllers/Image/updateImage');


router.get('/', async(req,res)=>{
    try {
        const response = await getImages();
        res.send(response);
        
    } catch (unError) {
        res.status(400).send(unError.message)
    }
})

router.get('/:_id', async(req,res)=>{
    try {
        const {_id} = req.params;
        const response = await getImageById(_id);
        res.send(response)
    } catch (unError) {
        res.status(400).send(unError.message)
    }
})

router.post('/', async (req,res)=>{
    try {
        const response = await createImage(req.body);
        res.send(response);
        
    } catch (unError) {
        res.status(400).send(unError.message)
    }
})

router.put('/:_id', async (req,res)=>{
    try {
        const {_id} = req.params;
        const response = await updateImage(_id, req.body);
        res.send(response);
    } catch (unError) {
        res.status(400).send(unError.message)
    }
})

router.delete('/:_id', async (req,res)=>{
    try {
        const{_id} = req.params;
        const response = await deleteImage(_id);
        res.send(response);
        
    } catch (unError) {
        res.status(400).send(unError.message)
    }
})

module.exports = router;