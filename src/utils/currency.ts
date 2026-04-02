export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseRupiah(value: string): number {
  const numericString = value.replace(/[^0-9]/g, '');
  const parsed = parseInt(numericString, 10);
  return isNaN(parsed) ? 0 : parsed;
}
