import mongoose from "mongoose";

const productsFullSchema = mongoose.Schema(
  {
    id: String,
    productFull: String,
    productName: String,
    productDesc: String,
    productPrice: Number,

    token: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("productsFull", productsFullSchema);
