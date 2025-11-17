import React from "react";
// For a production Next.js application, ensure Font Awesome CSS is imported globally (e.g., in _app.js or layout.js)

const ActivityLog = () => {
  return (
    <div className="bg-background min-h-screen p-8 font-sans antialiased">
      <div className="container mx-auto max-w-7xl">
        <h3 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight flex items-center">
          <i className="fas fa-history mr-4 text-primary"></i>
          User Activity Log
        </h3>

        {/* --- Filter Form Component --- */}
        <div className="bg-card p-6 rounded-2xl shadow-xl-heavy mb-8 border border-gray-100">
          <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="lg:col-span-1">
              <label
                htmlFor="activityStatus"
                className="block text-xs font-semibold uppercase text-gray-500 mb-2"
              >
                Activity Status
              </label>
              <select
                className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 px-4 text-sm focus:ring-primary focus:border-primary transition duration-150 shadow-sm"
                id="activityStatus"
                defaultValue="Email Login" // Use defaultValue in React for selected option
              >
                <option>Email Login</option>
                <option>Other Activity</option>
                <option>Password Change</option>
              </select>
            </div>

            <div className="lg:col-span-1">
              <label
                htmlFor="postFrom"
                className="block text-xs font-semibold uppercase text-gray-500 mb-2"
              >
                Post From
              </label>
              <input
                type="date"
                className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 px-4 text-sm focus:ring-primary focus:border-primary transition duration-150 shadow-sm"
                id="postFrom"
                defaultValue="2025-11-17"
              />
            </div>

            <div className="lg:col-span-1">
              <label
                htmlFor="postTo"
                className="block text-xs font-semibold uppercase text-gray-500 mb-2"
              >
                Post To
              </label>
              <input
                type="date"
                className="w-full border border-gray-200 bg-gray-50 rounded-lg py-2.5 px-4 text-sm focus:ring-primary focus:border-primary transition duration-150 shadow-sm"
                id="postTo"
                defaultValue="2025-11-17"
              />
            </div>

            <div className="hidden lg:block lg:col-span-1"></div>

            <div className="col-span-full flex space-x-4">
              <button
                type="submit"
                className="w-full sm:w-1/2 bg-gray hover:bg-primary-dark text-gray font-semibold py-2.5 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.01]"
              >
                <i className="fas fa-search mr-2"></i> Filter Results
              </button>
              <button
                type="reset"
                className="w-full sm:w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg shadow-md transition duration-200 transform hover:scale-[1.01]"
              >
                <i className="fas fa-undo mr-2"></i> Reset Filters
              </button>
            </div>
          </form>
        </div>

        {/* --- Activity Table Component --- */}
        <div className="bg-card p-6 rounded-2xl shadow-xl-heavy overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">Show</span>
              <select className="border border-gray-200 rounded-lg p-2 text-sm focus:ring-primary focus:border-primary shadow-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span className="ml-2">entries</span>
            </div>
            <div className="w-full md:w-64 relative">
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:ring-primary focus:border-primary shadow-sm"
                placeholder="Search by name, email..."
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-lg">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Mobile
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tr-lg">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {/* Sample Row 1 (ideally mapped from state/props) */}
                <tr className="hover:bg-indigo-50/50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    001
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    Simran
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    XXXXXX@gmail.com
                    <a
                      href="#"
                      className="text-xs font-medium text-primary hover:text-primary-dark bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    88472*****
                    <a
                      href="#"
                      className="text-xs font-medium text-primary hover:text-primary-dark bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary/10 text-secondary">
                      Email Login
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Nov 17, 2025
                  </td>
                </tr>
                {/* Sample Row 2 */}
                <tr className="hover:bg-indigo-50/50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    002
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    Jatin Kumar
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    XXXXXX@gmail.com
                    <a
                      href="#"
                      className="text-xs font-medium text-primary hover:text-primary-dark bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary/10 text-secondary">
                      Email Login
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Nov 17, 2025
                  </td>
                </tr>
                {/* Sample Row 3 */}
                <tr className="hover:bg-indigo-50/50 transition duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    003
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    Avinash Kumar
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    XXXXXX@gmail.com
                    <a
                      href="#"
                      className="text-xs font-medium text-primary hover:text-primary-dark bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    70043*****
                    <a
                      href="#"
                      className="text-xs font-medium text-primary hover:text-primary-dark bg-indigo-50 px-2 py-0.5 rounded-full inline-block mt-1"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary/10 text-secondary">
                      Email Login
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Nov 17, 2025
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* --- Pagination --- */}
          <div className="flex justify-between items-center pt-5 border-t border-gray-100 mt-6">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold">1</span> to
              <span className="font-semibold">3</span> of
              <span className="font-semibold">3</span> entries
            </p>
            <nav
              className="relative z-0 inline-flex rounded-lg shadow-sm"
              aria-label="Pagination"
            >
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150"
              >
                Previous
              </a>
              <a
                href="#"
                aria-current="page"
                className="z-10 bg-primary border-primary text-white relative inline-flex items-center px-4 py-2 text-sm font-semibold border transition duration-150"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150"
              >
                Next
              </a>
            </nav>
          </div>
        </div>

        {/* --- Footer (optional, often moved to Layout Component) --- */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            FPS JOB &copy; 2015-25 | Crafted with
            <i className="fas fa-heart text-red-500 mx-1"></i> by
            <a
              href="#"
              className="text-primary hover:text-primary-dark font-medium transition duration-150"
            >
              Team Tallento.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default ActivityLog;
