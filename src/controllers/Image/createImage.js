const { Image } = require('../../db.js');


const createImage = async function (data) {
    const { url, name } = data;
    let regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    //Data validation
    if ((typeof (name) !== "string") || (!name.length)) {
        throw new Error("Error: Image Name cannot be empty and must be of text type.")
    }
    if (!regex.test(url)) {
        throw new Error("Error: Image not URL.")
    }
    //si no hay error subo la imagen
    try {
        const newImage = await Image.create({ url, name });
        return newImage;
    } catch (unError) {
        throw new Error(unError)
    }
}

module.exports = createImage;
