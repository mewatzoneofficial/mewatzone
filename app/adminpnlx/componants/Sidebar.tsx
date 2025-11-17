"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "adminpnlx" },
    { name: "Product", path: "products" },
    { name: "Users", path: "/users" },
    { name: "Jobs", path: "/jobs" },
    { name: "Employers", path: "/employers" },
    { name: "Reports", path: "/reports" },
    { name: "Roles & Permission", path: "/roles-permission" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-gray-700 to-gray-600 text-white flex flex-col shadow-lg">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Tallento.ai
      </div>

      <nav className="flex-1 overflow-y-auto mt-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`block p-4 rounded-md transition-colors duration-200 ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
