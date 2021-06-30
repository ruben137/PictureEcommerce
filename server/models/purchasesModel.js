import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema(
  {
    owner: String,
    token: String,

  },
  { timestamps: true }
);


export default mongoose.model('purchases', purchaseSchema)