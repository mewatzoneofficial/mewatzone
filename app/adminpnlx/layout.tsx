import type { Metadata } from "next";
import Sidebar from "./componants/Sidebar";
export const metadata: Metadata = {
  title: "My App Admin",
  description: "Admin",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
      <footer className="mt-auto text-center text-gray-500 text-sm p-4 bg-gray">
        <p>
          FPS JOB &copy; 2015-25 | Crafted with{" "}
          <i className="fas fa-heart text-red-500 mx-1"></i> by{" "}
          <a
            href="#"
            className="text-primary hover:text-primary-dark font-medium transition duration-150"
          >
            Team Tallento.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
