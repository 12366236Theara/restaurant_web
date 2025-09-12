const CURRENCY = 'USD'

export function formatPrice(n: number) {
  // If KHR, many menus show no decimals; tweak as needed.
  const minimumFractionDigits = 2
  const maximumFractionDigits = 2
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(n)
}
