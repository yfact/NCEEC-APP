import React, { useState } from "react";
import { useSettings } from "../context/SettingsContext.jsx";
import { formatCurrency } from "../utils/format";

function LogData({ equipmentList, setEquipmentList, rooms, setRooms }) {
  const { tariff } = useSettings();
  const [activeTab, setActiveTab] = useState("lighting");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomFunction, setNewRoomFunction] = useState("");

  const roomFunctions = [
    "Office",
    "Meeting Room",
    "Training Room",
    "Server Room",
    "Workshop",
    "Kitchen",
    "Lobby",
    "Corridor",
    "Storage",
    "Restroom",
    "Laboratory",
    "Classroom",
    "Bedroom",
    "Living Room",
    "Manufacturing Floor",
    "Warehouse",
    "Retail Space",
    "Other",
  ];

  // Lighting Form State
  const [lightingForm, setLightingForm] = useState({
    fixtureType: "",
    quantity: 1,
    wattage: 40,
    hoursPerDay: 8,
    powerKw: 0.04,
    monthlyKwh: 0,
    monthlyCost: 0,
  });

  // AC Form State
  const [acForm, setAcForm] = useState({
    name: "",
    tonnage: 1.5,
    eer: 10,
    hoursPerDay: 8,
    powerKw: 0,
    monthlyKwh: 0,
    monthlyCost: 0,
  });

  // Appliance Form State
  const [applianceForm, setApplianceForm] = useState({
    name: "",
    powerKw: 0.1,
    qty: 1,
    hoursPerDay: 4,
    category: "Plug Loads",
    monthlyKwh: 0,
    monthlyCost: 0,
  });

  // Solar Form State
  const [solarForm, setSolarForm] = useState({
    systemSize: 5,
    sunHours: 5,
    efficiency: 85,
    dailyGeneration: 0,
    monthlyGeneration: 0,
    potentialSavings: 0,
  });

  // Auto-calculate for Lighting
  React.useEffect(() => {
    const powerKw = (lightingForm.wattage * lightingForm.quantity) / 1000;
    const monthlyKwh = powerKw * lightingForm.hoursPerDay * 30;
    const monthlyCost = monthlyKwh * tariff;
    setLightingForm((prev) => ({ ...prev, powerKw, monthlyKwh, monthlyCost }));
  }, [
    lightingForm.wattage,
    lightingForm.quantity,
    lightingForm.hoursPerDay,
    tariff,
  ]);

  // Auto-calculate for AC
  React.useEffect(() => {
    const powerKw = (acForm.tonnage * 3.517) / acForm.eer; // 1 ton = 3.517 kW cooling
    const monthlyKwh = powerKw * acForm.hoursPerDay * 30;
    const monthlyCost = monthlyKwh * tariff;
    setAcForm((prev) => ({ ...prev, powerKw, monthlyKwh, monthlyCost }));
  }, [acForm.tonnage, acForm.eer, acForm.hoursPerDay, tariff]);

  // Auto-calculate for Appliance
  React.useEffect(() => {
    const monthlyKwh =
      applianceForm.powerKw *
      applianceForm.qty *
      applianceForm.hoursPerDay *
      30;
    const monthlyCost = monthlyKwh * tariff;
    setApplianceForm((prev) => ({ ...prev, monthlyKwh, monthlyCost }));
  }, [
    applianceForm.powerKw,
    applianceForm.qty,
    applianceForm.hoursPerDay,
    tariff,
  ]);

  // Auto-calculate for Solar
  React.useEffect(() => {
    const dailyGeneration =
      solarForm.systemSize * solarForm.sunHours * (solarForm.efficiency / 100);
    const monthlyGeneration = dailyGeneration * 30;
    const potentialSavings = monthlyGeneration * tariff;
    setSolarForm((prev) => ({
      ...prev,
      dailyGeneration,
      monthlyGeneration,
      potentialSavings,
    }));
  }, [solarForm.systemSize, solarForm.sunHours, solarForm.efficiency, tariff]);

  const addLighting = () => {
    if (!lightingForm.fixtureType || !selectedRoom) {
      alert("Please select a room and enter fixture type");
      return;
    }
    setEquipmentList([
      ...equipmentList,
      {
        id: Date.now(),
        name: lightingForm.fixtureType,
        powerKw: lightingForm.powerKw,
        qty: lightingForm.quantity,
        hoursPerDay: lightingForm.hoursPerDay,
        category: "Lighting",
        room: selectedRoom,
      },
    ]);
    setLightingForm({
      fixtureType: "",
      quantity: 1,
      wattage: 40,
      hoursPerDay: 8,
      powerKw: 0.04,
      monthlyKwh: 0,
      monthlyCost: 0,
    });
  };

  const addAC = () => {
    if (!acForm.name || !selectedRoom) {
      alert("Please select a room and enter AC name");
      return;
    }
    setEquipmentList([
      ...equipmentList,
      {
        id: Date.now(),
        name: acForm.name,
        powerKw: acForm.powerKw,
        qty: 1,
        hoursPerDay: acForm.hoursPerDay,
        category: "HVAC",
        room: selectedRoom,
      },
    ]);
    setAcForm({
      name: "",
      tonnage: 1.5,
      eer: 10,
      hoursPerDay: 8,
      powerKw: 0,
      monthlyKwh: 0,
      monthlyCost: 0,
    });
  };

  const addAppliance = () => {
    if (!applianceForm.name || !selectedRoom) {
      alert("Please select a room and enter appliance name");
      return;
    }
    setEquipmentList([
      ...equipmentList,
      {
        id: Date.now(),
        name: applianceForm.name,
        powerKw: applianceForm.powerKw,
        qty: applianceForm.qty,
        hoursPerDay: applianceForm.hoursPerDay,
        category: applianceForm.category,
        room: selectedRoom,
      },
    ]);
    setApplianceForm({
      name: "",
      powerKw: 0.1,
      qty: 1,
      hoursPerDay: 4,
      category: "Plug Loads",
      monthlyKwh: 0,
      monthlyCost: 0,
    });
  };

  const tabs = [
    { key: "lighting", label: "Lighting" },
    { key: "ac", label: "Air Conditioner" },
    { key: "appliances", label: "Appliances" },
    { key: "solar", label: "Solar PV Design" },
  ];

  const addRoom = () => {
    if (!newRoomName || !newRoomFunction) {
      alert("Please enter room name and function");
      return;
    }
    setRooms([
      ...rooms,
      { id: Date.now(), name: newRoomName, function: newRoomFunction },
    ]);
    setNewRoomName("");
    setNewRoomFunction("");
  };

  return (
    <div>
      <h1 className="section-title mb-6">Log Energy Data</h1>

      {/* Room Management Section */}
      <div className="card mb-6 p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Add New Room */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Add New Room</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Conference Room A"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Function
                </label>
                <select
                  value={newRoomFunction}
                  onChange={(e) => setNewRoomFunction(e.target.value)}
                  className="input"
                >
                  <option value="">Select function...</option>
                  {roomFunctions.map((func) => (
                    <option key={func} value={func}>
                      {func}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={addRoom} className="btn btn-primary w-full">
                Add Room
              </button>
            </div>
          </div>

          {/* Select Room for Logging */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Select Room for Equipment Logging
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Active Room
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="input"
                >
                  <option value="">Select room...</option>
                  {rooms.map((room) => (
                    <option key={room.id} value={room.name}>
                      {room.name} ({room.function})
                    </option>
                  ))}
                </select>
              </div>
              {selectedRoom && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Currently logging equipment for:</strong>{" "}
                    {selectedRoom}
                  </p>
                </div>
              )}
              {!selectedRoom && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Please select a room to start logging equipment
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-medium transition-colors border-b-2 ${
              activeTab === tab.key
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card p-6">
        {/* Lighting Tab */}
        {activeTab === "lighting" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add Lighting Fixture
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Fixture Type
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., LED Panel 40W"
                  value={lightingForm.fixtureType}
                  onChange={(e) =>
                    setLightingForm({
                      ...lightingForm,
                      fixtureType: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="input"
                  value={lightingForm.quantity}
                  onChange={(e) =>
                    setLightingForm({
                      ...lightingForm,
                      quantity: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Wattage (W)
                </label>
                <input
                  type="number"
                  className="input"
                  value={lightingForm.wattage}
                  onChange={(e) =>
                    setLightingForm({
                      ...lightingForm,
                      wattage: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Hours/Day
                </label>
                <input
                  type="number"
                  className="input"
                  value={lightingForm.hoursPerDay}
                  onChange={(e) =>
                    setLightingForm({
                      ...lightingForm,
                      hoursPerDay: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            {/* Auto Calculations */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">Power (kW)</div>
                <div className="text-xl font-bold text-gray-800">
                  {lightingForm.powerKw.toFixed(3)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Consumption</div>
                <div className="text-xl font-bold text-yellow-500">
                  {lightingForm.monthlyKwh.toFixed(1)} kWh
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Cost</div>
                <div className="text-xl font-bold text-red-500">
                  {formatCurrency(Math.round(lightingForm.monthlyCost))}
                </div>
              </div>
            </div>

            <button onClick={addLighting} className="btn btn-primary">
              Add Lighting Fixture
            </button>
          </div>
        )}

        {/* AC Tab */}
        {activeTab === "ac" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add Air Conditioner
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  AC Name
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Split AC 2.0T"
                  value={acForm.name}
                  onChange={(e) =>
                    setAcForm({ ...acForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Tonnage
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="input"
                  value={acForm.tonnage}
                  onChange={(e) =>
                    setAcForm({ ...acForm, tonnage: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  EER Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="input"
                  value={acForm.eer}
                  onChange={(e) =>
                    setAcForm({ ...acForm, eer: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Hours/Day
                </label>
                <input
                  type="number"
                  className="input"
                  value={acForm.hoursPerDay}
                  onChange={(e) =>
                    setAcForm({
                      ...acForm,
                      hoursPerDay: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            {/* Auto Calculations */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">Power (kW)</div>
                <div className="text-xl font-bold text-gray-800">
                  {acForm.powerKw.toFixed(3)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Consumption</div>
                <div className="text-xl font-bold text-yellow-500">
                  {acForm.monthlyKwh.toFixed(1)} kWh
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Cost</div>
                <div className="text-xl font-bold text-red-500">
                  {formatCurrency(Math.round(acForm.monthlyCost))}
                </div>
              </div>
            </div>

            <button onClick={addAC} className="btn btn-primary">
              Add Air Conditioner
            </button>
          </div>
        )}

        {/* Appliances Tab */}
        {activeTab === "appliances" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Add Appliance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Appliance Name
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g., Refrigerator"
                  value={applianceForm.name}
                  onChange={(e) =>
                    setApplianceForm({ ...applianceForm, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Power (kW)
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="input"
                  value={applianceForm.powerKw}
                  onChange={(e) =>
                    setApplianceForm({
                      ...applianceForm,
                      powerKw: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="input"
                  value={applianceForm.qty}
                  onChange={(e) =>
                    setApplianceForm({
                      ...applianceForm,
                      qty: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Hours/Day
                </label>
                <input
                  type="number"
                  className="input"
                  value={applianceForm.hoursPerDay}
                  onChange={(e) =>
                    setApplianceForm({
                      ...applianceForm,
                      hoursPerDay: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-600 mb-1">
                  Category
                </label>
                <select
                  className="input"
                  value={applianceForm.category}
                  onChange={(e) =>
                    setApplianceForm({
                      ...applianceForm,
                      category: e.target.value,
                    })
                  }
                >
                  <option>Plug Loads</option>
                  <option>AV Equipment</option>
                  <option>Kitchen</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            {/* Auto Calculations */}
            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-500">Monthly Consumption</div>
                <div className="text-xl font-bold text-yellow-500">
                  {applianceForm.monthlyKwh.toFixed(1)} kWh
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Monthly Cost</div>
                <div className="text-xl font-bold text-red-500">
                  {formatCurrency(Math.round(applianceForm.monthlyCost))}
                </div>
              </div>
            </div>

            <button onClick={addAppliance} className="btn btn-primary">
              Add Appliance
            </button>
          </div>
        )}

        {/* Solar PV Design Tab */}
        {activeTab === "solar" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Solar PV Design Calculator
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  System Size (kW)
                </label>
                <input
                  type="number"
                  step="0.5"
                  className="input"
                  value={solarForm.systemSize}
                  onChange={(e) =>
                    setSolarForm({
                      ...solarForm,
                      systemSize: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Peak Sun Hours/Day
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="input"
                  value={solarForm.sunHours}
                  onChange={(e) =>
                    setSolarForm({
                      ...solarForm,
                      sunHours: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  System Efficiency (%)
                </label>
                <input
                  type="number"
                  className="input"
                  value={solarForm.efficiency}
                  onChange={(e) =>
                    setSolarForm({
                      ...solarForm,
                      efficiency: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            {/* Solar Calculations */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <div>
                <div className="text-sm text-gray-600">Daily Generation</div>
                <div className="text-xl font-bold text-green-600">
                  {solarForm.dailyGeneration.toFixed(1)} kWh
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Monthly Generation</div>
                <div className="text-xl font-bold text-green-600">
                  {solarForm.monthlyGeneration.toFixed(1)} kWh
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Potential Savings</div>
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(Math.round(solarForm.potentialSavings))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Equipment List - Grouped by Room */}
      {equipmentList.length > 0 && (
        <div className="card mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Logged Equipment by Room
          </h3>
          <div className="space-y-6">
            {rooms.map((room) => {
              const roomEquipment = equipmentList.filter(
                (item) => item.room === room.name
              );
              if (roomEquipment.length === 0) return null;

              return (
                <div
                  key={room.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {room.name}
                      </h4>
                      <p className="text-sm text-gray-500">{room.function}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {roomEquipment.length} equipment(s)
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="text-left p-3 text-sm text-gray-600">
                            Name
                          </th>
                          <th className="text-left p-3 text-sm text-gray-600">
                            Category
                          </th>
                          <th className="text-center p-3 text-sm text-gray-600">
                            Power (kW)
                          </th>
                          <th className="text-center p-3 text-sm text-gray-600">
                            Qty
                          </th>
                          <th className="text-center p-3 text-sm text-gray-600">
                            Hours/Day
                          </th>
                          <th className="text-center p-3 text-sm text-gray-600">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roomEquipment.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="p-3">{item.name}</td>
                            <td className="p-3 text-sm text-gray-600">
                              {item.category}
                            </td>
                            <td className="p-3 text-center">{item.powerKw}</td>
                            <td className="p-3 text-center">{item.qty}</td>
                            <td className="p-3 text-center">
                              {item.hoursPerDay}
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() =>
                                  setEquipmentList(
                                    equipmentList.filter(
                                      (e) => e.id !== item.id
                                    )
                                  )
                                }
                                className="text-red-500 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default LogData;
