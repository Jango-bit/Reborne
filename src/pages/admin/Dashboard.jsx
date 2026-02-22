import React, { useState } from "react";
import {
  User,
  Lock,
  LayoutDashboard,
  TrendingUp,
  AlertTriangle,
  Package,
  GitBranch,
  Menu,
  X,
} from "lucide-react";

export const Dashboard = () => {
  const [activeLink, setActiveLink] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarLink = ({ name, icon: Icon, linkKey }) => (
    <button
      onClick={() => {
        setActiveLink(linkKey);
        setSidebarOpen(false); // auto-close on mobile
      }}
      className={`flex items-center gap-2 px-4 py-3 rounded-lg w-full text-left
        ${
          activeLink === linkKey
            ? "bg-red-600 text-white"
            : "text-gray-700 hover:bg-gray-100"
        }`}
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{name}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ===== MOBILE TOP BAR ===== */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white border-b sticky top-0 z-40">
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
        <span className="font-semibold">Admin</span>
      </div>

      <div className="flex max-w-7xl mx-auto">
        {/* ===== SIDEBAR ===== */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          {/* Mobile close */}
          <div className="lg:hidden flex justify-end p-4">
            <button onClick={() => setSidebarOpen(false)}>
              <X size={22} />
            </button>
          </div>

          <div className="p-4 font-bold text-red-600 hidden lg:block">
            Admin Menu
          </div>

          <nav className="flex flex-col gap-2 px-3">
            <SidebarLink
              name="Dashboard"
              icon={LayoutDashboard}
              linkKey="dashboard"
            />
            <SidebarLink name="Products" icon={Package} linkKey="products" />
            <SidebarLink name="Category" icon={GitBranch} linkKey="category" />
            <SidebarLink name="Users" icon={User} linkKey="users" />
            <SidebarLink
              name="Alerts"
              icon={AlertTriangle}
              linkKey="alerts"
            />
          </nav>
        </aside>

        {/* ===== BACKDROP (mobile) ===== */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          />
        )}

        {/* ===== CONTENT ===== */}
        <main className="flex-1 min-w-0 p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-red-700 flex items-center gap-2 mb-6">
            <Lock size={26} />
            Admin Panel
            <span className="text-sm text-gray-500 hidden sm:inline">
              / {activeLink}
            </span>
          </h1>

          {activeLink === "dashboard" ? (
            <>
              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <DashboardCard title="Users" value="4,521" icon={<User />} />
                <DashboardCard
                  title="Revenue"
                  value="₹1.2M"
                  icon={<TrendingUp />}
                />
                <DashboardCard
                  title="Pending Orders"
                  value="12"
                  icon={<Package />}
                />
                <DashboardCard
                  title="Low Stock"
                  value="89"
                  icon={<AlertTriangle />}
                />
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-5 rounded-xl shadow">
                  <h2 className="font-semibold mb-4 flex items-center gap-2">
                    Sales Overview <TrendingUp size={18} />
                  </h2>
                  <StaticSalesChart />
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <h2 className="font-semibold mb-4">Recent Activity</h2>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li>✔ Order #3918 placed</li>
                    <li>⚠ Low stock alert</li>
                    <li>👤 New user registered</li>
                    <li>📦 Order shipped</li>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <Placeholder title={activeLink} />
          )}
        </main>
      </div>
    </div>
  );
};

/* ===== Components ===== */

const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
    <div className="flex justify-between items-center">
      <p className="text-sm text-gray-500">{title}</p>
      {icon}
    </div>
    <p className="text-3xl font-bold mt-2">{value}</p>
  </div>
);

const StaticSalesChart = () => (
  <div className="h-56 flex items-end gap-2 border-b border-l p-2">
    {[40, 65, 80, 50, 95, 70].map((v, i) => (
      <div
        key={i}
        className="flex-1 bg-red-400 rounded-t"
        style={{ height: `${v}%` }}
      />
    ))}
  </div>
);

const Placeholder = ({ title }) => (
  <div className="bg-white p-8 rounded-xl shadow text-center">
    <h2 className="text-xl font-bold capitalize">{title} Module</h2>
    <p className="text-gray-500 mt-2">This section is under construction.</p>
  </div>
);