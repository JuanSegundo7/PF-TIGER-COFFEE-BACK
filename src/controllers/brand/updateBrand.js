const { Brand, Image } = require('../../db');
const ObjectId = require('mongoose').Types.ObjectId;

const updateBrand = async function (_id,data) {
    
const { image } = data;   //esto es req.params  
let { name } = data;

//Data Validation
if (!ObjectId.isValid(_id)) throw new Error ("No valid _id type provided for brand!") 

if (name){
  if ((typeof(name)!=="string") || (!name.length)){
    throw new Error("Error: Brand name cannot be empty and must be of text type.")
  }else{
    name = name.toLowerCase();
  }
}

if (image){
  if ((typeof(image)!=="string") || (!image.length)){
    throw new Error("Error: Brand image must be of text type.")
  }
}


//Si no encuentro error alguno, actualizo el/los dato/s.
  try{
 
    const filter = { _id };
    const update = { name, image };
    let resp = await Brand.findOneAndUpdate(filter, update, {
        new: true
      });
    if (!resp) return "No brand match has been found..."
    else return resp;
    
    }catch(unError){
        throw new Error(unError.message)
    }    
    
  }
    
module.exports = updateBrand;
