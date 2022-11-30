const { User } = require("../../db.js")

const deleteUser = async function (_id) {

    try{  
      
        const toDeleteUser = await User.findById(_id);
        if (toDeleteUser){
          await User.deleteOne({_id}); //ojo, acá estoy usando object literals
          return {deletedId: _id};
        }
        else return "Id to be deleted not found!"; 
  
      }
      catch(unError){
        throw new Error(unError.message)
      }
      
}

module.exports = deleteUser;