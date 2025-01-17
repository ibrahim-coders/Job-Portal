import { useContext, useState } from 'react';
import { BsEyeSlash } from 'react-icons/bs';
import { LiaEyeSolid } from 'react-icons/lia';
import Swal from 'sweetalert2';

import AuthContext from '../../Context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';

const Register = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const from = location.state || '/';
  const { creactUser, singwithGoogle } = useContext(AuthContext);

  const [error, setError] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);

  const passwordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const handelRegister = e => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, email, password);

    setError('');

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError('Password must include at least one uppercase letter.');
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError('Password must include at least one lowercase letter.');
      return;
    }

    if (!/\d/.test(password)) {
      setError('Password must include at least one number.');
      return;
    }

    creactUser(email, password)
      .then(result => {
        console.log(result.user);
        Swal.fire({
          position: 'justify-center',
          icon: 'success',
          title: 'Registration successful!',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    singwithGoogle()
      .then(result => console.log(result.user))
      .catch(error => console.log(error.message));
  };
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen max-w-4xl w-full mx-auto p-4 gap-4">
      {/* Lottie Animation */}
      <dotlottie-player
        src="https://lottie.host/bd34159c-d9cc-438f-b95c-8b6bcf85be7d/AzewCBnRkN.lottie"
        background="transparent"
        speed="1"
        style={{ width: '300px', height: '300px' }}
        loop
        autoplay
        className="mb-8 md:mb-0 md:mr-6"
      ></dotlottie-player>

      {/* Registration Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mt-10">
        {/* Registration Form */}
        <form onSubmit={handelRegister} className="space-y-4">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                name="password"
                placeholder="Enter your password"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
              <span
                onClick={passwordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              >
                {showPasswords ? <LiaEyeSolid /> : <BsEyeSlash />}
              </span>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Register
          </button>
        </form>
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="border-t w-full border-gray-300"></div>
          <p className="px-4 text-gray-500 text-sm w-full">Or continue with</p>
          <div className="border-t w-full border-gray-300"></div>
        </div>
        {/* Google Sign-In Button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-3 w-full px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
        >
          <FcGoogle className="text-2xl" />
          <span className="text-lg font-medium">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
