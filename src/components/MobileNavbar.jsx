import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Plus, History } from "lucide-react";

export default function MobileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/create", icon: Plus, label: "Create" },
    { path: "/history", icon: History, label: "History" },
  ];

  return (
  <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-slate-900 rounded-full shadow-xl px-4 py-2 flex justify-around items-center gap-2 w-fit min-w-[250px] md:w-[300px] lg:w-[360px] max-w-[90%]">

      {navItems.map(({ path, icon: Icon }) => {
        const isActive = location.pathname === path;

        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center justify-center px-4 py-3 rounded-full transition-all duration-200 ${
              isActive
                ? "bg-indigo-500 text-white shadow-md scale-105"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            <Icon className="w-5 h-5" />
          </button>
        );
      })}
    </nav>
  );
}
