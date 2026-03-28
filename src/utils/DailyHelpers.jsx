
export const getTodayString = () => {
  return new Date().toISOString().split('T')[0];
};

export const getDailyIndex = (dataLength) => {
  if (dataLength === 0) return 0;
  
  const today = getTodayString();
  const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);  
  return seed % dataLength;
};