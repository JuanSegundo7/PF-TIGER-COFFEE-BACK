const {Comment} = require('../../db.js');
 
const deleteComment = async (_id)=>{
    const toDeleteComment = await Comment.findById(_id);
    if (toDeleteComment) {
        await Comment.deleteOne({ _id });
        return { deletedId: _id };
    }
    throw new Error('Error: Comment to delete not found');

}

module.exports = deleteComment;