export function calculateAverageRating(items) {
  if (items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.rating, 0);
  return Number((total / items.length).toFixed(1));
}
