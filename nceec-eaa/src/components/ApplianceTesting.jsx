import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Award,
  TrendingUp,
} from "lucide-react";

export default function ApplianceTesting({ equipmentList }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Nigerian Energy Efficiency Standards Database
  const efficiencyStandards = {
    "Air Conditioner": {
      standard: "SON 428:2016",
      minEER: 2.9, // Energy Efficiency Ratio
      recommended: 3.5,
      unit: "EER",
      description: "Nigerian Standard for Air Conditioners",
    },
    Refrigerator: {
      standard: "SON 455:2016",
      minEER: 1.8,
      recommended: 2.5,
      unit: "EER",
      description: "Nigerian Standard for Refrigerators",
    },
    "LED Bulb": {
      standard: "SON 521:2017",
      minEfficiency: 80, // Lumens per Watt
      recommended: 120,
      unit: "lm/W",
      description: "Nigerian Standard for LED Lamps",
    },
    "Fluorescent Lamp": {
      standard: "SON 178:2013",
      minEfficiency: 60,
      recommended: 90,
      unit: "lm/W",
      description: "Nigerian Standard for Fluorescent Lamps",
    },
    "Electric Motor": {
      standard: "IEC 60034-30-1",
      minEfficiency: 85, // IE2 efficiency class
      recommended: 90, // IE3 efficiency class
      unit: "%",
      description: "International Standard for Electric Motors",
    },
  };

  // Appliance database with efficiency ratings
  const applianceDatabase = [
    {
      id: 1,
      name: "Split AC 1.5T Inverter",
      category: "HVAC",
      powerKw: 1.2,
      eer: 3.8,
      rating: "A++",
      certified: true,
      standard: "SON 428:2016",
      manufacturer: "LG",
      model: "S186HC",
      annualCost: 85000,
      features: ["Inverter Technology", "Auto Clean", "Smart Diagnosis"],
    },
    {
      id: 2,
      name: "Split AC 2.0T Standard",
      category: "HVAC",
      powerKw: 2.0,
      eer: 2.7,
      rating: "B",
      certified: true,
      standard: "SON 428:2016",
      manufacturer: "Generic",
      model: "AC-200",
      annualCost: 142000,
      features: ["Basic Cooling", "Timer"],
    },
    {
      id: 3,
      name: "LED Panel 40W",
      category: "Lighting",
      powerKw: 0.04,
      efficiency: 125,
      rating: "A+",
      certified: true,
      standard: "SON 521:2017",
      manufacturer: "Philips",
      model: "RC048B",
      annualCost: 2850,
      features: ["Long Life 50,000hrs", "Instant Start", "Dimmable"],
    },
    {
      id: 4,
      name: "CFL 23W",
      category: "Lighting",
      powerKw: 0.023,
      efficiency: 65,
      rating: "C",
      certified: true,
      standard: "SON 178:2013",
      manufacturer: "Philips",
      model: "Essential",
      annualCost: 1640,
      features: ["10,000hrs Life", "Warm White"],
    },
    {
      id: 5,
      name: "Inverter Refrigerator 350L",
      category: "Refrigeration",
      powerKw: 0.15,
      eer: 2.8,
      rating: "A+",
      certified: true,
      standard: "SON 455:2016",
      manufacturer: "Samsung",
      model: "RT35K",
      annualCost: 10700,
      features: ["Digital Inverter", "All Around Cooling", "Deodorizer"],
    },
    {
      id: 6,
      name: "Standard Refrigerator 300L",
      category: "Refrigeration",
      powerKw: 0.25,
      eer: 1.6,
      rating: "D",
      certified: false,
      standard: "Below SON 455:2016",
      manufacturer: "Generic",
      model: "RF-300",
      annualCost: 17800,
      features: ["Basic Cooling", "Manual Defrost"],
    },
    {
      id: 7,
      name: "IE3 Motor 5HP",
      category: "Motors",
      powerKw: 3.7,
      efficiency: 91.7,
      rating: "A",
      certified: true,
      standard: "IEC 60034-30-1",
      manufacturer: "ABB",
      model: "M3BP",
      annualCost: 263500,
      features: ["Premium Efficiency", "Low Noise", "High Reliability"],
    },
    {
      id: 8,
      name: "IE1 Motor 5HP",
      category: "Motors",
      powerKw: 3.7,
      efficiency: 85.0,
      rating: "C",
      certified: true,
      standard: "IEC 60034-30-1",
      manufacturer: "Generic",
      model: "GM-5HP",
      annualCost: 285000,
      features: ["Standard Efficiency"],
    },
  ];

  // Function to check if equipment meets standards
  const checkCompliance = (equipment) => {
    const categoryMap = {
      HVAC: "Air Conditioner",
      Lighting: equipment.name.includes("LED")
        ? "LED Bulb"
        : "Fluorescent Lamp",
      Refrigeration: "Refrigerator",
      Motors: "Electric Motor",
    };

    const standardType = categoryMap[equipment.category];
    if (!standardType) return null;

    const standard = efficiencyStandards[standardType];
    if (!standard) return null;

    let efficiency = equipment.eer || equipment.efficiency;
    let status = "unknown";
    let message = "";

    if (efficiency >= standard.recommended) {
      status = "excellent";
      message = "Exceeds recommended standards";
    } else if (
      efficiency >= standard.minEER ||
      efficiency >= standard.minEfficiency
    ) {
      status = "compliant";
      message = "Meets minimum standards";
    } else {
      status = "non-compliant";
      message = "Below minimum standards";
    }

    return { status, message, standard };
  };

  // Filter appliances
  const filteredAppliances = applianceDatabase.filter((appliance) => {
    const matchesSearch =
      appliance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appliance.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || appliance.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "All",
    ...new Set(applianceDatabase.map((a) => a.category)),
  ];

  const ratingColors = {
    "A++": "bg-green-600 text-white",
    "A+": "bg-green-500 text-white",
    A: "bg-green-400 text-white",
    B: "bg-yellow-400 text-gray-900",
    C: "bg-orange-400 text-white",
    D: "bg-red-500 text-white",
    E: "bg-red-600 text-white",
  };

  const complianceColors = {
    excellent: "text-green-600 dark:text-green-400",
    compliant: "text-blue-600 dark:text-blue-400",
    "non-compliant": "text-red-600 dark:text-red-400",
  };

  const complianceIcons = {
    excellent: <CheckCircle className="w-5 h-5" />,
    compliant: <CheckCircle className="w-5 h-5" />,
    "non-compliant": <XCircle className="w-5 h-5" />,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Appliance Testing & Standards
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Check equipment compliance with Nigerian energy efficiency standards
        </p>
      </div>

      {/* Standards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(efficiencyStandards).map(([type, standard]) => (
          <div key={type} className="card p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {type}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {standard.standard}
                </p>
              </div>
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              {standard.description}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Minimum
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {standard.minEER || standard.minEfficiency} {standard.unit}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Recommended
                </p>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  {standard.recommended} {standard.unit}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certified Appliance Database */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          Certified Appliance Database
        </h2>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name or manufacturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Appliance List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredAppliances.map((appliance) => {
            const compliance = checkCompliance(appliance);
            return (
              <div
                key={appliance.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {appliance.name}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-bold ${
                          ratingColors[appliance.rating]
                        }`}
                      >
                        {appliance.rating}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appliance.manufacturer} - {appliance.model}
                    </p>
                  </div>
                  {appliance.certified && (
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Power Rating
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {appliance.powerKw} kW
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      Annual Cost
                    </p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      ₦{appliance.annualCost.toLocaleString()}
                    </p>
                  </div>
                  {appliance.eer && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        EER
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {appliance.eer}
                      </p>
                    </div>
                  )}
                  {appliance.efficiency && (
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Efficiency
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {appliance.efficiency}{" "}
                        {appliance.category === "Lighting" ? "lm/W" : "%"}
                      </p>
                    </div>
                  )}
                </div>

                {compliance && (
                  <div
                    className={`flex items-center gap-2 mb-3 ${
                      complianceColors[compliance.status]
                    }`}
                  >
                    {complianceIcons[compliance.status]}
                    <span className="text-sm font-medium">
                      {compliance.message}
                    </span>
                  </div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                    Features:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {appliance.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500 dark:text-gray-500">
                  Standard: {appliance.standard}
                </div>
              </div>
            );
          })}
        </div>

        {filteredAppliances.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No appliances found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* Your Equipment Compliance Check */}
      {equipmentList && equipmentList.length > 0 && (
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Your Equipment Compliance Status
          </h2>
          <div className="space-y-3">
            {equipmentList.slice(0, 10).map((equipment) => {
              const compliance = checkCompliance(equipment);
              return (
                <div
                  key={equipment.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {equipment.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {equipment.category} - {equipment.powerKw} kW
                    </p>
                  </div>
                  {compliance ? (
                    <div
                      className={`flex items-center gap-2 ${
                        complianceColors[compliance.status]
                      }`}
                    >
                      {complianceIcons[compliance.status]}
                      <span className="text-sm font-medium">
                        {compliance.message}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-gray-400">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-sm">No standard available</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
