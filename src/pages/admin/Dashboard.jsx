import React, { useState, useEffect } from "react";
import {
  LogIn,
  User,
  Lock,
  LayoutDashboard,
  Search,
  TrendingUp,
  AlertTriangle,
  Package,
  GitBranch,
} from "lucide-react";

export const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("dashboard");

  const SidebarLink = ({ name, icon: Icon, linkKey }) => (
    <button
      onClick={() => setActiveLink(linkKey)}
      className={`flex items-center w-full px-4 py-3 rounded-xl transition duration-200 text-left
                ${
                  activeLink === linkKey
                    ? "bg-red-600 text-white shadow-md hover:bg-red-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
    >
      <Icon size={20} className="mr-3" />
      <span className="font-medium">{name}</span>
    </button>
  );

  return (
    <>
      <h2 className="text-3xl font-bold text-gray-900">
        Admin <span className="text-green-600">Dashboard</span>
      </h2>
      <p className="text-gray-600 mt-1">
        Welcome back! Here's your store overview.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-gray-700 font-medium">Total Products</h3>
          <p className="text-3xl font-bold mt-2">128</p>
          <p className="text-green-600 text-sm mt-1">+12 this month</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-gray-700 font-medium">Orders</h3>
          <p className="text-3xl font-bold mt-2">542</p>
          <p className="text-green-600 text-sm mt-1">+34 this week</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md border">
          <h3 className="text-gray-700 font-medium">Revenue</h3>
          <p className="text-3xl font-bold mt-2">₹98,430</p>
          <p className="text-green-600 text-sm mt-1">+8.4% growth</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-8 rounded-2xl shadow-md border mt-10">
        <h3 className="text-xl font-semibold text-gray-900">
          Recent <span className="text-green-600">Activity</span>
        </h3>

        <div className="mt-5 space-y-3 text-gray-700">
          <p>• New product “Street Hoodie” added.</p>
          <p>• 3 new user signups today.</p>
          <p>• Order #3241 has been shipped.</p>
        </div>
      </div>
    </>
  );
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 lg:bg-red-50 p-0">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* Left Sidebar (Navigation) - Fixed width, sticky on desktop */}
        {/* Mobile: Full width at top, Desktop: fixed 64 wide */}
        <div className="lg:w-64 bg-white lg:bg-red-50 border-b lg:border-r border-red-200 lg:sticky lg:top-16 p-4 lg:p-6 space-y-2 shadow-lg lg:shadow-none">
          <h2 className="text-lg font-semibold text-red-700 uppercase tracking-wider mb-4 border-b border-red-300 pb-2 hidden lg:block">
            Admin Menu
          </h2>

          <div className="flex lg:flex-col space-x-2 overflow-x-auto lg:space-x-0 lg:space-y-2">
            <SidebarLink
              name="Dashboard"
              icon={LayoutDashboard}
              linkKey="dashboard"
            />
            <SidebarLink name="Products" icon={Package} linkKey="products" />
            <SidebarLink name="Category" icon={GitBranch} linkKey="category" />
            <SidebarLink name="Users" icon={User} linkKey="users" />
            <SidebarLink name="Likes" icon={AlertTriangle} linkKey="likes" />
          </div>

          {/* Placeholder for responsive spacing on mobile */}
          <div className="lg:hidden h-2"></div>
        </div>

        {/* Main Content Area (Dashboard View) - Takes remaining width */}
        <div className="flex-1 p-4 sm:p-8 bg-white lg:bg-red-50">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-red-700 mb-8 flex items-center">
            <Lock size={30} className="mr-3 text-red-600" />
            Admin Control Panel
            {/* Show Active Link Name */}
            <span className="text-xl font-normal text-gray-500 ml-4 hidden sm:inline-block">
              / {activeLink.charAt(0).toUpperCase() + activeLink.slice(1)}
            </span>
          </h1>

          {/* --- DASHBOARD VIEW --- */}
          {activeLink === "dashboard" && (
            <>
              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <DashboardCard
                  title="Total Users"
                  color="red"
                  icon={<User size={24} className="text-red-600" />}
                  value="4,521"
                  description="Total registered customer accounts."
                />
                <DashboardCard
                  title="Revenue YTD"
                  color="red"
                  icon={
                    <span role="img" aria-label="money" className="text-2xl">
                      💰
                    </span>
                  }
                  value="$1.2M"
                  description="Total sales revenue this year."
                />
                <DashboardCard
                  title="Pending Orders"
                  color="red"
                  icon={<Package size={24} className="text-red-600" />}
                  value="12"
                  unit="Orders"
                  description="Orders awaiting fulfillment."
                />
                <DashboardCard
                  title="Low Stock Items"
                  color="red"
                  icon={<AlertTriangle size={24} className="text-red-600" />}
                  value="89"
                  unit="SKUs"
                  description="Products below reorder threshold."
                />
              </div>

              {/* Main Content Area: Performance & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 1. Static Performance/Chart Area (2/3 width) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-red-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    Sales Performance Overview
                    <TrendingUp size={20} className="ml-2 text-green-500" />
                  </h2>
                  <StaticSalesChart />

                  <div className="mt-4 flex justify-between text-sm text-gray-600">
                    <p>
                      Weekly Sales:{" "}
                      <span className="font-bold text-green-600">+8.2%</span>
                    </p>
                    <p>Conversion Rate: 2.1%</p>
                  </div>
                </div>

                {/* 2. Recent Activity Feed (1/3 width) */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border border-red-200">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    Recent Activity{" "}
                    <span className="ml-2 text-red-500">
                      <LayoutDashboard size={18} />
                    </span>
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        time: "5m ago",
                        desc: "Order #3918 placed by J.Doe",
                        color: "bg-green-100 text-green-800",
                      },
                      {
                        time: "1h ago",
                        desc: 'Product "Denim Jeans" low stock alert',
                        color: "bg-yellow-100 text-yellow-800",
                      },
                      {
                        time: "3h ago",
                        desc: "Admin L. Smith updated pricing model",
                        color: "bg-blue-100 text-blue-800",
                      },
                      {
                        time: "1d ago",
                        desc: "New user registration: 54 accounts",
                        color: "bg-green-100 text-green-800",
                      },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <span
                          className={`flex-shrink-0 w-2 h-2 mt-1 rounded-full ${activity.color
                            .split(" ")[0]
                            .replace("-100", "-500")}`}
                        ></span>
                        <div>
                          <p className="text-sm text-gray-800">
                            {activity.desc}
                          </p>
                          <p className="text-xs text-gray-400">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* --- PLACEHOLDER VIEWS FOR OTHER LINKS --- */}
          {activeLink !== "dashboard" && (
            <div className="p-10 bg-white rounded-xl shadow-lg border-2 border-dashed border-red-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {activeLink.charAt(0).toUpperCase() + activeLink.slice(1)}{" "}
                Management
              </h2>
              <p className="text-gray-600">
                This area is currently under construction. Future implementation
                will allow you to manage {activeLink} data, including creation,
                editing, and deletion.
              </p>
              <div className="mt-6">
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition">
                  Add New{" "}
                  {activeLink.charAt(0).toUpperCase() +
                    activeLink.slice(1).replace(/s$/, "")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
const DashboardCard = ({
  title,
  icon,
  color,
  description,
  value,
  unit,
  children,
}) => (
  <div
    className={`p-5 rounded-xl shadow-lg border-l-4 ${
      color === "red" ? "border-red-600" : "border-gray-800"
    } bg-white hover:shadow-xl transition duration-300`}
  >
    <div className="flex items-center justify-between">
      <p
        className={`text-sm font-medium ${
          color === "red" ? "text-red-600" : "text-gray-800"
        }`}
      >
        {title}
      </p>
      {icon}
    </div>
    <div className="mt-1 flex items-end justify-between">
      {value && (
        <div className="text-3xl font-bold text-gray-900 leading-none">
          {value}
          {unit && (
            <span className="text-base font-semibold text-gray-500 ml-1">
              {unit}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
    <p className="mt-3 text-xs text-gray-500">{description}</p>
  </div>
);
const StaticSalesChart = () => (
  <div className="h-64 p-4 bg-white rounded-lg shadow-inner flex flex-col justify-end border">
    <div className="text-gray-400 text-xs mb-2">
      Sales in last 6 months (Thousands USD)
    </div>
    <div className="flex items-end h-48 space-x-2 border-l border-b border-gray-300 pr-2 pb-1">
      {/* Data: [Jan: 40, Feb: 65, Mar: 80, Apr: 50, May: 95, Jun: 70] scaled to height */}
      {[40, 65, 80, 50, 95, 70].map((height, index) => (
        <div
          key={index}
          className="flex-1 rounded-t-md hover:bg-red-500 transition duration-300 cursor-pointer"
          style={{
            height: `${height}%`,
            backgroundColor: "#f87171",
          }} /* Tailwind red-400 */
          title={`Month ${index + 1}: $${height}k`}
        ></div>
      ))}
    </div>
    <div className="flex justify-between text-xs text-gray-500 mt-1 pl-4">
      <span>Jan</span>
      <span>Feb</span>
      <span>Mar</span>
      <span>Apr</span>
      <span>May</span>
      <span>Jun</span>
    </div>
  </div>
);
