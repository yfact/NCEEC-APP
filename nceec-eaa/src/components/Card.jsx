import React from "react";

function Card({ title, value, subtitle, icon = null, tone = "emerald" }) {
  const toneBg = {
    emerald: "from-emerald-500/10 to-emerald-500/0",
    amber: "from-amber-500/10 to-amber-500/0",
    rose: "from-rose-500/10 to-rose-500/0",
    sky: "from-sky-500/10 to-sky-500/0",
  }[tone] || "from-emerald-500/10 to-emerald-500/0";

  return (
    <div className="stat relative overflow-hidden">
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneBg}`} />
      <div className="relative flex items-center gap-4">
        {icon && (
          <div className="h-12 w-12 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
          {subtitle && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;

