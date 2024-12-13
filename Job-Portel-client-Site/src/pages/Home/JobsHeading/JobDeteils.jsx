import { Link, useLoaderData } from 'react-router-dom';

const JobDetails = () => {
  const job = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Job Header */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 border-b pb-4">
        <img
          src={job.company_logo}
          alt={`${job.company} logo`}
          className="w-20 h-20 object-contain"
        />
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">{job.company}</h1>
          <p className="text-gray-500">{job.category}</p>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Job Description</h2>
        <p className="text-sm md:text-base text-gray-700">{job.description}</p>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Job Type</h2>
          <p className="text-gray-700">{job.jobType}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Location</h2>
          <p className="text-gray-700">{job.location}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Application Deadline</h2>
          <p className="text-gray-700">{job.applicationDeadline}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">HR Contact</h2>
          <p className="text-gray-700">
            {job.hr_name} ({job.hr_email})
          </p>
        </div>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Requirements</h2>
        <ul className="list-disc list-inside text-gray-700">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
      <Link to={`/jobApply/${job._id}`} className="">
        <button className="btn btn-primary bg-sky-600 hover:bg-sky-700 border-none text-white rounded transition-all duration-300 mt-4">
          Apply Now
        </button>
      </Link>
    </div>
  );
};

export default JobDetails;
