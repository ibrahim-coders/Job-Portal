import { useEffect, useState } from 'react';
import axios from 'axios';

const useJobs = (sort, search) => {
  const [jobs, setJobs] = useState([]);
  const [loding, setLoding] = useState(true);
  console.log(search);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobss?sort=${sort}&search=${search}`)
      .then(res => {
        setLoding(false);
        setJobs(res.data);
      });
  }, [sort, search]);
  return { jobs, loding };
};

export default useJobs;
