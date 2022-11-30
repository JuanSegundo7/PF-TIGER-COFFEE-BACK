const { User, Product } = require("../../db");
const ObjectId = require("mongoose").Types.ObjectId;

const updateUser = async function (_id, data) {
  let { name, lastname, favorites, picture, cart, admin, enabled } = data; //esto es req.params

  //Data Validation
  if (typeof _id !== "string" || !_id.length) {
    throw new Error("Error: User ID cannot be empty and must be of text type.");
  } else {
    const previusId = await User.findById(_id);
    // console.log(_id)
    // console.log(previusId)
    if (!previusId)
      throw new Error("Error: User ID not found within the Database.");
  }

  if (name) {
    if (typeof name !== "string" || !name.length) {
      throw new Error(
        "Error: User name cannot be empty and must be of text type."
      );
    } else {
      name = name.toLowerCase();
    }
  }

  if (lastname) {
    if (typeof lastname !== "string" || !lastname.length) {
      throw new Error(
        "Error: User lastname cannot be empty and must be of text type."
      );
    } else {
      lastname = lastname.toLowerCase();
    }
  }

  if (admin && typeof admin !== "boolean") {
    throw new Error(
      "Error: Admin rights should be of boolean type (true for admin, false for regular users)."
    );
  }

  if (enabled && typeof enabled !== "boolean") {
    throw new Error(
      "Error: User disablement should be of boolean type (true for enabled, false for disabled)."
    );
  }

  if (picture) {
    if (typeof picture !== "string") {
      throw new Error("Error: Picture must be of text type (URL).");
    }
  }

  //Favorites validation is kinda hard but still needed.
  if (favorites) {
    if (!Array.isArray(favorites)) {
      throw new Error(
        "No valid data type provided for favorites. It should be an array!"
      );
    }
    if (favorites.length) {
      for (let i = 0; i < favorites.length; i++) {
        if (typeof favorites[i] !== "string" || !ObjectId.isValid(favorites[i]))
          throw new Error("No valid _id type provided for favorites!");
      }
      //assuming everything is an object, I will really search for the existing ids within my database
      for (let i = 0; i < favorites.length; i++) {
        try {
          let resp = await Product.findById(favorites[i]);
          if (!resp)
            throw new Error(
              `Product id:${favorites[i]} not found in the Database!`
            );
        } catch (unError) {
          throw new Error(unError.message);
        }
      }
    }
  }

  //Cart validation (same as for favorites)
  if (cart) {
    if (!Array.isArray(cart)) {
      throw new Error(
        "No valid data type provided for cart. It should be an array!"
      );
    }
    if (cart.length) {
      for (let i = 0; i < cart.length; i++) {
        if (typeof cart[i]._id !== "string" || !ObjectId.isValid(cart[i]._id))
          throw new Error("No valid _id type provided for cart product!");
        if (typeof cart[i].quantity !== "number" || cart[i].quantity < 1)
          throw new Error(
            "No valid quantity type provided for cart product! (it should be at least 1)"
          );
      }
      //assuming everything is an objectId, I will really search for the existing ids within my database
      for (let i = 0; i < cart.length; i++) {
        try {
          let resp = await Product.findById(cart[i]._id);
          if (!resp)
            throw new Error(
              `Product id:${cart[i]._id} not found in the Database!`
            );
        } catch (unError) {
          throw new Error(unError.message);
        }
      }
    }
  }

  //Si no encuentro error alguno, actualizo el/los dato/s.
  try {
    const filter = { _id };
    const update = {
      name,
      lastname,
      favorites,
      picture,
      cart,
      admin,
      enabled,
    };
    let resp = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    if (!resp) return "No User match has been found...";
    else return resp;
  } catch (unError) {
    throw new Error(unError.message);
  }
};

module.exports = updateUser;
