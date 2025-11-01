import React from "react";
import { useNavigate } from "react-router-dom";

function Home({ onLogin }) {
  const navigate = useNavigate();

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      title: "Energy Auditing",
      description:
        "Comprehensive energy consumption analysis for buildings and facilities",
      color: "emerald",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Equipment Tracking",
      description:
        "Log and monitor all electrical equipment with detailed consumption data",
      color: "blue",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      ),
      title: "Data Visualization",
      description:
        "Interactive charts and graphs for energy consumption patterns",
      color: "purple",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      title: "Professional Reports",
      description: "Generate detailed audit reports in PDF and CSV formats",
      color: "rose",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      title: "Solar PV Design",
      description:
        "Calculate solar photovoltaic system sizing and potential savings",
      color: "amber",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
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
      ),
      title: "Recommendations",
      description:
        "AI-powered energy efficiency recommendations and cost-saving opportunities",
      color: "indigo",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-semibold mb-4">
          NCEEC Energy Audit Application
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to{" "}
          <span className="text-emerald-600 dark:text-emerald-400">
            NCEEC-EAA
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          National Centre for Energy Efficiency & Conservation - Energy Audit
          Application
        </p>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          A comprehensive platform for conducting energy audits, tracking
          equipment consumption, generating professional reports, and
          identifying energy-saving opportunities for Nigerian facilities.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={() => onLogin && navigate("/login")}
            className="btn btn-primary text-lg px-8 py-3"
          >
            <svg
              className="w-5 h-5 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
            Login to Dashboard
          </button>
          <button
            onClick={() => {
              // Scroll to features section
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn btn-secondary text-lg px-8 py-3"
          >
            <svg
              className="w-5 h-5 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Learn More
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12" id="features">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card p-6 hover:shadow-xl transition-shadow"
            >
              <div
                className={`w-16 h-16 rounded-lg bg-${feature.color}-100 dark:bg-${feature.color}-900/30 flex items-center justify-center mb-4 text-${feature.color}-600 dark:text-${feature.color}-400`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            100+
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            Buildings Audited
          </div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            ₦2M+
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            Energy Costs Saved
          </div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            50k+
          </div>
          <div className="text-gray-600 dark:text-gray-300">
            kWh Reduced Monthly
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="card p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Setup Facility
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Enter basic facility information and building details
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Log Equipment
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Add all electrical equipment with power ratings and usage hours
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Analyze Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              View interactive charts and consumption patterns
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              4
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Generate Reports
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Export professional PDF/CSV reports with recommendations
            </p>
          </div>
        </div>
      </div>

      {/* About NCEEC */}
      <div className="card p-8 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-2 border-emerald-200 dark:border-emerald-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          About NCEEC
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          The National Centre for Energy Efficiency & Conservation (NCEEC) is a
          leading institution dedicated to promoting energy efficiency and
          conservation practices across Nigeria. Our mission is to reduce energy
          waste, lower costs, and contribute to environmental sustainability.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          This Energy Audit Application is designed to help organizations,
          businesses, and institutions conduct comprehensive energy audits,
          identify inefficiencies, and implement cost-effective energy-saving
          measures aligned with Nigerian energy standards and best practices.
        </p>
      </div>
    </div>
  );
}

export default Home;
