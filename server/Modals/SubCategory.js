import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema(
  {
    SubCatname: {
      type: String,
      require:true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
export default SubCategory;
