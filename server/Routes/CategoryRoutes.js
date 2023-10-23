import express from "express";
import { addCat,GetAllCat} from "../Controllers/CategoryControllers.js";
const router=express.Router();

router.post("/addcategory",addCat);

router.get("/getAll",GetAllCat);

export default router;