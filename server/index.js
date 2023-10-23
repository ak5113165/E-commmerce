import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";
import authRoutes from "./Routes/auth.js"
import ProductRoutes from "./Routes/ProductRoute.js";
import CatRoutes from "./Routes/CategoryRoutes.js";
import SubCatRoutes from "./Routes/SubCategoryRoutes.js"
import { register } from "./Controllers/auth.js"
import { addproduct } from "./Controllers/ProductControllers.js";
import Stripe from "stripe";
const stripe = new Stripe('sk_test_51O4TIbSD5qFJgD57tm32ldhwmVLkzw1itADvVB9gLNgvOnL7U31P0k4vRrYpuN9cPy7BE4szAXQgzwLk2mktGLI70078svb3cD');


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.static('publict'));
app.use('/images', express.static('public/assets'));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.post("/auth/register", upload.single("picturePath") ,register);

app.post("/auth/CreateProduct",upload.fields([{name:'img1',maxCount:1},{name:'img2',maxCount:1}]),addproduct)

app.use("/auth", authRoutes);
app.use("/auth",ProductRoutes);
app.use("/auth",CatRoutes);
app.use("/auth",SubCatRoutes);
app.post("/auth/order",async(req,res)=>{
  const {products} = req.body;


  const lineItems = products.map((product)=>({
      price_data:{
          currency:"inr",
          product_data:{
              name:product.title
          },
          unit_amount:product.price * 100,
      },
      quantity:product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000",
      cancel_url:"http://localhost:3000/cancel",
  });

  res.json({id:session.id})

})


const PORT = 3001 || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));