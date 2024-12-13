import { FaMapMarkerAlt } from 'react-icons/fa';
import { CiDollar } from 'react-icons/ci';
import { Link } from 'react-router-dom';
const Jobs = ({ job }) => {
  const {
    _id,
    title,
    company,
    company_logo,
    requirements,
    description,
    location,
    salaryRange,
  } = job;
  return (
    <div className="flex justify-center items-center px-4 md:px-0">
      <div className="card card-compact bg-base-100 w-full max-w-md h-auto  shadow-xl rounded-lg transition-transform duration-300 hover:scale-105 hover:border-sky-600 border">
        <div className="flex gap-4 pl-2 pt-2">
          <figure>
            <img
              src={company_logo}
              alt="Company Logo"
              className="w-16 h-16 object-contain"
            />
          </figure>
          <div>
            <h2 className="text-xl text-gray-600 font-semibold">{company}</h2>
            <p className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt /> <span>{location}</span>
            </p>
          </div>
        </div>
        <div className="card-body">
          <div className="flex gap-2 items-center">
            <h2 className="card-title text-lg font-bold">{title}</h2>
            <div className="badge badge-secondary">NEW</div>
          </div>
          <p className="text-sm md:text-base">{description}</p>
          <div className="flex flex-wrap gap-2">
            {requirements.map(skill => (
              <p
                className="btn btn-xs w-auto border border-transparent hover:border-sky-700 hover:text-sky-700 rounded transition duration-300 text-center"
                key={skill}
              >
                {skill}
              </p>
            ))}
          </div>

          <div className="flex justify-between items-center mt-2">
            <p className="flex text-sky-600 items-center text-sm gap-1">
              <CiDollar />
              Salary: {salaryRange.min}-{salaryRange.max}
            </p>
            <Link to={`/jobs/${_id}`}>
              <button className="btn btn-primary bg-sky-600 hover:bg-sky-700 border-none text-white rounded transition-all duration-300">
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
