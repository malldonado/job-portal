import React, { useState, useEffect } from "react";
import Banner from "../src/components/Banner";
import Jobs from "../Pages/Jobs";
import Card from "../src/components/Card";

const Home = () => {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch jobs data from JSON file
  useEffect(() => {
    fetch("jobs.json")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
      });
  }, []);

  // Handle input change for filtering
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Filter jobs based on query and selected category
  const filteredData = () => {
    let filteredJobs = jobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedCategory) {
      filteredJobs = filteredJobs.filter(
        ({
          jobLocation,
          maxPrice,
          experienceLevel,
          salaryType,
          employmentType,
          postingDate,
        }) =>
          jobLocation.toLowerCase() === selectedCategory.toLowerCase() ||
          postingDate === selectedCategory ||
          parseInt(maxPrice) <= parseInt(selectedCategory) ||
          salaryType.toLowerCase() === selectedCategory.toLowerCase() ||
          experienceLevel.toLowerCase() === selectedCategory.toLowerCase() ||
          employmentType.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  };

  // Event handlers
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Compute filtered result
  const result = filteredData();

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">Left</div>
        <div className="col-span-2 bg-white p-4 rounded-sm">
          <Jobs result={result} />
        </div>
        <div className="bg-white p-4 rounded">Right</div>
      </div>
    </div>
  );
};

export default Home;
