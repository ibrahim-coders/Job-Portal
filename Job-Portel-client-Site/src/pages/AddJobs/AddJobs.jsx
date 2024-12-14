import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
const AddJobs = () => {
  const { user } = useAuth();
  const handleAddJob = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    const { min, max, currency, ...newJobs } = initialData;
    newJobs.salaryRange = { min, max, currency };
    newJobs.requirements = newJobs.requirements.split('\n');
    console.log(newJobs);
    fetch('http://localhost:5000/jobs', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newJobs),
    });
    Swal.fire({
      title: 'Job Added!',
      text: 'Your job has been successfully posted.',
      icon: 'success',
      confirmButtonText: 'Okay',
    });
    navigate('/postJobs');
  };
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl mt-6 text-center text-gray-800 font-bold">
        Post a new Job
      </h2>
      <form
        onSubmit={handleAddJob}
        className="card-body space-y-6 max-w-screen-lg mx-auto p-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {/* Job Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                className="input input-bordered w-full sm:max-w-md"
                aria-label="Job Title"
                required
              />
            </div>

            {/* Job Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Job Location"
                className="input input-bordered w-full sm:max-w-md"
                aria-label="Job Location"
                required
              />
            </div>

            {/* Job Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Type</span>
              </label>
              <select
                defaultValue="Pick a Job Type"
                className="select select-bordered w-full sm:max-w-md"
                aria-label="Job Type"
                required
              >
                <option disabled>Pick a Job Type</option>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Intern</option>
              </select>
            </div>

            {/* Job Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Field</span>
              </label>
              <select
                defaultValue="Pick a Job Field"
                className="select select-bordered w-full sm:max-w-md"
                aria-label="Job Field"
                required
              >
                <option disabled>Pick a Job Field</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Finance</option>
                <option>Teaching</option>
              </select>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Min Salary</span>
                </label>
                <input
                  type="number"
                  name="min"
                  placeholder="Min"
                  className="input input-bordered w-full"
                  aria-label="Minimum Salary"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Max Salary</span>
                </label>
                <input
                  type="number"
                  name="max"
                  placeholder="Max"
                  className="input input-bordered w-full"
                  aria-label="Maximum Salary"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Currency</span>
                </label>
                <select
                  defaultValue="Currency"
                  name="currency"
                  className="select select-bordered w-full"
                  aria-label="Currency"
                  required
                >
                  <option disabled>Currency</option>
                  <option>BDT</option>
                  <option>USD</option>
                  <option>INR</option>
                </select>
              </div>
            </div>

            {/* Company Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                className="input input-bordered w-full sm:max-w-md"
                aria-label="Company Name"
                required
              />
            </div>

            {/* Job Requirements */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Requirements</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full sm:max-w-md"
                placeholder="List each requirement on a new line"
                name="requirements"
                aria-label="Job Requirements"
                required
              ></textarea>
            </div>
          </div>

          <div>
            {/* Job Responsibilities */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Responsibilities</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full sm:max-w-md"
                placeholder="List each responsibility on a new line"
                name="responsibilities"
                aria-label="Job Responsibilities"
                required
              ></textarea>
            </div>

            {/* HR Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">HR Name</span>
              </label>
              <input
                type="text"
                name="hr_name"
                defaultValue={user?.name}
                placeholder="HR Name"
                className="input input-bordered w-full sm:max-w-md"
                aria-label="HR Name"
                required
              />
            </div>

            {/* HR Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">HR Email</span>
              </label>
              <input
                type="email"
                defaultValue={user?.email}
                name="hr_email"
                placeholder="HR Email"
                className="input input-bordered w-full sm:max-w-md"
                aria-label="HR Email"
                required
              />
            </div>

            {/* Application Deadline */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Application Deadline</span>
              </label>
              <input
                type="date"
                name="applicationDeadline"
                className="input input-bordered w-full sm:max-w-md"
                aria-label="Application Deadline"
                required
              />
            </div>

            {/* Company Logo URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Logo URL</span>
              </label>
              <input
                type="url"
                name="company_logo"
                placeholder="Company Logo URL"
                className="input input-bordered w-full sm:max-w-md"
                aria-label="Company Logo URL"
                required
              />
            </div>

            {/* Job Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Job Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full sm:max-w-md"
                placeholder="Describe the job role and expectations"
                name="description"
                aria-label="Job Description"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            className="btn btn-primary w-full sm:w-auto"
            aria-label="Submit Job"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJobs;
