import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { formatCurrency } from "./utils/format";

const COLORS = {
  Lighting: "#eab308",
  HVAC: "#f97316",
  "Plug Loads": "#8b5cf6",
  AV: "#06b6d4",
  Kitchen: "#ec4899",
  Other: "#6b7280",
};

export default function Visualization({
  facility,
  equipmentList,
  tariff,
  calcEnergy,
  onGenerateReport,
}) {
  const [activeChart, setActiveChart] = useState("category");
  const total = equipmentList.reduce((s, it) => s + calcEnergy(it).monthly, 0);

  // Category breakdown
  const categoryData = equipmentList.reduce((acc, item) => {
    const category = item.category || "Other";
    const monthly = calcEnergy(item).monthly;
    acc[category] = (acc[category] || 0) + monthly;
    return acc;
  }, {});

  const pieData = Object.entries(categoryData).map(([name, value]) => ({
    name,
    value: Math.round(value),
    percentage: total ? ((value / total) * 100).toFixed(1) : 0,
  }));

  // Top consumers
  const topConsumers = [...equipmentList]
    .sort((a, b) => calcEnergy(b).monthly - calcEnergy(a).monthly)
    .slice(0, 10)
    .map((item) => ({
      name: item.name.substring(0, 20),
      consumption: Math.round(calcEnergy(item).monthly),
      cost: Math.round(calcEnergy(item).cost),
    }));

  // Room breakdown
  const roomData = equipmentList.reduce((acc, item) => {
    const room = item.room || "Unassigned";
    const monthly = calcEnergy(item).monthly;
    acc[room] = (acc[room] || 0) + monthly;
    return acc;
  }, {});

  const roomChartData = Object.entries(roomData).map(([name, value]) => ({
    name: name.substring(0, 15),
    consumption: Math.round(value),
    cost: Math.round(value * tariff),
  }));

  // Monthly projection (for demo purposes - showing current month repeated)
  const monthlyProjection = [
    { month: "Jan", consumption: Math.round(total * 0.95) },
    { month: "Feb", consumption: Math.round(total * 0.92) },
    { month: "Mar", consumption: Math.round(total * 0.98) },
    { month: "Apr", consumption: Math.round(total * 1.05) },
    { month: "May", consumption: Math.round(total * 1.1) },
    { month: "Jun", consumption: Math.round(total * 1.08) },
    { month: "Jul", consumption: Math.round(total * 1.12) },
    { month: "Aug", consumption: Math.round(total * 1.15) },
    { month: "Sep", consumption: Math.round(total * 1.1) },
    { month: "Oct", consumption: Math.round(total * 1.05) },
    { month: "Nov", consumption: Math.round(total) },
    { month: "Dec", consumption: Math.round(total * 0.96) },
  ];

  // Potential savings
  const hvacEquipment = equipmentList.filter((e) => e.category === "HVAC");
  const lightingEquipment = equipmentList.filter(
    (e) => e.category === "Lighting"
  );
  const hvacConsumption = hvacEquipment.reduce(
    (sum, it) => sum + calcEnergy(it).monthly,
    0
  );
  const lightingConsumption = lightingEquipment.reduce(
    (sum, it) => sum + calcEnergy(it).monthly,
    0
  );

  const savingsOpportunities = [
    {
      measure: "LED Retrofit",
      savings: Math.round(lightingConsumption * 0.4),
      cost: Math.round(lightingConsumption * 0.4 * tariff),
      impact: "40% lighting savings",
    },
    {
      measure: "HVAC Optimization",
      savings: Math.round(hvacConsumption * 0.15),
      cost: Math.round(hvacConsumption * 0.15 * tariff),
      impact: "15% HVAC savings",
    },
    {
      measure: "Occupancy Sensors",
      savings: Math.round(total * 0.08),
      cost: Math.round(total * 0.08 * tariff),
      impact: "8% overall savings",
    },
    {
      measure: "Power Factor Correction",
      savings: Math.round(total * 0.05),
      cost: Math.round(total * 0.05 * tariff),
      impact: "5% demand reduction",
    },
  ];

  const charts = [
    { key: "category", label: "By Category" },
    { key: "equipment", label: "Top Equipment" },
    { key: "room", label: "By Room" },
    { key: "trend", label: "Trend Analysis" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="section-title">Analytics & Visualization</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {facility.name} - Energy Analysis
          </p>
        </div>
        <button onClick={onGenerateReport} className="btn btn-primary">
          <svg
            className="w-4 h-4 mr-2 inline"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Generate Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-5">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Consumption
          </div>
          <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
            {Math.round(total)} kWh
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Monthly
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Estimated Cost
          </div>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
            {formatCurrency(Math.round(total * tariff))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Monthly
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Energy Intensity
          </div>
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {facility.area ? Math.round(total / facility.area) : 0}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            kWh/m²
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total Equipment
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            {equipmentList.length}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Items logged
          </div>
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-200 dark:border-white/10">
        {charts.map((chart) => (
          <button
            key={chart.key}
            onClick={() => setActiveChart(chart.key)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeChart === chart.key
                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            {chart.label}
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Category Pie Chart */}
        {activeChart === "category" && (
          <>
            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Energy by Category
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[entry.name] || COLORS.Other}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value} kWh`} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Category Details
              </h3>
              <div className="space-y-3">
                {pieData.map((cat) => (
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
                          backgroundColor: COLORS[cat.name] || COLORS.Other,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Top Equipment Bar Chart */}
        {activeChart === "equipment" && (
          <>
            <div className="card p-6 lg:col-span-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Top Energy Consumers
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topConsumers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "consumption"
                        ? `${value} kWh`
                        : formatCurrency(value),
                      name === "consumption" ? "Energy" : "Cost",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="consumption"
                    fill="#eab308"
                    name="Monthly kWh"
                  />
                  <Bar dataKey="cost" fill="#f97316" name="Monthly Cost (₦)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Room Breakdown */}
        {activeChart === "room" && (
          <>
            <div className="card p-6 lg:col-span-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Energy by Room
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={roomChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "consumption"
                        ? `${value} kWh`
                        : formatCurrency(value),
                      name === "consumption" ? "Energy" : "Cost",
                    ]}
                  />
                  <Legend />
                  <Bar
                    dataKey="consumption"
                    fill="#06b6d4"
                    name="Monthly kWh"
                  />
                  <Bar dataKey="cost" fill="#ec4899" name="Monthly Cost (₦)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Trend Analysis */}
        {activeChart === "trend" && (
          <>
            <div className="card p-6 lg:col-span-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Annual Projection (Based on Current Usage)
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyProjection}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `${value} kWh`} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="consumption"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Monthly kWh"
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> This projection assumes current usage
                  patterns with seasonal variations. Actual consumption may vary
                  based on weather, occupancy, and operational changes.
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Savings Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Energy Saving Opportunities
          </h3>
          <div className="space-y-4">
            {savingsOpportunities.map((opp, idx) => (
              <div
                key={idx}
                className="border border-gray-200 dark:border-white/10 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {opp.measure}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {opp.impact}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                      {opp.savings} kWh
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      {formatCurrency(opp.cost)}/mo
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${((opp.savings / total) * 100).toFixed(0)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg">
            <div className="font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
              Total Potential Savings
            </div>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
              {formatCurrency(
                savingsOpportunities.reduce((sum, opp) => sum + opp.cost, 0)
              )}
              /month
            </div>
            <div className="text-sm text-emerald-600 dark:text-emerald-400">
              {savingsOpportunities.reduce((sum, opp) => sum + opp.savings, 0)}{" "}
              kWh/month
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Quick Recommendations
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-yellow-600 dark:text-yellow-400"
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
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  LED Lighting Upgrade
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Replace all traditional bulbs with LED equivalents. LEDs use
                  75% less energy and last 25x longer.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  HVAC Scheduling
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Implement time-based controls to reduce AC runtime during
                  unoccupied hours. Target: 1-2 hours reduction daily.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-purple-600 dark:text-purple-400"
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
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  Energy Monitoring
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Install sub-meters on major equipment to track real-time
                  consumption and identify anomalies.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900 dark:text-white">
                  Regular Maintenance
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Schedule quarterly maintenance for HVAC systems. Clean filters
                  monthly to maintain efficiency.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
