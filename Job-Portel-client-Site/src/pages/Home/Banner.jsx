import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
const Banner = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="hero  min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
        <div className="flex-1">
          <motion.img
            animate={{ y: [50, 100, 50] }}
            transition={{
              duration: 10,

              repeat: Infinity,
            }}
            src={banner1}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Job Portal Banner"
          />
          <motion.img
            animate={{ x: [100, 150, 100] }}
            transition={{
              duration: 10,

              repeat: Infinity,
            }}
            src={banner2}
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Job Portal Banner"
          />
        </div>
        <div
          className="flex-1 ml-4 md:mx-10"
          data-aos="fade-up"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="2000"
        >
          <motion.h1
            transition={{
              ease: 'easeOut',
              repeat: Infinity,
            }}
            className="text-5xl font-bold"
          >
            The
            <motion.span
              animate={{ color: ['#ecff33', '#33ffe3', '#ff6133'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span> Easiest Way</span>
            </motion.span>{' '}
            to Get Your New Job
          </motion.h1>
          <p className="py-6">
            Each month, more than 3 million job seekers turn to the website in
            their search for work, making over 140,000 applications every single
            day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
