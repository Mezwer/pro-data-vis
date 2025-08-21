export const secondsToHMS = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num) => String(num).padStart(2, '0');

  return `${hours ? `${pad(hours)}:` : ''}${pad(minutes)}:${pad(seconds)}`;
};
