import React from "react";
import Card from "./Card";
import { formatCurrency } from "../utils/format";

function Dashboard({ user, facility, equipmentList, tariff, onNewAudit, onNavigate, calcEnergy }) {
  const totalMonthly = equipmentList.reduce((sum, it) => sum + calcEnergy(it).monthly, 0);

  const categoryData = equipmentList.reduce((acc, item) => {
    const category = item.category || "Other";
    const monthly = calcEnergy(item).monthly;
    acc[category] = (acc[category] || 0) + monthly;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value: Math.round(value),
    percentage: totalMonthly ? ((value / totalMonthly) * 100).toFixed(1) : 0,
  }));

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
            Building Type: {facility.buildingType || "Not specified"} • Location: {facility.location}
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onNewAudit} className="btn btn-secondary">New Audit</button>
          <button onClick={() => onNavigate("log-data")} className="btn btn-primary">Log Data</button>
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
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Consumption by Category</h3>
          {categoryChartData.length > 0 ? (
            <div className="space-y-3">
              {categoryChartData.map((cat) => (
                <div key={cat.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700 dark:text-gray-200">{cat.name}</span>
                    <span className="text-gray-600 dark:text-gray-300">{cat.value} kWh ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all"
                      style={{ width: `${cat.percentage}%`, backgroundColor: CATEGORY_COLORS[cat.name] || CATEGORY_COLORS.Other }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No equipment data yet. Start by logging your equipment.</p>
          )}
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Top Consumers</h3>
          {equipmentList.length > 0 ? (
            <ul className="space-y-3">
              {[...equipmentList]
                .sort((a, b) => calcEnergy(b).monthly - calcEnergy(a).monthly)
                .slice(0, 5)
                .map((it) => (
                  <li key={it.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-white">{it.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{it.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-amber-600 dark:text-amber-400">{Math.round(calcEnergy(it).monthly)} kWh</div>
                      <div className="text-xs text-rose-500">{formatCurrency(Math.round(calcEnergy(it).cost))}</div>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">No equipment logged</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={() => onNavigate("visualization")} className="card p-5 hover:shadow-xl transition-shadow cursor-pointer text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">View Analytics</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Detailed visualizations</div>
            </div>
          </div>
        </button>

        <button onClick={() => onNavigate("report")} className="card p-5 hover:shadow-xl transition-shadow cursor-pointer text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Generate Report</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Download audit report</div>
            </div>
          </div>
        </button>

        <button onClick={() => onNavigate("admin")} className="card p-5 hover:shadow-xl transition-shadow cursor-pointer text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Settings</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">User & tariff settings</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Dashboard;

