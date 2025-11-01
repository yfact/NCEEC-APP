import React, { useState } from "react";
import { useSettings } from "../context/SettingsContext";

function AdminPanel({ onBack }) {
  const {
    tariff,
    setTariff,
    vatEnabled,
    setVatEnabled,
    vatPercent,
    setVatPercent,
  } = useSettings();
  const [activeTab, setActiveTab] = useState("tariff");
  const [localTariff, setLocalTariff] = useState(tariff);
  const [localVatEnabled, setLocalVatEnabled] = useState(vatEnabled);
  const [localVatPercent, setLocalVatPercent] = useState(vatPercent);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setTariff(localTariff);
    setVatEnabled(localVatEnabled);
    setVatPercent(localVatPercent);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { key: "tariff", label: "Electricity Tariff", icon: "⚡" },
    { key: "users", label: "User Management", icon: "👥" },
    { key: "settings", label: "General Settings", icon: "⚙️" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Manage system settings and configurations
            </p>
          </div>
          <button onClick={onBack} className="btn btn-secondary">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === tab.key
                ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tariff Settings */}
      {activeTab === "tariff" && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Electricity Tariff Configuration
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Electricity Tariff (₦/kWh)
              </label>
              <input
                type="number"
                step="0.01"
                value={localTariff}
                onChange={(e) => setLocalTariff(Number(e.target.value))}
                className="input"
                placeholder="95.00"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Current Nigerian average: ₦95-200/kWh (varies by distribution
                company and customer class)
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Enable VAT
              </label>
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localVatEnabled}
                    onChange={(e) => setLocalVatEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 dark:peer-focus:ring-emerald-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    {localVatEnabled ? "Enabled" : "Disabled"}
                  </span>
                </label>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Include VAT in cost calculations
              </p>
            </div>

            {localVatEnabled && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  VAT Percentage (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={localVatPercent}
                  onChange={(e) => setLocalVatPercent(Number(e.target.value))}
                  className="input"
                  placeholder="7.5"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Standard Nigerian VAT: 7.5%
                </p>
              </div>
            )}
          </div>

          {/* Distribution Companies Reference */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
              Nigerian Electricity Distribution Companies (DISCOs) - Typical
              Tariffs
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  AEDC (Abuja):
                </span>
                <span className="font-medium text-blue-800 dark:text-blue-300">
                  ₦95-120/kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  EKEDC (Lagos):
                </span>
                <span className="font-medium text-blue-800 dark:text-blue-300">
                  ₦100-150/kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  IKEDC (Lagos):
                </span>
                <span className="font-medium text-blue-800 dark:text-blue-300">
                  ₦95-145/kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  PHED (Port Harcourt):
                </span>
                <span className="font-medium text-blue-800 dark:text-blue-300">
                  ₦90-130/kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  EEDC (Enugu):
                </span>
                <span className="font-medium text-blue-800 dark:text-blue-300">
                  ₦85-125/kWh
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 dark:text-gray-300">
                  IBEDC (Ibadan):
                </span>
                <span className="font-medium text-blue-800 dark:text-blue-300">
                  ₦90-135/kWh
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
              <strong>Note:</strong> Tariffs vary by customer class (R1, R2, C1,
              C2, etc.) and may include fixed charges. Check with your local
              DISCO for exact rates.
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={handleSave} className="btn btn-primary">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Settings
            </button>
            {saved && (
              <div className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Settings saved successfully!
              </div>
            )}
          </div>
        </div>
      )}

      {/* User Management */}
      {activeTab === "users" && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            User Management
          </h3>

          <div className="mb-6">
            <button className="btn btn-primary">
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New User
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                  <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Name
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Email
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Role
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Status
                  </th>
                  <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="p-3">Demo User</td>
                  <td className="p-3 text-sm text-gray-600 dark:text-gray-300">
                    demo@nceec.com
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
                      Auditor
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                      Active
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:underline text-sm">
                      Deactivate
                    </button>
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="p-3">Admin User</td>
                  <td className="p-3 text-sm text-gray-600 dark:text-gray-300">
                    admin@nceec.com
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200">
                      Administrator
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                      Active
                    </span>
                  </td>
                  <td className="p-3">
                    <button className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm mr-3">
                      Edit
                    </button>
                    <button className="text-red-600 dark:text-red-400 hover:underline text-sm">
                      Deactivate
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>User Roles:</strong>
              <br />• <strong>Administrator:</strong> Full system access, can
              manage users and settings
              <br />• <strong>Auditor:</strong> Can create and edit audits,
              generate reports
              <br />• <strong>Viewer:</strong> Read-only access to existing
              audits and reports
            </p>
          </div>
        </div>
      )}

      {/* General Settings */}
      {activeTab === "settings" && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            General Settings
          </h3>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                defaultValue="National Centre for Energy Efficiency & Conservation"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Currency
              </label>
              <select className="input">
                <option value="NGN">Nigerian Naira (₦)</option>
                <option value="USD">US Dollar ($)</option>
                <option value="EUR">Euro (€)</option>
                <option value="GBP">British Pound (£)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Format
              </label>
              <select className="input">
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Theme
              </label>
              <select className="input">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">System Default</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Auto-save Frequency
              </label>
              <select className="input">
                <option value="30">Every 30 seconds</option>
                <option value="60">Every minute</option>
                <option value="300">Every 5 minutes</option>
                <option value="0">Disabled</option>
              </select>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="enableNotifications"
                defaultChecked
                className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="enableNotifications"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enable email notifications for audit completions
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="enableBackup"
                defaultChecked
                className="w-4 h-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 dark:focus:ring-emerald-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="enableBackup"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enable automatic data backup (daily)
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button className="btn btn-primary">
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save General Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
