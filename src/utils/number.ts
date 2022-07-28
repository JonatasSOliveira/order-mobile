export function formatToCurrency(value: string): string {
  value = Number(value.replace(",", "")) + "";

  if (value.length < 2) return "0,0" + value;

  if (value.length < 3) return "0," + value;

  const decimal = value.substring(value.length - 2);
  const integer = value.substring(0, value.length - 2);

  return `${integer},${decimal}`;
}
