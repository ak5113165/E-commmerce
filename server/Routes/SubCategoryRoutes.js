import express from "express";
import { addSubCat,GetAllSubCat } from "../Controllers/SubCategoryControllers.js";
const router=express.Router();

router.post("/addSubcategory",addSubCat);

router.get("/getAllSubCat",GetAllSubCat);

export default router;