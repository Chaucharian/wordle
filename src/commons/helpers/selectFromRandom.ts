export const selectFromRandom = (items: string[]) =>
  items[Math.floor(Math.random() * items.length)];
