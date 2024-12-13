const JobsHeading = () => {
  return (
    <section>
      <div className="space-x-4 my-4">
        <h2 className="text-center text-2xl font-bold text-gray-700 md:text-4xl">
          Jobs of the day
        </h2>
        <p className="text-center text-sm text-gray-600 py-2 ">
          Search and connect with the right candidates faster.
        </p>
      </div>

      <div class="flex flex-wrap max-w-6xl gap-4 mx-auto my-4 md:my-10 px-6 items-center">
        <button class="border border-transparent px-4 py-4 text-gray-700 font-semibold text-lg hover:border-sky-700 hover:text-sky-700 rounded transition duration-300 shadow-custom">
          Marketing & Sale
        </button>
        <button class=" border border-transparent px-4 py-4 text-gray-700 font-semibold text-lg hover:border-sky-700 hover:text-sky-700 rounded transition duration-300 shadow-custom">
          Finance
        </button>
        <button class=" border border-transparent px-4 py-4 text-gray-700 font-semibold text-lg hover:border-sky-700 hover:text-sky-700 rounded transition duration-300 shadow-custom">
          Management
        </button>
        <button class=" border border-transparent px-4 py-4 text-gray-700 font-semibold text-lg hover:border-sky-700 hover:text-sky-700 rounded transition duration-300 shadow-custom">
          Human Resource
        </button>
        <button class=" border border-transparent px-4 py-4 text-gray-700 font-semibold text-lg hover:border-sky-700 hover:text-sky-700 rounded transition duration-300 shadow-custom">
          Retail & Products
        </button>
        <button class=" border border-transparent px-4 py-4 text-gray-700 font-semibold text-lg hover:border-sky-700 hover:text-sky-700 rounded transition duration-300 shadow-custom">
          Content Writer
        </button>
      </div>
    </section>
  );
};

export default JobsHeading;
