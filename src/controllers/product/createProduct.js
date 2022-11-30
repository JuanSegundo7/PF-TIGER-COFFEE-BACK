const { Product, Category, Image, Brand } = require("../../db.js");
const ObjectId = require('mongoose').Types.ObjectId;


const createProduct = async function (data) {

  let { name, description, origin, price, grinding_type, stock, category, image, brand, total_accumulated, total_purchases } = data;

//Data Validation
if ((typeof(name)!=="string") || (!name.length)){
  throw new Error("Error: Coffee Name cannot be empty and must be of text type.")
}

if ((typeof(description)!=="string") || (!description.length)){
  throw new Error("Error: Coffee description cannot be empty and must be of text type.")
}

if (origin){
  if ((typeof(origin)!=="string") || (!origin.length)){
    throw new Error("Error: Coffee origin cannot be empty and must be of text type.")
  }
}

if ((typeof(price)!=="number") || (!(price>0))){
  throw new Error("Error: Price must be a number and higher than 0.")
}

if (total_accumulated && ((typeof(total_accumulated)!=="number") || ((total_accumulated<0)))){
  throw new Error("Error: total_accumulated must be a non negative number.")
}

if (total_purchases && ((typeof(total_purchases)!=="number") || ((total_purchases<0)))){
  throw new Error("Error: total_purchases must be a non negative number.")
}
  
if (grinding_type){
  if (typeof(grinding_type)!=="string"){
    throw new Error("Error: Wrong coffee grinding type.")
  }
}

if (typeof(stock)!=="number") throw new Error("Error: Stock must be an integer number higher than 0.")
  //si efectivamente ES un numero
else if (!((stock>=0) && (Number.isInteger(stock))))  throw new Error("Error: Stock must be an integer number higher than 0.")


if ((typeof(category)!=="string") || (!ObjectId.isValid(category))) throw new Error ("No valid _id type provided for category!")
else{
    try{
      let resp = await Category.findById(category)
      if (!resp) throw new Error(`Category id:${category} not found in the Database!`)
    }
    catch(unError){
      throw new Error(unError.message)
    }
}

if (image){
  if ((typeof(image)!=="string") || (!ObjectId.isValid(image))) throw new Error ("No valid _id type provided for image!")
  else{
      try{
        let resp = await Image.findById(image)
        if (!resp) throw new Error(`Image id:${image} not found in the Database!`)
      }
      catch(unError){
        throw new Error(unError.message)
      }
  }
}else{
  image=undefined;
}

if (brand){
  if ((typeof(brand)!=="string") ||  (!ObjectId.isValid(brand))) throw new Error ("No valid _id type provided for brand!")
  else{
      try{
        let resp = await Brand.findById(brand)
        if (!resp) throw new Error(`Brand id:${brand} not found in the Database!`)
      }
      catch(unError){
        throw new Error(unError.message)
      }
  }
}else{
  brand=undefined;
}


//Si no tuve ningún error, creo el producto.
  try {
    const newProduct =  await Product.create({
      //lo hago porque mongoose de momento no realiza ordenamientos case insensitive, 
      //entonces voy a guarda en mi DB, todo en minusculas
      name: name.toLowerCase(),
      description,
      origin,
      price,
      grinding_type,
      stock,
      category,
      image,
      brand,
      total_accumulated, 
      total_purchases
    });
    return newProduct;

  }catch (unError){
    throw new Error(unError)
  }
  
}

module.exports = createProduct;