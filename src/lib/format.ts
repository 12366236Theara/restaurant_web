const CURRENCY = (import.meta.env.VITE_CURRENCY as string) || 'USD'

export function formatPrice(n: number) {
  // If KHR, many menus show no decimals; tweak as needed.
  const minimumFractionDigits = CURRENCY === 'KHR' ? 0 : 2
  const maximumFractionDigits = CURRENCY === 'KHR' ? 0 : 2
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(n)
}
