import { useLoaderData } from 'react-router-dom';

const ViewApplication = () => {
  const application = useLoaderData();
  console.log(application);
  return (
    <div>
      <h2 className="text-3xl text-center my-10">
        Application for this job{application.length}
      </h2>
    </div>
  );
};

export default ViewApplication;
