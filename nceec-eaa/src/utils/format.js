// Simple formatting helpers for consistency
const ngnFormatter = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  maximumFractionDigits: 0,
});

export function formatCurrency(value) {
  if (Number.isNaN(Number(value))) return '₦0';
  return ngnFormatter.format(value);
}

export function formatKwh(value, fractionDigits = 0) {
  const num = Number(value) || 0;
  return `${num.toFixed(fractionDigits)} kWh`;
}

export const M2 = 'm²';

