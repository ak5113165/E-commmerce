import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        StripeID:{
            type:String,
            require:true,
        },
        Products: {
          type: Array,
          require:true,
        },
      },
  { timestamps: true }
);

const Order = mongoose.model("Orders", OrderSchema);
export default Order;
