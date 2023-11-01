import { Link } from "react-router-dom";
import "./popularcategories.css";
import React from "react";

function PopularCategories() {
  return (
    <div className="categories-container">
      <br></br>
      <b className="categ-header">Most popular categories</b>

      <div className="flex-display">
        <div className="categ-cont">
          <Link to="/browse/services">
            <software-img></software-img>
            <b className="label1">Software Engineer</b>
          </Link>
        </div>

        <div className="categ-cont">
          <Link to="/browse/services">
            <designers-img></designers-img>
            <b className="label1">Designers</b>
          </Link>
        </div>

        <div className="categ-cont">
          <Link to="/browse/services">
            <photo-img></photo-img>
            <b className="label1">Photographers</b>
          </Link>
        </div>

        <div className="categ-cont">
          <Link to="/browse/services">
            <transporters-img></transporters-img>
            <b className="label1">transporters</b>
          </Link>
        </div>

        <div className="categ-cont">
          <Link to="/browse/services">
            <bricklayers-img></bricklayers-img>
            <b className="label1">bricklayers</b>
          </Link>
        </div>
      </div>

      <Link to="/browse/categories" className="categ-btn">
        All Categories <arrow-part />
      </Link>
      <br></br>
    </div>
  );
}

export default PopularCategories;
