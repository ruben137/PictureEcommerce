import  mongoose  from "mongoose";

const shoppingCartSchema = mongoose.Schema({
  cartOwner:{type:String},
  products:{type:Array,default:[]}
},
  { timestamps: true }
)



export default mongoose.model('shoppingCart', shoppingCartSchema)