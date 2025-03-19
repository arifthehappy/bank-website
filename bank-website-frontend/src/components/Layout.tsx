import React from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Users, Shield, LogOut, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { employee, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Building2 className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  Bank Portal
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <span>{employee?.name}</span>
                  <ChevronDown size={16} />
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 p-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-screen p-4">
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Users className="mr-3 h-5 w-5" />
              Employees
            </a>
            <a
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              <Shield className="mr-3 h-5 w-5" />
              Permissions
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
