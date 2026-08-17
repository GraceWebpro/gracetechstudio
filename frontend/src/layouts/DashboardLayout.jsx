import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="relative flex-1 overflow-y-auto p-10">

          {/* Background Glow */}

          <div
            className="
              pointer-events-none
              absolute
              top-[-250px]
              right-[-200px]
              h-[550px]
              w-[550px]
              rounded-full
              bg-primary/10
              blur-[150px]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-[-250px]
              left-[-150px]
              h-[420px]
              w-[420px]
              rounded-full
              bg-blue-500/5
              blur-[150px]
            "
          />

          <div className="relative z-10">

          <Outlet />
          </div>

        </main>

      </div>

      

    </div>
  );
}