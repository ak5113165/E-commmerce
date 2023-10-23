import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Categories.scss";
import { Link } from "react-router-dom";

const Categories = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get("http://localhost:3001/auth/getAll");
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
  }, []);

  return loading ? (
    "Loading"
  ) : (
    <div className="categories">
      <div className="col">
        <div className="row">
          <img
            src="https://images.pexels.com/photos/818992/pexels-photo-818992.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link className="link" to={`/products/${data[3]._id}`}>
              Sale
            </Link>
          </button>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/2036646/pexels-photo-2036646.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to={`/products/${data[1]._id}`} className="link">
              Women
            </Link>
          </button>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {" "}
          <img
            src="https://images.pexels.com/photos/1813947/pexels-photo-1813947.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to={`/products/${data[6]._id}`} className="link">
              New Season
            </Link>
          </button>
        </div>
      </div>
      <div className="col col-l">
        <div className="row">
          <div className="col">
            <div className="row">
              <img
                src="https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to={`/products/${data[0]._id}`} className="link">
                  Men
                </Link>
              </button>
            </div>
          </div>
          <div className="col">
            <div className="row">
              {" "}
              <img
                src="https://images.pexels.com/photos/2703202/pexels-photo-2703202.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <button>
                <Link to={`/products/${data[5]._id}`} className="link">
                  Accessories
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <img
            src="https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <button>
            <Link to={`/products/${data[4]._id}`} className="link">
              Shoes
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
