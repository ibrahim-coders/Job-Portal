import { useLoaderData } from 'react-router-dom';

const JobDeteils = () => {
  const job = useLoaderData();
  console.log(job);
  return (
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione tenetur
      perspiciatis facilis quia, sapiente nostrum rerum corrupti excepturi iure
      aut?
    </div>
  );
};

export default JobDeteils;
