const { Brand } = require('../../db.js');
const getBrandById = async function (brandId) {
    
  try{
    const resp = await Brand.findById(brandId)
    .populate("image");

    if (!resp) throw new Error("No brand matches the informed id...")
  
    return resp;

  }catch(unError){
    throw new Error(unError)
  }    
    
  }
    
module.exports = getBrandById;
