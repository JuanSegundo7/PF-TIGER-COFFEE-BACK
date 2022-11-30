const { Brand } = require("../../db.js");
const ObjectId = require('mongoose').Types.ObjectId;

const createBrand = async function (data) {

  const { name, image } = data;

//Data Validation
if ((typeof(name)!=="string") || (!name.length)){
  throw new Error("Error: Brand name cannot be empty and must be of text type.")
}

if (image){
  if ((typeof(image)!=="string") || (!image.length)){
    throw new Error("Error: Brand image must be of text type.")
  }
}


//si no hay error, creo la marca.
  try {
    const newBrand =  await Brand.create({name: name.toLowerCase(), image});
    return newBrand;

  }catch (unError){
    throw new Error(unError)
  }
  
}

module.exports = createBrand;