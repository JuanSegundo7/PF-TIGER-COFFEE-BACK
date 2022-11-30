const { Product, Category, Brand } = require("../../db.js");

const getProducts = async function (options) {
  //en options tengo todo lo que me llega por req.query. Lo tengo que destructurar acá.
  const {
    name,
    category,
    brand,
    enabled,
    orderedbyname,
    orderedbystock,
    orderedbyprice,
  } = options;
  const sortOptions = [];

  //le hago push a mi array de ordenamientos sólo si tengo algo, caso contrario queda vacío.
  if (orderedbyname && orderedbyname.toUpperCase() === "DES")
    sortOptions.push(["name", -1]);
  if (orderedbyname && orderedbyname.toUpperCase() === "ASC")
    sortOptions.push(["name"]);

  if (orderedbystock && orderedbystock.toUpperCase() === "DES")
    sortOptions.push(["stock", -1]);
  if (orderedbystock && orderedbystock.toUpperCase() === "ASC")
    sortOptions.push(["stock"]);

  if (orderedbyprice && orderedbyprice.toUpperCase() === "DES")
    sortOptions.push(["price", -1]);
  if (orderedbyprice && orderedbyprice.toUpperCase() === "ASC")
    sortOptions.push(["price"]);

  //Armo el parámetro del Find
  const findOptions = {};
  
  if (name) {
    findOptions.name = new RegExp(name, "i");
  }
  if (category) {
    try {
      var categoryComplete = await Category.findOne({ name: category });
    } catch (unError) {
      throw new Error(unError);
    }
    if (categoryComplete) findOptions.category = categoryComplete._id;
  }
  if (brand) {
    try {
      var brandComplete = await Brand.findOne({ name: brand });
    } catch (unError) {
      throw new Error(unError);
    }
    if (brandComplete) findOptions.brand = brandComplete._id;
  }
  if (enabled) {
    findOptions.enabled = enabled;
  }

  //Ahora sí, realizo la búsqueda...
  try {
    const resp = await Product.find(findOptions)
      .sort(sortOptions)
      .populate("image")
      .populate("category")
      .populate("brand");
    return resp;
  } catch (unError) {
    throw new Error(unError);
  }
};

module.exports = getProducts;
