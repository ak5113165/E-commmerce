import SubCategory from "../Modals/SubCategory.js";

export const addSubCat = async (req, res) => {
  try {
    const { SubCatname } = req.body;
    const NewSubCat= new SubCategory({
        SubCatname,
    });
    const savedSubCat=await NewSubCat.save();
    res.status(201).json(savedSubCat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const GetAllSubCat=async(req,res)=>{
    try {
        const data= await SubCategory.find();
        res.status(201).json(data);

    } catch (err) {
        res.status(500).json({ error: err.message });

    }
};
