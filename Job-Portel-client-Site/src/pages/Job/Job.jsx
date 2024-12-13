import { useEffect, useState } from 'react';
import Jobs from './Jobs';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);
  return (
    <div className="max-w-7xl px-6 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
      {jobs.map(job => (
        <Jobs key={job._id} job={job}></Jobs>
      ))}
    </div>
  );
};

export default Job;
