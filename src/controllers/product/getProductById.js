const { Product } = require('../../db.js');
const getProductById = async function (productId) {
    
  try{
    const resp = await Product.findById(productId)
    .populate("category").populate("image").populate("brand");
    //.populate("activities",["name","season"]);

    if (!resp) throw new Error("No product matches the informed id...")
  
    return resp;

  }catch(unError){
    throw new Error(unError)
  }    
    
  }
    
module.exports = getProductById;
