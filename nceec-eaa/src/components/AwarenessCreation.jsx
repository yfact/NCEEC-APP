import React, { useState } from "react";
import {
  Lightbulb,
  Leaf,
  TrendingDown,
  Award,
  BookOpen,
  Zap,
} from "lucide-react";

export default function AwarenessCreation({ equipmentList, calcEnergy }) {
  const [selectedTip, setSelectedTip] = useState(null);

  // Energy saving tips database
  const energyTips = [
    {
      id: 1,
      category: "Lighting",
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Switch to LED Lighting",
      description:
        "LED bulbs use up to 75% less energy than incandescent bulbs and last 25 times longer.",
      savings: "Up to ₦50,000/year for a typical facility",
      impact: "Reduces CO₂ emissions by 500kg/year",
      difficulty: "Easy",
      tips: [
        "Replace all incandescent bulbs with LED alternatives",
        "Use natural daylight whenever possible",
        "Install motion sensors in less-used areas",
        "Regular cleaning of light fixtures improves efficiency",
      ],
    },
    {
      id: 2,
      category: "HVAC",
      icon: <Zap className="w-6 h-6" />,
      title: "Optimize Air Conditioning",
      description:
        "HVAC systems typically account for 40-60% of energy consumption in buildings.",
      savings: "Up to ₦200,000/year",
      impact: "Reduces CO₂ emissions by 2000kg/year",
      difficulty: "Medium",
      tips: [
        "Set thermostats to 24-26°C for optimal comfort and efficiency",
        "Regular maintenance and filter cleaning every month",
        "Use programmable thermostats to reduce usage during off-hours",
        "Ensure proper insulation to prevent cool air loss",
        "Consider inverter AC units for variable cooling needs",
      ],
    },
    {
      id: 3,
      category: "Equipment",
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Energy-Efficient Equipment",
      description:
        "Modern equipment can reduce energy consumption by 20-50% compared to older models.",
      savings: "Up to ₦150,000/year",
      impact: "Reduces CO₂ emissions by 1500kg/year",
      difficulty: "Medium",
      tips: [
        "Look for Energy Star or similar certifications",
        "Turn off equipment when not in use - don't leave on standby",
        "Unplug chargers and devices when fully charged",
        "Use power strips to easily disconnect multiple devices",
        "Schedule equipment replacement plans for old inefficient units",
      ],
    },
    {
      id: 4,
      category: "Behavioral",
      icon: <Award className="w-6 h-6" />,
      title: "Staff Awareness & Training",
      description:
        "Behavioral changes can reduce energy consumption by 10-20% without any capital investment.",
      savings: "Up to ₦100,000/year",
      impact: "Reduces CO₂ emissions by 1000kg/year",
      difficulty: "Easy",
      tips: [
        "Conduct monthly energy awareness campaigns",
        "Create energy champions in each department",
        "Display real-time energy consumption on dashboards",
        "Reward teams that achieve energy reduction targets",
        "Include energy efficiency in staff orientation",
      ],
    },
    {
      id: 5,
      category: "Building",
      icon: <Leaf className="w-6 h-6" />,
      title: "Building Envelope Optimization",
      description:
        "Proper insulation and sealing can reduce cooling/heating needs by 30-40%.",
      savings: "Up to ₦180,000/year",
      impact: "Reduces CO₂ emissions by 1800kg/year",
      difficulty: "Hard",
      tips: [
        "Seal all air leaks around doors and windows",
        "Use reflective window films to reduce heat gain",
        "Install weather stripping on doors",
        "Plant shade trees around building perimeter",
        "Use light-colored roofing materials to reflect heat",
      ],
    },
    {
      id: 6,
      category: "Renewable",
      icon: <Leaf className="w-6 h-6" />,
      title: "Consider Renewable Energy",
      description:
        "Solar panels can offset 50-100% of electricity costs in Nigeria's sunny climate.",
      savings: "Up to ₦500,000/year (after ROI period)",
      impact: "Reduces CO₂ emissions by 5000kg/year",
      difficulty: "Hard",
      tips: [
        "Conduct solar feasibility study for your facility",
        "Start small with solar water heating",
        "Explore government incentives and tax benefits",
        "Consider battery storage for load shifting",
        "Hybrid systems combine grid and solar power",
      ],
    },
  ];

  // Calculate total potential savings
  const totalMonthlyCost = equipmentList.reduce((sum, item) => {
    const energy = calcEnergy(item);
    return sum + energy.cost;
  }, 0);

  const potentialSavings = {
    conservative: totalMonthlyCost * 0.15, // 15% savings
    moderate: totalMonthlyCost * 0.25, // 25% savings
    aggressive: totalMonthlyCost * 0.35, // 35% savings
  };

  // Calculate environmental impact
  const monthlyKwh = equipmentList.reduce((sum, item) => {
    return sum + item.powerKw * item.qty * item.hoursPerDay * 30;
  }, 0);

  const co2Emissions = monthlyKwh * 0.82; // kg CO₂ per kWh in Nigeria
  const treesEquivalent = Math.round(co2Emissions / 21); // 1 tree absorbs ~21kg CO₂/month

  const difficultyColors = {
    Easy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Hard: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Awareness & Education
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Learn how to reduce energy consumption and save costs
          </p>
        </div>
      </div>

      {/* Savings Potential Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Conservative Savings
            </h3>
          </div>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            ₦{potentialSavings.conservative.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            15% reduction in energy costs
          </p>
        </div>

        <div className="card p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Moderate Savings
            </h3>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            ₦{potentialSavings.moderate.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            25% reduction in energy costs
          </p>
        </div>

        <div className="card p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Aggressive Savings
            </h3>
          </div>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            ₦{potentialSavings.aggressive.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            35% reduction in energy costs
          </p>
        </div>
      </div>

      {/* Environmental Impact */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
          Your Environmental Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Monthly CO₂ Emissions
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {co2Emissions.toFixed(0)} kg
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Equivalent Trees Needed
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {treesEquivalent} trees
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Potential CO₂ Reduction
            </p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {(co2Emissions * 0.25).toFixed(0)} kg
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              With 25% energy reduction
            </p>
          </div>
        </div>
      </div>

      {/* Energy Saving Tips */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Energy Saving Best Practices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {energyTips.map((tip) => (
            <button
              key={tip.id}
              onClick={() => setSelectedTip(tip)}
              className="text-left p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all bg-white dark:bg-gray-800"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  {tip.icon}
                </div>
                <div className="flex-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      difficultyColors[tip.difficulty]
                    }`}
                  >
                    {tip.difficulty}
                  </span>
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {tip.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {tip.description}
              </p>
              <div className="space-y-1">
                <p className="text-xs font-medium text-green-600 dark:text-green-400">
                  💰 {tip.savings}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  🌱 {tip.impact}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Tip Modal */}
      {selectedTip && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTip(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                {selectedTip.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedTip.title}
                  </h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      difficultyColors[selectedTip.difficulty]
                    }`}
                  >
                    {selectedTip.difficulty}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedTip.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedTip(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Potential Savings
                </p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  {selectedTip.savings}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  Environmental Impact
                </p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {selectedTip.impact}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Implementation Steps:
              </h3>
              <ul className="space-y-2">
                {selectedTip.tips.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 pt-0.5">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedTip(null)}
              className="w-full mt-6 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
