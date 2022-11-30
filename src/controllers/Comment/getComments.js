const {Comment} = require('../../db.js');

const getComments = async ()=>{
    const allComments = await Comment.find().populate("user",["name","lastname","picture"])
    return allComments;
}

module.exports = getComments;