const { Router } = require('express');
const router = Router();
const createCategory = require("../controllers/category/createCategory.js");
const getCategories = require("../controllers/category/getCategories.js");
const deleteCategory = require("../controllers/category/deleteCategory.js");
const getCategoryById = require("../controllers/category/getCategoryById.js");
const updateCategory = require("../controllers/category/updateCategory.js");

router.get("/", async function (req,res){
    
    //le voy a pasar a getCategories todo lo que llega por req.query.
    try{
        const respuesta = await getCategories(req.query);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }     
    
});

router.get("/:_idcategory", async function (req,res){
    const { _idcategory } = req.params;
    try {
        const respuesta = await getCategoryById(_idcategory);
        res.send(respuesta)
    }catch(unError){
        res.status(400).send(unError.message)
    }
});

router.put("/:_id", async (req, res) => {
    
    const { _id } = req.params;
    
    try{
        let respuesta = await updateCategory(_id,req.body);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }
    
})

router.post("/", async function (req, res){

    try{
        const respuesta = await createCategory(req.body);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }
    
});

router.delete("/:_id", async (req, res) => {

    try{
        const respuesta = await deleteCategory(req.params._id);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message)
    }
  });


module.exports = router;