import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MyApplication = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/job-application?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
      });
  }, [user.email]);

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6">
        Apply Jobs ({jobs.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Job Title</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job._id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={job.company_logo}
                      alt={`${job.company} logo`}
                      className="h-10 w-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{job.title}</p>
                      <p className="text-sm text-gray-500">{job.location}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <p className="font-medium">{job.title}</p>
                  <p className="text-sm text-gray-500">{job.company}</p>
                </td>
                <td className="px-4 py-2">{job.company}</td>
                <td className="px-4 py-2">
                  <button className="btn btn-sm btn-primary">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
