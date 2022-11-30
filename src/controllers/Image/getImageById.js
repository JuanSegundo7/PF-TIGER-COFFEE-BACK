const {Image} = require("../../db.js")

const getImageById = async function(id){
    try {
        const respuesta = await Image.findById(id)
        if (!respuesta) throw Error();
        return respuesta;
    } catch (unError) {
        throw new Error ("No Image matches the informed id...");
    }
}

module.exports = getImageById