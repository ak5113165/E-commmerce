import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
// import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    async function getProducts() {
      setloading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/product/${id}`
        );
        // console.log(response.data);
        setdata(response.data);
      } catch (error) {
        console.log(error);
        console.log("something went wrong");
      }
      setloading(false);
    }

    getProducts();
  }, [id]);
  const Image1 = "http://localhost:3001/images/" + data.img1;
  const Image2 = "http://localhost:3001/images/" + data.img2;

  const [selectedImg, setSelectedImg] = useState(1);
  // console.log(selectedImg);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img src={Image1} alt="" onClick={(e) => setSelectedImg(1)} />
          <img src={Image2} alt="" onClick={(e) => setSelectedImg(0)} />
        </div>
        <div className="mainImg">
          <img src={selectedImg === 1 ? Image1 : Image2} alt="" />
        </div>
      </div>
      <div className="right">
        <h1>{data.title}</h1>
        <span className="price">{data.price}$</span>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque
          aperiam sed nostrum quae doloremque placeat odit reiciendis, tempore,
          alias, atque enim magnam. Eligendi molestias alias perspiciatis
          voluptatibus adipisci sint nulla?
        </p>
        <div className="quantity">
          <button
            onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
          >
            -
          </button>
          {quantity}
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button
          className="add"
          onClick={() =>
            dispatch(
              addToCart({
                id: data._id,
                title: data.title,
                price: data.price,
                img: Image1,
                quantity,
              })
            )
          }
        >
          <AddShoppingCartIcon />
          ADD TO CART
        </button>
        <div className="links">
          <div className="item">
            <FavoriteBorderIcon /> ADD TO WISH LIST
          </div>
          <div className="item">
            <BalanceIcon /> ADD TO COMPARE
          </div>
        </div>
        <div className="info">
          <span>Vendor: Polo</span>
          <span>Product Type: T-Shirt</span>
          <span>Tag: T-Shirt, Women, Top</span>
        </div>
        <hr />
        <div className="info">
          <span>DESCRIPTION</span>
          <hr />
          <span>ADDITIONAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
