const { Category } = require("../../db.js")

const createCategory = async function (data) {

  const { name } = data;

//Data Validation
if ((typeof(name)!=="string") || (!name.length)){
  throw new Error("Error: Category Name cannot be empty and must be of text type.")
}

try {
    const newCategory =  await Category.create({name: name.toLowerCase()});
    return newCategory;
}catch (unError){
    throw new Error(unError)
}
  
}

module.exports = createCategory;