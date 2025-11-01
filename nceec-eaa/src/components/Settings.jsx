import React from 'react';
import { useSettings } from '../context/SettingsContext.jsx';

export default function Settings() {
  const { tariff, setTariff, vatEnabled, setVatEnabled, vatPercent, setVatPercent } = useSettings();

  return (
    <div className="max-w-2xl mx-auto card p-6">
      <h2 className="section-title mb-4">Settings</h2>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Electricity Tariff (NGN/kWh)</label>
          <input
            type="number"
            className="input"
            min={0}
            step={1}
            value={tariff}
            onChange={(e) => setTariff(Number(e.target.value) || 0)}
          />
        </div>

        <div className="flex items-center gap-3">
          <input id="vat-enabled" type="checkbox" className="h-4 w-4"
            checked={vatEnabled} onChange={(e) => setVatEnabled(e.target.checked)} />
          <label htmlFor="vat-enabled" className="text-sm text-gray-700 dark:text-gray-300">Apply VAT to cost</label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">VAT percent (%)</label>
          <input
            type="number"
            className="input"
            min={0}
            step={0.5}
            value={vatPercent}
            onChange={(e) => setVatPercent(Number(e.target.value) || 0)}
            disabled={!vatEnabled}
          />
        </div>
      </div>
    </div>
  );
}

