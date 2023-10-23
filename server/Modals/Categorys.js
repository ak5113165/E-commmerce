import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    Catname: {
      type: String,
      require:true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Categorys", CategorySchema);
export default Category;
