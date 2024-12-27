import React, { useState } from 'react';

const JobsHeading = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const jobData = {
    'Marketing & Sale':
      'Data for Marketing & Sale: Plan campaigns, reach out to clients, and boost sales.',
    Finance:
      'Data for Finance: Manage budgets, analyze investments, and ensure financial stability.',
    Management:
      'Data for Management: Lead teams, coordinate projects, and achieve organizational goals.',
    'Human Resource':
      'Data for Human Resource: Handle recruitment, employee relations, and HR policies.',
    'Retail & Products':
      'Data for Retail & Products: Manage inventories, oversee sales, and ensure customer satisfaction.',
    'Content Writer':
      'Data for Content Writer: Create engaging content, proofread, and manage blogs or articles.',
  };

  return (
    <section className="py-6">
      {/* Heading Section */}
      <div className="space-y-2 text-center my-4">
        <h2 className="text-2xl font-bold text-gray-700 md:text-4xl">
          Jobs of the Day
        </h2>
        <p className="text-sm text-gray-600 py-2">
          Search and connect with the right candidates faster.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-wrap gap-4 max-w-6xl mx-auto px-6 items-center justify-center text-center">
        {Object.keys(jobData).map((job, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(job)}
            className="border border-transparent px-6 py-3 text-gray-700 font-semibold text-lg hover:border-sky-700 hover:text-sky-700 rounded-lg transition duration-300 shadow-custom"
          >
            {job}
          </button>
        ))}
      </div>

      {/* Display Selected Data */}
      {selectedCategory && (
        <div className="max-w-4xl mx-auto my-6 p-4 border rounded-lg shadow bg-gray-50">
          <h3 className="text-xl font-bold text-gray-700">
            {selectedCategory}
          </h3>
          <p className="text-gray-600 mt-2">{jobData[selectedCategory]}</p>
        </div>
      )}
    </section>
  );
};

export default JobsHeading;
