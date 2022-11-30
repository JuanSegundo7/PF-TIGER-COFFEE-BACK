const { Brand } = require("../../db.js")

const deleteBrand = async function (_id) {

    try{  
      
        const toDeleteBrand = await Brand.findById(_id);
        if (toDeleteBrand){
          await Brand.deleteOne({_id}); //ojo, acá estoy usando object literals
          return {deletedId: _id};
        }
        else return "Id to be deleted not found!"; 
  
      }
      catch(unError){
        throw new Error(unError.message)
      }
      
}

module.exports = deleteBrand;