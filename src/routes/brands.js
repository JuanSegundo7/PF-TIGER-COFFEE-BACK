const { Router } = require('express');
const router = Router();
const createBrand = require("../controllers/brand/createBrand.js");
const getBrands = require("../controllers/brand/getBrands.js");
const deleteBrand = require("../controllers/brand/deleteBrand.js");
const getBrandById = require("../controllers/brand/getBrandById.js");
const updateBrand = require("../controllers/brand/updateBrand.js");


router.get("/", async function (req,res){
    
    //le voy a pasar a getCategories todo lo que llega por req.query.
    try{
        const respuesta = await getBrands(req.query);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }     

});

router.get("/:_idbrand", async function (req,res){
    const { _idbrand } = req.params;
    try {
        const respuesta = await getBrandById(_idbrand);
        res.send(respuesta)
    }catch(unError){
        res.status(400).send(unError.message)
    }
});

router.put("/:_id", async (req, res) => {
    
    const { _id } = req.params;
    
    try{
        let respuesta = await updateBrand(_id,req.body);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }
    
})

router.post("/", async function (req, res){

    try{
        const respuesta = await createBrand(req.body);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }
    
});

router.delete("/:_id", async (req, res) => {

    try{
        const respuesta = await deleteBrand(req.params._id);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message)
    }
  });

module.exports = router;