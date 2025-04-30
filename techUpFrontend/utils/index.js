
export function formatPrice(price, showDecimals = false) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
    currencyDisplay: 'symbol',            // “₩” by default
    minimumFractionDigits: showDecimals ? 0 : 0,
    maximumFractionDigits: showDecimals ? 0 : 0,
  }).format(price);
}
export function formatString(str) {
  return str
    .toLowerCase()
    .replace(/&/g, "") // Remove all occurrences of "&"
    .replace(/\s+/g, "-") // Replace one or more spaces with a single "-"
    .replace(/-+/g, "-") // Replace multiple "-" with a single "-"
    .trim(); // Remove any leading or trailing spaces
}

