import Product from "../Modals/Products.js";
import Category from "../Modals/Categorys.js";
import SubCategory from "../Modals/SubCategory.js";

export const addproduct = async (req,res) => {
const img1=req.files.img1[0].filename;
const img2=req.files.img2[0].filename;
const CatId=req.body.category
const data= await Category.findOne({_id:CatId});
const SubCatId=req.body.subcategory;
const data1=await SubCategory.findOne({_id:SubCatId});
const category=data;
const subcategory=data1;
  try {
    const { title, oldPrice, price, isFeatured } = req.body;
    const newProduct = new Product({
      title,
      oldPrice,
      img1,
      img2,
      price,
      isFeatured,
      category,
      subcategory,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const GetAllProduct=async(req,res)=>{
  const id=req.query.type;
  const ans=(id==="trending")?1:0;
  try {
    const data=await Product.find({isFeatured:ans});
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const GetsingleProduct=async(req,res)=>{
  console.log(req.params.id);
  
  const Id=req.params.id;
  try{
    const data= await Product.findById({_id:Id});
    res.status(201).json(data);
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}

export const filterProduct=async(req,res)=>{
  console.log(req.params.id);
  console.log(req.query);
  try{
    const data=await Product.find({
      category:req.params.id
      // price:{ $gt: 0, $lt: req.query.Max },
    });
    res.status(201).json(data);

  }
  catch(err)
  {
    res.status(500).json({ error: err.message });
  }
}
