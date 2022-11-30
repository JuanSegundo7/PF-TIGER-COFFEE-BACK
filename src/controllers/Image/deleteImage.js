const {Image} = require("../../db.js")

const deleteImage = async function(_id){
    try {
        const toDeleteImage = await Image.findById(_id);
        if (toDeleteImage) {
            await Image.deleteOne({ _id });
            return { deletedId: _id };
        }
        throw Error();
    }
    catch (unError) {
        throw new Error("Image to be deleted not found!")
    }
}

module.exports = deleteImage;