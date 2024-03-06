import { useState, useEffect } from "react";
import Banner from "../src/components/Banner";
import Jobs from "../Pages/Jobs";
import Card from "../src/components/Card";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch("jobs.json").then(res => res.json()).then(data => {
        setJobs(data);
        // console.log(data);
      })
  }, [])

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = jobs.filter(
    (job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ---------------- Radio jobs by title

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // ---------------- button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  // main function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    //filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    //category filtering
    if (selected) {
        filteredJobs = filteredJobs.filter(
            ({
              jobLocation,
              salaryType,
              experienceLevel,
              maxPrice,
              postingDate,
              employmentType,
            }) =>
              jobLocation.toLowerCase() === selected.toLowerCase() ||
              postingDate === selected ||
              parseInt(maxPrice) <= parseInt(selected) ||
              salaryType.toLowerCase() === selected.toLowerCase() ||
             experienceLevel.toLowerCase() === selected.toLowerCase() ||
              employmentType.toLowerCase() === selected.toLowerCase()
          );
          console.log(filteredJobs);
      return filteredJobs.map((data, i) => <Card key={i} data={data} />);
    }
  };

  const result = filteredData(jobs, selectedCategory, query);

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
