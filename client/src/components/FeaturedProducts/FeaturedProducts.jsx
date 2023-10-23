import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
// import useFetch from "../../hooks/useFetch";
// const data = [
//   {
//     id: 1,
//     img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     img2: "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: "long Sleeve Graphic T-shirt",
//     isNew: true,
//     oldPrice: 19,
//     price: 12,
//   },
//   {
//     id: 2,
//     img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     img2: "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: "coat",
//     isNew: true,
//     oldPrice: 19,
//     price: 12,
//   },
//   {
//     id: 3,
//     img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     img2: "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: "coat",
//     oldPrice: 19,
//     price: 12,
//   },
//   {
//     id: 4,
//     img: "https://images.pexels.com/photos/1972115/pexels-photo-1972115.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     img2: "https://images.pexels.com/photos/1163194/pexels-photo-1163194.jpeg?auto=compress&cs=tinysrgb&w=1600",
//     title: "coat",
//     oldPrice: 19,
//     price: 12,
//   },
// ];
const FeaturedProducts = ({ type }) => {
  // const { data, loading, error } = useFetch(
  //   `/products?populate=*&[filters][type][$eq]=${type}`
  // );
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {

    async function getProducts(){
      setloading(true);
      try {
        const response = await axios.get(
          `http://localhost:3001/auth/AllProducts?type=${type}`
        );
        console.log(response.data);
        setdata(response.data);
      } catch (error) {
        console.log(error);
        console.log("something went wrong");
      }
      setloading(false);
  
    }

    getProducts();
  }, []);
  // console.log(data);
  return (
    <div className="featuredProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan
          lacus vel facilisis labore et dolore magna aliqua. Quis ipsum
          suspendisse ultrices gravida. Risus commodo viverra maecenas.
        </p>
      </div>
      <div className="bottom">
        {data.length > 0 &&
          data.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default FeaturedProducts;
