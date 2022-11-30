const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  { name: {type: String, required: true},
    description: {type: String, required: true},
    origin: String,
    price: {type: Number, required: true},
    grinding_type: String,
    stock: {type: Number, required: true},
    enabled: {type: Boolean, default: true},
    total_accumulated: Number,
    total_purchases: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category" //Esta es la forma de hacer las cosas con Mongoose y BBDD no relacionales.
    },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image"
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand"
    }
  },
  {versionKey: false}
  );

const Product = mongoose.model("Product",ProductSchema) 

//1

module.exports = Product;
