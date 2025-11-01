import React, { useState } from "react";

function FacilitySetup({ facility, onSave }) {
  const [local, setLocal] = useState(facility);

  const buildingTypes = [
    "Residential",
    "Commercial Office",
    "Industrial",
    "Educational",
    "Healthcare",
    "Retail",
    "Hospitality",
    "Mixed Use",
    "Government",
    "Religious",
  ];

  return (
    <div className="max-w-2xl mx-auto card">
      <div className="card-body">
        <h2 className="section-title mb-4">Facility Setup</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facility Name
            </label>
            <input
              type="text"
              placeholder="e.g., NCEEC Training Center"
              value={local.name}
              onChange={(e) => setLocal({ ...local, name: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Building Type
            </label>
            <select
              value={local.buildingType || "Commercial Office"}
              onChange={(e) =>
                setLocal({ ...local, buildingType: e.target.value })
              }
              className="input"
            >
              <option value="">Select building type...</option>
              {buildingTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="e.g., Lagos, Nigeria"
              value={local.location}
              onChange={(e) => setLocal({ ...local, location: e.target.value })}
              className="input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Floor Area (m²)
            </label>
            <input
              type="number"
              placeholder="120"
              value={local.area}
              onChange={(e) =>
                setLocal({ ...local, area: Number(e.target.value) })
              }
              className="input"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button onClick={() => onSave(local)} className="btn btn-primary">
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacilitySetup;
