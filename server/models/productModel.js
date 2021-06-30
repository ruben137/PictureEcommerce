import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  productImg: String,
  productName: String,
  productDesc: String,
  productPrice:Number,
  isAvailable: { type: Boolean, default: true },

  

},
  { timestamps: true }
)


export default mongoose.model('products', productSchema)