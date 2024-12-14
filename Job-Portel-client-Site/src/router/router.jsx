import { createBrowserRouter } from 'react-router-dom';
import MainLaout from '../layout/MainLaout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import JobDeteils from '../pages/Home/JobsHeading/JobDeteils';
import PrivatRoute from './PrivatRoute';
import JobApply from '../pages/Home/JobApply/JobApply';
import MyApplication from '../pages/MyApplication/MyApplication';
import AddJobs from '../pages/AddJobs/AddJobs';
import MyPostJobs from '../pages/MyPostJobs/MyPostJobs';
import ViewApplication from '../pages/Job/ViewApplication';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLaout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/jobs/:id',
        element: (
          <PrivatRoute>
            <JobDeteils />
          </PrivatRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: '/jobApply/:id',
        element: (
          <PrivatRoute>
            <JobApply />
          </PrivatRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`http://localhost:5000/jobs/${params.id}`),
      },
      {
        path: '/myApplication',
        element: (
          <PrivatRoute>
            <MyApplication />
          </PrivatRoute>
        ),
      },
      {
        path: '/addJobs',
        element: (
          <PrivatRoute>
            <AddJobs />
          </PrivatRoute>
        ),
      },
      {
        path: '/postJobs',
        element: (
          <PrivatRoute>
            <MyPostJobs />
          </PrivatRoute>
        ),
      },
      {
        path: '/viewApplication/:job_id',
        element: (
          <PrivatRoute>
            <ViewApplication />
          </PrivatRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/job-application/jobs/${params.job_id}`),
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);

export default router;
