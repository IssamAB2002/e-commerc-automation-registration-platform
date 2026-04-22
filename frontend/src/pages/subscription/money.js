export const USD_TO_DZD = 250

export function toDzd(usd) {
  return Math.round(usd * USD_TO_DZD)
}

export function formatDA(dzdAmount) {
  const formatted = new Intl.NumberFormat('fr-DZ', { maximumFractionDigits: 0 }).format(dzdAmount)
  return `${formatted} DA`
}
