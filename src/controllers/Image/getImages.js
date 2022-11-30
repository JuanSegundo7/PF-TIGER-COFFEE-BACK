const {Image} = require("../../db.js")

const getImages = async function(){
    const respuesta = Image.find();
    return respuesta;
}

module.exports = getImages;