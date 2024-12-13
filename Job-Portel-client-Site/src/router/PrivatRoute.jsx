import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivatRoute = ({ children }) => {
  const location = useLocation();

  const { user, loding } = useContext(AuthContext);

  if (loding) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <span className="loader relative">
          <span className="absolute animate-ball1 rounded-full h-5 w-5 bg-white shadow-[30px_0_0_#ff3d00] mb-2"></span>
          <span className="absolute animate-ball2 rounded-full h-5 w-5 bg-[#ff3d00] shadow-[30px_0_0_white] mt-2"></span>
        </span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location?.pathname} />;
};

export default PrivatRoute;
