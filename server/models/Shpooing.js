import mongoose from "mongoose";

const ShoppingCartSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true,
    },
    count: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        default: 0.0,
    },

    savedAddresses: {
        type: Number,
        default: 0.0,
    },
}, 
{ timestamps: true });

const ShoppingCartModel = mongoose.model("ShoppingCart", ShoppingCartSchema);
export default ShoppingCartModel;
