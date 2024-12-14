import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MyPostJobs = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  console.log(jobs);
  useEffect(() => {
    fetch(`http://localhost:5000/jobs?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
      });
  }, [user.email]);
  return (
    <div>
      <h2 className="text-center text-gray-800 font-bold text-3xl my-8">
        My Posted Jobs: {jobs.length}
      </h2>
      <div className="overflow-x-auto max-w-screen-sm mx-auto my-6">
        <table className="table">
          <tbody>
            {/* Static row */}
            <tr>
              <th>serial</th>
              <td>Name</td>
              <td>Title</td>
              <td>Locatin</td>
              <td>Data</td>
              <td>Application</td>
            </tr>
            {/* Dynamic rows */}
            {jobs.map((job, index) => (
              <tr key={job._id} className="hover">
                <th>{index + 1}</th>{' '}
                {/* Start from 2 if the first row is static */}
                <td>{job.hr_name}</td>
                <td>{job.title}</td>
                <td>{job.location}</td>
                <td>{job.applicationDeadline}</td>
                <td>
                  <Link to={`/viewApplication/${job._id}`}>
                    <button className="btn btn-link">Application</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostJobs;
