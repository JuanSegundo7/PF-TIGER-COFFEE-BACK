const { Category } = require('../../db.js');
const getCategoryById = async function (categoryId) {
    
  try{
    const resp = await Category.findById(categoryId)
    //.populate("category").populate("image");
    //.populate("activities",["name","season"]);

    if (!resp) throw new Error("No category matches the informed id...")
  
    return resp;

  }catch(unError){
    throw new Error(unError)
  }    
    
  }
    
module.exports = getCategoryById;
