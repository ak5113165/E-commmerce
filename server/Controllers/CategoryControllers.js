import Category from "../Modals/Categorys.js";

export const addCat = async (req, res) => {
  try {
    const { Catname } = req.body;
    const NewCat= new Category({
        Catname,
    });
    const savedCat=await NewCat.save();
    res.status(201).json(savedCat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const GetAllCat=async(req,res)=>{
    try {
        const data= await Category.find();
        res.status(201).json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
};
