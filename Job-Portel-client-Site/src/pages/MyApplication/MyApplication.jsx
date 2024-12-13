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
  }, []);
  return <div>my apllicatio {jobs.length}</div>;
};

export default MyApplication;
