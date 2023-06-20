export const formatTime = (time: Date) => {
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};
