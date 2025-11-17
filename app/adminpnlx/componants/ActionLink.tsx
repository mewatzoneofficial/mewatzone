import React from "react";

const ActionLink = () => {
  return (
    <div className="bg-white rounded-xl p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Add User", color: "border-red-500" },
          { label: "Add Employer", color: "border-gray-500" },
          { label: "Add Job", color: "border-green-500" },
          { label: "Not Picked Calls", color: "border-green-500" },
          { label: "My Today Scheduled Data", color: "border-yellow-500" },
          { label: "User Logs (662)", color: "border-purple-500" },
        ].map((btn) => (
          <div
            key={btn.label}
            className={`p-5 border-l-4 ${btn.color} bg-white rounded-xl shadow-md cursor-pointer hover:shadow-lg hover:bg-gray-50 transition`}
          >
            {btn.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionLink;
