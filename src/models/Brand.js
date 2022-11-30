const mongoose = require('mongoose');

const BrandSchema = mongoose.Schema(
  { 
    name: {type: String, required: true},
    image: String
  },
  {versionKey: false}
  );

const Brand = mongoose.model("Brand",BrandSchema) 

module.exports = Brand;
