export function formatCurrency(value, options = {}) {
  const {
    locale = 'en-PH',
    currency = 'PHP',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value)
}


