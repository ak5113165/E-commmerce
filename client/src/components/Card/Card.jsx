import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  // console.log(item);
  return (
    <Link className="link" to={`/product/${item._id}`}>
      <div className="card">
        <div className="image">
          {item.isFeatured===1&& <span>New season</span>}
          <img src={"http://localhost:3001/images/"+item.img1} alt="" className="mainImg" />
          <img src={"http://localhost:3001/images/"+item.img2}alt="" className="secondImg" />
        </div>
        <h2>{item.title}</h2>
        <div className="prices">
          <h3>${item.oldPrice}</h3>
          <h3>${item.price}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
