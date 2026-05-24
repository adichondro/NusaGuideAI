import React from 'react';

export function BudgetProgress({ label, value, max, color = 'primary' }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  
  const colors = {
    hotel: "bg-hotel",
    transport: "bg-transport",
    food: "bg-food",
    tickets: "bg-tickets",
    primary: "bg-primary"
  };

  const formatRupiah = (number) => {
    if (number === 0) return 'Rp0';
    return 'Rp' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full mb-3">
      <div className="flex justify-between items-center text-xs font-semibold text-on-surface">
        <span>{label}</span>
        <strong className="text-on-surface">{formatRupiah(value)}</strong>
      </div>
      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden border border-outline/5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
