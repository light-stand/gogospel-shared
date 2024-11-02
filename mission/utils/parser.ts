export const parseDuration = (duration?: number | null) => {
  if (!duration) return [1, 1];
  if (duration % 30 === 0) return [duration / 30, 30];
  if (duration % 7 === 0) return [duration / 7, 7];
  return [duration, 1];
};
