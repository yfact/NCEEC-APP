import React, { useState } from "react";

function DataInput({ equipmentList, setEquipmentList, onProceed }) {
  const [localList, setLocalList] = useState(equipmentList);
  const [form, setForm] = useState({
    name: "",
    powerKw: 0.04,
    qty: 1,
    hoursPerDay: 1,
    category: "Lighting",
  });

  function addItem() {
    setLocalList([...localList, { ...form, id: Date.now() }]);
    setForm({ name: "", powerKw: 0.04, qty: 1, hoursPerDay: 1, category: "Lighting" });
  }

  function save() {
    setEquipmentList(localList);
    onProceed();
  }

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="card-body">
        <h2 className="section-title mb-4">Equipment & Consumption Data</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Equipment name" />
          <input value={form.powerKw} onChange={(e) => setForm({ ...form, powerKw: Number(e.target.value) })} className="input" placeholder="Power (kW)" />
          <input value={form.qty} onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })} className="input" placeholder="Qty" />
          <input value={form.hoursPerDay} onChange={(e) => setForm({ ...form, hoursPerDay: Number(e.target.value) })} className="input" placeholder="Hours/day" />
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
            <option>Lighting</option>
            <option>HVAC</option>
            <option>Plug Loads</option>
            <option>AV</option>
          </select>
          <div className="flex items-center"><button onClick={addItem} className="btn btn-primary">Add</button></div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Current Equipment</h3>
          <ul className="space-y-2">
            {localList.map((it) => (
              <li key={it.id} className="flex justify-between items-center border rounded-lg p-3 shadow-sm bg-white">
                <div>
                  <div className="font-medium">
                    {it.name} <span className="text-xs text-gray-500">({it.category})</span>
                  </div>
                  <div className="text-sm text-gray-500">{it.powerKw} kW • {it.qty} pcs • {it.hoursPerDay} hrs/day</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setLocalList(localList.filter((x) => x.id !== it.id))} className="text-sm px-3 py-1 border rounded-lg hover:bg-slate-50">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end"><button onClick={save} className="btn btn-primary">Save & Visualize</button></div>
      </div>
    </div>
  );
}

export default DataInput;

