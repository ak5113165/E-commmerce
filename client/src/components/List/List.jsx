import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import { useState,useEffect } from "react";
import axios from "axios";
// import useFetch from "../../hooks/useFetch";
const List = ({ subCats, maxPrice, sort, catId }) => {

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get(`http://localhost:3001/auth/filterProduct/${catId}`);
        console.log(response.data);
        setdata(response.data);
        setloading(false);

      } catch (error) {
        setloading(false);

        console.log(error);
        console.log("something went wrong");
      }
    }

    getProducts();
  }, [catId]);

  return (
    <div className="list">
      {data?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default List;
