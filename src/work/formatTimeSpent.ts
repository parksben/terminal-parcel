export default function formatTimeSpent(duration: number) {
  const sec = 1000;
  const min = 60 * sec;
  const hour = 60 * min;

  if (duration < sec) {
    return `${Math.round(duration)}ms`;
  }

  if (duration < min) {
    return `${Math.round((10 * duration) / sec) / 10}s`;
  }

  if (duration < hour) {
    return `${Math.round((10 * duration) / min) / 10}min`;
  }

  return `${Math.round((10 * duration) / hour) / 10}h`;
}
