const { Router } = require('express');
const router = Router();
const createUser = require("../controllers/user/createUser.js");
const getUsers = require("../controllers/user/getUsers.js");
const deleteUser = require("../controllers/user/deleteUser.js");
const getUserById = require("../controllers/user/getUserById.js");
const updateUser = require("../controllers/user/updateUser.js");

router.get("/", async function (req,res){
    
    //le voy a pasar a getCategories todo lo que llega por req.query.
    try{
        const respuesta = await getUsers(req.query);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }     

});

router.get('/:_id', async (req,res) => {
    const {_id} = req.params;
    try {
        const respuesta = await getUserById(_id);
        res.send(respuesta);
    } catch (unError) {
        res.status(400).send(unError.message)
    }
})

router.put("/:_id", async (req, res) => {
    
    const { _id } = req.params;
    
    try{
        let respuesta = await updateUser(_id,req.body);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }
    
})

router.post("/", async function (req, res){

    try{
        const respuesta = await createUser(req.body);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }
    
});

router.delete('/:_id', async (req,res) =>{
    const {_id} = req.params;
    try {
        const respuesta = await deleteUser(_id);
        res.send(respuesta);
    } catch (unError) {
        res.status(400).send(unError.message)
    }
})

/* router.delete("/:_id", async (req, res) => {

    try{
        const respuesta = await deleteBrand(req.params._id);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message)
    }
}); */

module.exports = router;