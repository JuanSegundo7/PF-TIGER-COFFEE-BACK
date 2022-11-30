const { Category } = require("../../db.js")

const getCategories = async function (options) {

//en options tengo todo lo que me llega por req.query. Lo tengo que destructurar acá.
const {name, orderedbyname} = options;
const sortOptions = [];

//le hago push a mi array de ordenamientos sólo si tengo algo, caso contrario queda vacío.
if (orderedbyname && orderedbyname.toUpperCase()==="DES") sortOptions.push(["name", -1])
if (orderedbyname && orderedbyname.toUpperCase()==="ASC") sortOptions.push(["name"])

  try {
    const resp = await Category.find({ name: new RegExp(name, 'i') }).sort(sortOptions);
    return resp;
  }catch (unError){
    throw new Error(unError)
  }
  
}

module.exports = getCategories;