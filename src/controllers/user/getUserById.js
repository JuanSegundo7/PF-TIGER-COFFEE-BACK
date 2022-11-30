const { User } = require('../../db.js');
const getProductById = require("../../controllers/product/getProductById.js");

var response = null;
var resp = null;

const getUserById = async function (UserId) {
  try{
    
    resp = await User.findById(UserId).lean()
    .populate("favorites")//.populate("cart"); //this not functional populate is simulated down below.


    if (resp && resp.cart && resp.cart.length){
      for (let i=0; i<resp.cart.length; i++){
        try {
          response = await getProductById(resp.cart[i]._id);
          resp.cart[i]["name"] = response.name;
          resp.cart[i]["description"] = response.description;
          resp.cart[i]["origin"] = response.origin;
          resp.cart[i]["price"] = response.price;
          resp.cart[i]["grinding_type"] = response.grinding_type;
          resp.cart[i]["stock"] = response.stock;
          resp.cart[i]["enabled"] = response.enabled;
          resp.cart[i]["total_accumulated"] = response.total_accumulated;
          resp.cart[i]["total_purchases"] = response.total_purchases;
          resp.cart[i]["category"] = response.category;
          resp.cart[i]["image"] = response.image;
          resp.cart[i]["brand"] = response.brand; 
          if (!response) console.log(`no product found matching the provided id ${resp.cart[i]._id}`)
        } catch (error) {
          console.log(error)
        }
      }
    }

    //if (!resp) throw new Error("No User matches the informed id...")
    if (!resp) {
      console.log("No User matches the informed id...");
      return {error: "no user Id found in the DataBase."}
    }

    return resp;

  }catch(unError){
    throw new Error(unError)
  }    
}
    
module.exports = getUserById;
