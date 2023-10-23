import express from "express";

import {addproduct,GetAllProduct,GetsingleProduct,filterProduct} from "../Controllers/ProductControllers.js"
const router=express.Router();


router.post("/CreateProduct",addproduct);
router.get("/AllProducts",GetAllProduct);
router.get("/product/:id",GetsingleProduct);
router.get("/filterProduct/:id",filterProduct);

export default router;