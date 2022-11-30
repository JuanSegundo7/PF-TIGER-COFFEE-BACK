const { Category } = require("../../db.js")

const deleteCategory = async function (_id) {

    try{  
      
        const toDeleteCategory = await Category.findById(_id);
        if (toDeleteCategory){
          await Category.deleteOne({_id}); //ojo, acá estoy usando object literals
          return {deletedId: _id};
        }
        else return "Id to be deleted not found!"; 
  
      }
      catch(unError){
        throw new Error(unError.message)
      }
      
}

module.exports = deleteCategory;