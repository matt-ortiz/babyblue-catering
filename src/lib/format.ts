export const money = (n: number) =>
  '$' + (Number.isInteger(n) ? n.toLocaleString('en-US') : n.toFixed(2));

type Price = { from?: number; unit?: string; label?: string };

/** "From $199 per guest" — or the custom label when there's no fixed price. */
export function priceLine(price: Price) {
  if (price.from == null) return (price.label ?? 'Custom quote').split(',')[0];
  if (price.label) return price.label;
  return `From ${money(price.from)}${price.unit ? ' ' + price.unit : ''}`;
}

/** Big number + supporting line for the "At a glance" box. */
export function glance(price: Price) {
  if (price.from != null) {
    const u = price.unit ?? '';
    const small = /^(per|for)\b/.test(u) ? `starting ${u}` : `starting price${u ? ', ' + u : ''}`;
    return { big: money(price.from), small };
  }
  const [big, ...rest] = (price.label ?? 'Custom quote').split(',');
  return { big: big.trim(), small: rest.join(',').trim() };
}
