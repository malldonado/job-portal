import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  const { companyName, companyLogo, minPrice, maxPrice, salaryType, jobLocation, employmentType, postingDate, description } = data;
  return (
    <section className="card">
      <Link to="/post-job" className="flex gap-4 flex-col sm:flex-row items-start">
        <img src={companyLogo} alt="" />
        <div className="card-details">

        </div>
      </Link>
    </section>
  );
};

export default Card;
