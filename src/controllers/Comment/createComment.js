const {Comment, User} = require('../../db.js');

const createComment = async (data) => {

    const { user, content } = data;

    //Data Validation
    if ((typeof(content)!=="string") || (!content.length)){
        throw new Error("Error: Comments cannot be empty and must be of text type.")
    }

    try{
        let resp = await User.findById(user)
        if (!resp) throw new Error(`User id:${user} not found in the Database!`)
    }catch(unError){
        throw new Error(unError.message)
    }

    //if no errors, the comment is created
    try {
        const comment = await Comment.create({user, content});
        return comment;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = createComment;