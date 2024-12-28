import useJobs from '../../hooks/useJobs';
import { IoIosSearch } from 'react-icons/io';

import Jobs from '../Job/Jobs';
import { useState } from 'react';

const All_Jobs = () => {
  const [sort, setSort] = useState(false);
  const [search, setSearch] = useState('');
  const { jobs, loding } = useJobs(sort, search);

  if (loding) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <span className="loader relative">
          <span className="absolute animate-ball1 rounded-full h-5 w-5 bg-white shadow-[30px_0_0_#ff3d00] mb-2"></span>
          <span className="absolute animate-ball2 rounded-full h-5 w-5 bg-[#ff3d00] shadow-[30px_0_0_white] mt-2"></span>
        </span>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-center text-3xl my-10">All Jobs</h2>
      <div className="flex flex-wrap gap-4 items-center justify-center p-4">
        <button
          onClick={() => setSort(!sort)}
          className={`btn btn-neutral ${sort && 'btn-success'}`}
        >
          {sort == true ? 'Sorted by Salary' : ' Sort By Salary'}
        </button>
        <div className="relative w-full max-w-xs">
          {/* Input field for search */}
          <input
            onKeyUp={e => setSearch(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-full pl-10 pr-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-info"
          />
          {/* Search icon */}
          <IoIosSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500" />
        </div>

        {/* Search button */}
        <button
          // onClick={handleSearch}
          className="btn btn-primary bg-sky-600 hover:bg-sky-700 border-none text-white rounded transition-all duration-300 px-6"
        >
          Search
        </button>
        <select className="select select-info w-full max-w-xs">
          <option disabled selected>
            Select language
          </option>
          <option>Max</option>
          <option>Min</option>
        </select>
      </div>
      ;
      <div className="max-w-7xl px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
        {jobs.map(job => (
          <Jobs key={job._id} job={job}></Jobs>
        ))}
      </div>
    </div>
  );
};

export default All_Jobs;
