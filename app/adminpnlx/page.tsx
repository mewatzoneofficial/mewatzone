import Sidebar from "./componants/Sidebar";
import StartCard from "./componants/StartCard";
import ActionLink from "./componants/ActionLink";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Welcome Saukat Ali
          </h1>
          <p className="text-red-500 mt-1 font-medium">
            You are running 1 hour and 40 minutes late today!!
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-600">03:17 pm</p>
          <p className="text-gray-500 text-sm">Clock In at - 11:55 am</p>
          <button className="mt-2 px-5 py-2 bg-red-100 text-red-700 rounded-lg shadow hover:bg-red-200 transition">
            Logout
          </button>
        </div>
      </div>
      <StartCard />
      <ActionLink />
    </div>
  );
};

export default Dashboard;
