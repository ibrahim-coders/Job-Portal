import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const handleSignout = () => {
    signOutUser()
      .then(result => console.log(result.user))
      .catch(error => {
        console.log(error.mesages);
      });
  };
  return (
    <header className=" relative z-20 w-full border-b border-slate-200 bg-white/90  after:absolute after:left-0 after:top-full after:z-10 after:block after:h-px after:w-full after:bg-slate-200 lg:border-slate-200 lg:backdrop-blur-sm lg:after:hidden">
      <div className="relative mx-auto max-w-full px-6 lg:max-w-5xl xl:max-w-7xl 2xl:max-w-[96rem]">
        <nav
          aria-label="main navigation"
          className="flex h-[5.5rem] items-stretch justify-between font-medium text-slate-700"
          role="navigation"
        >
          {/*      <!-- Brand logo --> */}
          <div
            id="WindUI"
            aria-label="WindUI logo"
            aria-current="page"
            className="flex items-center gap-2 whitespace-nowrap py-3 text-lg focus:outline-none lg:flex-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 text-sky-800"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
              />
            </svg>
            <h2 className="text-sky-900 text-2xl font-bold">JobBox</h2>
          </div>
          {/*      <!-- Mobile trigger --> */}
          <button
            className={`relative order-10 block h-10 w-10 self-center lg:hidden
                ${
                  isToggleOpen
                    ? 'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(2)]:-rotate-45 [&_span:nth-child(3)]:w-0 '
                    : ''
                }
              `}
            onClick={() => setIsToggleOpen(!isToggleOpen)}
            aria-expanded={isToggleOpen ? 'true' : 'false'}
            aria-label="Toggle navigation"
          >
            <div className="absolute left-1/2 top-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
              ></span>
              <span
                aria-hidden="true"
                className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
              ></span>
            </div>
          </button>
          {/*      <!-- Navigation links --> */}
          <ul
            role="menubar"
            aria-label="Select page"
            className={`absolute left-0 top-0 z-[-1] h-[28.5rem] w-full justify-center overflow-hidden  overflow-y-auto overscroll-contain bg-white/90 px-8 pb-12 pt-24 font-medium transition-[opacity,visibility] duration-300 lg:visible lg:relative lg:top-0  lg:z-0 lg:flex lg:h-full lg:w-auto lg:items-stretch lg:overflow-visible lg:bg-white/0 lg:px-0 lg:py-0  lg:pt-0 lg:opacity-100 ${
              isToggleOpen
                ? 'visible opacity-100 backdrop-blur-sm'
                : 'invisible opacity-0'
            }`}
          >
            <li role="none" className="flex items-stretch">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-2 py-4 text-emerald-500 font-semibold lg:px-8'
                    : 'flex items-center gap-2 py-4 text-slate-700 hover:text-emerald-500 lg:px-8'
                }
              >
                <span>Home</span>
              </NavLink>
            </li>
            <li role="none" className="flex items-stretch">
              <NavLink
                to="/myApplication"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-2 py-4 text-emerald-500 font-semibold lg:px-8'
                    : 'flex items-center gap-2 py-4 text-slate-700 hover:text-emerald-500 lg:px-8'
                }
              >
                <span> My Application</span>
              </NavLink>
            </li>
            <li role="none" className="flex items-stretch">
              <NavLink
                to="/addJobs"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-2 py-4 text-emerald-500 font-semibold lg:px-8'
                    : 'flex items-center gap-2 py-4 text-slate-700 hover:text-emerald-500 lg:px-8'
                }
              >
                <span>Add Job</span>
              </NavLink>
            </li>
            <li role="none" className="flex items-stretch">
              <NavLink
                to="/postJobs"
                className={({ isActive }) =>
                  isActive
                    ? 'flex items-center gap-2 py-4 text-emerald-500 font-semibold lg:px-8'
                    : 'flex items-center gap-2 py-4 text-slate-700 hover:text-emerald-500 lg:px-8'
                }
              >
                <span>My Post Jobs</span>
              </NavLink>
            </li>
          </ul>
          {/* Actions */}
          <div className="ml-auto flex items-center justify-end px-6 lg:ml-0 lg:flex-1 lg:p-0 gap-4">
            {user && user?.email ? (
              <button
                onClick={handleSignout} // Corrected function name
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Log-Out
              </button>
            ) : (
              <div className="">
                <Link
                  to="/register" // Corrected the link to "/register"
                  className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
