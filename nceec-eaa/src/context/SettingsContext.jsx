import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const SettingsContext = createContext(null);

function useLocalStorageState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
  }, [key, state]);
  return [state, setState];
}

export function SettingsProvider({ children }) {
  const [tariff, setTariff] = useLocalStorageState('nceec.settings.tariff', 95);
  const [vatEnabled, setVatEnabled] = useLocalStorageState('nceec.settings.vatEnabled', false);
  const [vatPercent, setVatPercent] = useLocalStorageState('nceec.settings.vatPercent', 0);

  const value = useMemo(
    () => ({ tariff, setTariff, vatEnabled, setVatEnabled, vatPercent, setVatPercent }),
    [tariff, vatEnabled, vatPercent]
  );
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}

