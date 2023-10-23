import {Schema,mongoose} from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    img1: {
      type: String,
      default: "",
    },
    img2: {
      type: String,
      default: "",
    },
    oldPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: "Categorys" },
    subcategory: { type: Schema.Types.ObjectId, ref: "SubCategory" },
    isFeatured: {
      type: Number,
      default:0,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("Products", ProductsSchema);
export default Products;
