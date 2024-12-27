import axios from 'axios';
import { useEffect, useState } from 'react';
import All_Job from './All_Job';
import { IoIosSearch } from 'react-icons/io';

const All_Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all-jobs');
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = () => {
    const searchData = jobs.filter(job =>
      job.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredJobs(searchData);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 items-center justify-center p-4">
        <div className="relative w-full max-w-xs">
          {/* Input field for search */}
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Type here"
            className="input input-bordered input-info w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-info"
          />
          {/* Search icon */}
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
        </div>

        {/* Search button */}
        <button
          onClick={handleSearch}
          className="btn btn-primary bg-sky-600 hover:bg-sky-700 border-none text-white rounded transition-all duration-300 px-6"
        >
          Search
        </button>
      </div>

      {/* Display filtered jobs or message if no jobs */}
      {filteredJobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <div className="max-w-7xl px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
          {filteredJobs.map(job => (
            <All_Job key={job._id} job={job}></All_Job>
          ))}
        </div>
      )}
    </div>
  );
};

export default All_Jobs;
