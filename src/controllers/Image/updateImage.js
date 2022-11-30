const {Image} = require("../../db.js")

const updateImage = async function(id,data){
    try {
        const {name , url} = data;
        const update = {
            name,
            url
        }
        const respuesta = await Image.findByIdAndUpdate(id,update);
        // if (!resp) return "No image match has been found..."
        return respuesta;
        
    } catch (unError) {
        throw new Error("No image match has been found...");
    }
}

module.exports = updateImage;