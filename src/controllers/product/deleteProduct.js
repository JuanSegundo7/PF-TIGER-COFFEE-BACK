const { Product } = require("../../db.js")

const deleteProduct = async function (_id) {

    try{  
      
        const toDeleteProduct = await Product.findById(_id);
        if (toDeleteProduct){
          await Product.deleteOne({_id}); //ojo, acá estoy usando object literals
          //return `Product deleted successfully (_id:${_id})`;
          return {deletedId: _id};
        }
        else return "Id to be deleted not found!"; 
  
      }
      catch(unError){
        throw new Error(unError.message)
      }
      
}

module.exports = deleteProduct;