import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import List from "../../components/List/List";
// import useFetch from "../../hooks/useFetch";
import "./Products.scss";

const Products = () => {
  const catId = useParams().id;
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState(null);
  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log(value);
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedSubCats(
        // Replace the state
        [
          // with a new array
          ...selectedSubCats, // that contains all the old items
          { id: value }, // and one new item at the end
        ]
      );
    }
  };
  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3001/auth/getAllSubCat"
        );
        // console.log(response.data);
        setdata(response.data);
        setloading(false);
      } catch (error) {
        setloading(false);

        console.log(error);
        console.log("something went wrong");
      }
    }

    getProducts();
  }, []);

  console.log(selectedSubCats);
  return (
    <div className="products">
      <div className="left">
        <div className="filterItem">
          <h2>Product Categories</h2>
          {data.map((item) => (
            <div className="inputItem" key={item._id}>
              <input
                type="checkbox"
                id={item._id}
                value={item._id}
                onChange={handleChange}
              />
              <label htmlFor={item._id}>{item.SubCatname}</label>
            </div>
          ))}
        </div>
        <div className="filterItem">
          <h2>Filter by price</h2>
          <div className="inputItem">
            <span>0</span>
            <input
              type="range"
              min={0}
              max={1000}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className="filterItem">
          <h2>Sort by</h2>
          <div className="inputItem">
            <input
              type="radio"
              id="asc"
              value="asc"
              name="price"
              onChange={(e) => setSort("asc")}
            />
            <label htmlFor="asc">Price (Lowest first)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              id="desc"
              value="desc"
              name="price"
              onChange={(e) => setSort("desc")}
            />
            <label htmlFor="desc">Price (Highest first)</label>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          className="catImg"
          src="https://images.pexels.com/photos/1074535/pexels-photo-1074535.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
        />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort}
          subCats={selectedSubCats}
        />
      </div>
    </div>
  );
};

export default Products;
