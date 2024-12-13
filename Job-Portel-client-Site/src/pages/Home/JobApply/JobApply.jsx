import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
const JobApply = () => {
  const { id } = useParams();
  const { user } = useAuth();
  // console.log(id, user);
  const [jobRole, setJobRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const number = form.number.value;
    const linkedin = form.linkedin.value;
    const github = form.github.value;
    const resume = form.resume.value;

    // console.log(name, email, number, linkedin, github, resume, coverLetter);
    const jobApplication = {
      job_id: id,
      application_email: user?.email,
      name,
      email,
      number,
      linkedin,
      github,
      resume,
    };
    fetch('http://localhost:5000/job-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jobApplication),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);

        // Display success alert
        Swal.fire({
          title: 'Application Submitted!',
          text: 'Your job application has been successfully submitted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/myApplication');
      })
      .catch(error => {
        console.error('Error:', error);

        // Display error alert
        Swal.fire({
          title: 'Submission Failed',
          text: 'There was an error submitting your application. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-gray-100 rounded-md shadow-lg my-10">
      <h1 className="text-2xl font-bold text-center mb-6">
        Job Application Form
      </h1>

      {/* Job Role Selector */}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* <div className="mb-4">
          <label htmlFor="jobRole" className="block font-medium mb-2">
            Select Job Role:
          </label>
          <select
            name="jobRole"
            className="w-full p-3 border rounded-md border-sky-600"
          >
            <option value=""> Select a Role </option>
            <option value="Finance Manager">Finance Manager</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="Mobile App Developer">Mobile App Developer</option>
            <option value="Data Scientist">Data Scientist</option>
          </select>
        </div> */}
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium mb-2">
            Full Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="w-full p-3 border rounded-md border-sky-600"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-md border-sky-600"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">
            Phone Number:
          </label>
          <input
            type="number"
            name="number"
            placeholder="Enter your phone number"
            className="w-full p-3 border rounded-md border-sky-600"
            required
          />
        </div>
        {/* LinkedIn */}
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">
            LinkedIn URl
          </label>
          <input
            type="url"
            name="linkedin"
            placeholder="Enter your LinkedIn URl"
            className="w-full p-3 border rounded-md border-sky-600"
            required
          />
        </div>
        {/* Github */}
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">
            Github URl
          </label>
          <input
            type="url"
            name="github"
            placeholder="Enter your Github URl"
            className="w-full p-3 border rounded-md border-sky-600"
            required
          />
        </div>

        {/* Resume Upload */}
        <div className="mb-4">
          <label htmlFor="resume" className="block font-medium mb-2">
            Resume URL
          </label>
          <input
            type="url"
            name="resume"
            placeholder="Enter your resume URl"
            className="w-full p-3 border rounded-md border-sky-600"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApply;
