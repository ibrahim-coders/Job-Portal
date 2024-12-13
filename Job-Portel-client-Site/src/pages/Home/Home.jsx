import Job from '../Job/Job';
import Banner from './Banner';
import JobsHeading from './JobsHeading/JobsHeading';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner />
      <JobsHeading />
      <Job />
    </div>
  );
};

export default Home;
