import React from "react";
import Card from "./Card";
import { formatCurrency } from "../utils/format";

function Dashboard({
  user,
  facility,
  equipmentList,
  tariff,
  onNewAudit,
  onNavigate,
  calcEnergy,
}) {
  const totalMonthly = equipmentList.reduce(
    (sum, it) => sum + calcEnergy(it).monthly,
    0
  );

  const categoryData = equipmentList.reduce((acc, item) => {
    const category = item.category || "Other";
    const monthly = calcEnergy(item).monthly;
    acc[category] = (acc[category] || 0) + monthly;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData).map(
    ([name, value]) => ({
      name,
      value: Math.round(value),
      percentage: totalMonthly ? ((value / totalMonthly) * 100).toFixed(1) : 0,
    })
  );

  const CATEGORY_COLORS = {
    Lighting: "#eab308",
    HVAC: "#f97316",
    "Plug Loads": "#8b5cf6",
    AV: "#06b6d4",
    Kitchen: "#ec4899",
    Other: "#6b7280",
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="section-title">Dashboard</h1>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Hello {user.name}. Summary for <strong>{facility.name}</strong>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Building Type: {facility.buildingType || "Not specified"} •
            Location: {facility.location}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onNewAudit} className="btn btn-secondary">
            New Audit
          </button>
          <button
            onClick={() => onNavigate("log-data")}
            className="btn btn-primary"
          >
            Log Data
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card
          title="Total Monthly Energy"
          value={`${Math.round(totalMonthly)} kWh`}
          tone="amber"
          icon={<span className="text-amber-500">⚡</span>}
        />
        <Card
          title="Estimated Monthly Cost"
          value={formatCurrency(Math.round(totalMonthly * tariff))}
          tone="rose"
          icon={<span className="text-rose-500">₦</span>}
        />
        <Card
          title="Area"
          value={`${facility.area} m²`}
          tone="emerald"
          icon={<span className="text-emerald-500">🏢</span>}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="card p-6 lg:col-span-2">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Consumption by Category
          </h3>
          {categoryChartData.length > 0 ? (
            <div className="space-y-3">
              {categoryChartData.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      {cat.name}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {cat.value} kWh ({cat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{
                        width: `${cat.percentage}%`,
                        backgroundColor:
                          CATEGORY_COLORS[cat.name] || CATEGORY_COLORS.Other,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No equipment data yet. Start by logging your equipment.
            </p>
          )}
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Top Consumers
          </h3>
          {equipmentList.length > 0 ? (
            <ul className="space-y-3">
              {[...equipmentList]
                .sort((a, b) => calcEnergy(b).monthly - calcEnergy(a).monthly)
                .slice(0, 5)
                .map((it) => (
                  <li key={it.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">
                        {it.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {it.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-amber-600 dark:text-amber-400">
                        {Math.round(calcEnergy(it).monthly)} kWh
                      </div>
                      <div className="text-xs text-rose-500">
                        {formatCurrency(Math.round(calcEnergy(it).cost))}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No equipment logged
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onNavigate("visualization")}
          className="card p-5 hover:shadow-xl transition-shadow cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald-600 dark:text-emerald-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                View Analytics
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Detailed visualizations
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("report")}
          className="card p-5 hover:shadow-xl transition-shadow cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-rose-600 dark:text-rose-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                Generate Report
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Download audit report
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("admin")}
          className="card p-5 hover:shadow-xl transition-shadow cursor-pointer text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                Settings
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                User & tariff settings
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("awareness")}
          className="card p-4 hover:shadow-xl transition-all hover:scale-105 text-left border-2 border-transparent hover:border-green-500"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                Awareness & Tips
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Energy saving best practices
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("appliance-testing")}
          className="card p-4 hover:shadow-xl transition-all hover:scale-105 text-left border-2 border-transparent hover:border-blue-500"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                Appliance Standards
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Check compliance & ratings
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate("training")}
          className="card p-4 hover:shadow-xl transition-all hover:scale-105 text-left border-2 border-transparent hover:border-purple-500"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600 dark:text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                Training & Certification
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Build your expertise
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
