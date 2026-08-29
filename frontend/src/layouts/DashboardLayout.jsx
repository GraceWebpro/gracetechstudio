import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-background">
      {/* Sidebar */}

      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />

      {/* Main area */}

      <div
        className={`
          min-h-screen
          transition-[padding-left]
          duration-300

          ${
            sidebarCollapsed
              ? "lg:pl-[76px]"
              : "lg:pl-[260px]"
          }
        `}
      >
        <Topbar />

        <main
          className="
            relative
            min-h-[calc(100vh-72px)]
            overflow-x-hidden
            overflow-y-auto
            p-5
            sm:p-7
            lg:p-10
          "
        >
          {/* Background glow */}

          <div
            className="
              pointer-events-none
              absolute
              right-[-200px]
              top-[-250px]
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

          <div className="relative z-10 w-full max-w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}