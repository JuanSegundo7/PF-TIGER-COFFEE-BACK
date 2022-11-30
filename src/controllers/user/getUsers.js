const { User } = require("../../db.js");
const getProductById = require("../../controllers/product/getProductById.js");

var response = null;
var resp = null;

const getUsers = async function (options) {

//en options tengo todo lo que me llega por req.query. Lo tengo que destructurar acá.
const {name, orderedbyname} = options;
const sortOptions = [];

//le hago push a mi array de ordenamientos sólo si tengo algo, caso contrario queda vacío.
if (orderedbyname && orderedbyname.toUpperCase()==="DES") sortOptions.push(["name", -1])
if (orderedbyname && orderedbyname.toUpperCase()==="ASC") sortOptions.push(["name"])
const findOptions = {}
if(name){
  findOptions.name = new RegExp(name, 'i');
}

  try {
    const resp = await User.find(findOptions).lean().sort(sortOptions)
    .populate("favorites")//.populate("cart");

    return resp;
  }catch (unError){
    throw new Error(unError)
  }
  
}

module.exports = getUsers;