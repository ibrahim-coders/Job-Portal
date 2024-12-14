import { useLoaderData } from 'react-router-dom';

const ViewApplication = () => {
  const application = useLoaderData();
  console.log(application);
  const handleChangeStates = (e, id) => {
    console.log(e.target.value, id);
    const data = {
      states: e.target.value,
      id,
    };
    fetch(`http://localhost:5000/job-application/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/josn',
      },
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };
  return (
    <div>
      <h2 className="text-3xl text-center my-10">
        Application for this job: {application.length}
      </h2>
      <div className="overflow-x-auto max-w-screen-sm mx-auto my-6">
        <table className="table">
          <tbody>
            {/* Static row */}
            <tr>
              <th>serial</th>
              <td>email</td>
              <td>Name</td>
              <td>Update states</td>
              <td>Data</td>
            </tr>
            {/* Dynamic rows */}
            {application.map((job, index) => (
              <tr key={job._id} className="hover">
                <th>{index + 1}</th>
                {/* Start from 2 if the first row is static */}
                <td>{job.application_email}</td>
                <td>{job.name}</td>
                <td>{job.location}</td>
                <td>
                  <select
                    onChange={e => handleChangeStates(e, job._id)}
                    defaultValue={application.states || 'Changes Status'}
                    className="select select-info w-full max-w-xs"
                  >
                    <option disabled>Changes Status</option>
                    <option>Under Review</option>
                    <option>Set Intrview</option>
                    <option>Hired</option>
                    <option>Rejeacd</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplication;
