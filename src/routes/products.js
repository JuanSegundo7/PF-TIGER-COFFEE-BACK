const { Router } = require('express');
const router = Router();
const createProduct = require("../controllers/product/createProduct.js");
const getProducts = require("../controllers/product/getProducts.js");
const deleteProduct = require("../controllers/product/deleteProduct.js");
const updateProduct = require("../controllers/product/updateProduct.js");
const getProductById = require("../controllers/product/getProductById");

router.get("/", async function (req,res){
    
    //le voy a pasar a getProducts todo lo que llega por req.query. Después destruturaré en la 
    //propia función, no acá.
    try{
        const respuesta = await getProducts(req.query);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }      
});

router.get("/:_idproduct", async function (req,res){
    const { _idproduct } = req.params;
    try {
        const respuesta = await getProductById(_idproduct);
        res.send(respuesta)
    }catch(unError){
        res.status(400).send(unError.message)
    }
});

router.put("/:_id", async (req, res) => {
    
    const { _id } = req.params;
    //const { name, description, origin, type, stock, category} = req.body;
    
    try{
        let respuesta = await updateProduct(_id,req.body);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }
    
})

router.post("/", async function (req, res){

    try{
        const respuesta = await createProduct(req.body);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message);
    }
});

router.delete("/:_id", async (req, res) => {

    try{
        const respuesta = await deleteProduct(req.params._id);
        res.send(respuesta);
    }catch(unError){
        res.status(400).send(unError.message)
    }
  });


module.exports = router;