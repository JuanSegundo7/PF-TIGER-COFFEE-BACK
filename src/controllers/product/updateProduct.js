const { Product, Category, Image, Brand } = require('../../db');
const ObjectId = require('mongoose').Types.ObjectId;

const updateProduct = async function (_id,data) {
    
const { description, origin, price, grinding_type, stock, category, image, brand, enabled, total_accumulated, total_purchases } = data;   //esto es req.params
let { name } = data;  //voy a necesitar cambiar nombre a minusculas, por eso no lo defino como constante.

//Data Validation


//consulto si es válido el tipo de dato provisto como ID.
if (!ObjectId.isValid(_id)) throw new Error ("No valid _id type provided for product!") 

if (name){
  if ((typeof(name)!=="string") || (!name.length)){
    throw new Error("Error: Coffee name cannot be empty and must be of text type.")
  }else{
    name = name.toLowerCase();
  }
}

if (description && ((typeof(description)!=="string") || (!description.length))){
  throw new Error("Error: Coffee description cannot be empty and must be of text type.")
}

if (origin && ((typeof(origin)!=="string") || (!origin.length))){
  throw new Error("Error: Coffee origin cannot be empty and must be of text type.")
}

if (price && ((typeof(price)!=="number") || (!(price>0)))){
  throw new Error("Error: Price must be a number and higher than 0.")
}

if (total_accumulated && ((typeof(total_accumulated)!=="number") || ((total_accumulated<0)))){
  throw new Error("Error: total_accumulated must be a non negative number.")
}

if (total_purchases && ((typeof(total_purchases)!=="number") || ((total_purchases<0)))){
  throw new Error("Error: total_purchases must be a non negative number.")
}

if (grinding_type && typeof(grinding_type)!=="string"){
  throw new Error("Error: Wrong coffee grinding type.")
}

if (stock){
  if (typeof(stock)!=="number") 
    throw new Error("Error: Stock must be 0 or an integer number.")
  else if (!((stock>=0) && (Number.isInteger(stock)))) 
    throw new Error("Error: Stock must be 0 or an integer number.")
}

if (category){
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
}

if (image){
  if ((typeof(image)!=="string") ||(!ObjectId.isValid(image))) throw new Error ("No valid _id type provided for image!")
  else{
      try{
        let resp = await Image.findById(image)
        if (!resp) throw new Error(`Image id:${image} not found in the Database!`)
      }
      catch(unError){
        throw new Error(unError.message)
      }
  }
}

if (brand){
  if ((typeof(brand)!=="string") || (!ObjectId.isValid(brand))) throw new Error ("No valid _id type provided for brand!")
  else{
      try{
        let resp = await Brand.findById(brand)
        if (!resp) throw new Error(`Brand id:${brand} not found in the Database!`)
      }
      catch(unError){
        throw new Error(unError.message)
      }
  }
}

if (enabled && (typeof(enabled)!=="boolean")){
  throw new Error("Error: Product enable / disable should be of boolean type.")
}

//si no encuentro error alguno, actualizo el/los dato/s.
  try{
 
    const filter = { _id };
    const update = { 
      name, 
      description, 
      origin, 
      price, 
      grinding_type, 
      stock, 
      category,
      image,
      brand,
      enabled,
      total_accumulated, 
      total_purchases
     };

    let resp = await Product.findOneAndUpdate(filter, update, {new: true});
    if (!resp) return "No product match has been found..."
    else return resp;
    
    }catch(unError){
        throw new Error(unError.message)
    }    
    
  }
    
module.exports = updateProduct;
