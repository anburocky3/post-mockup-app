export function getFormattedTime() {
  const today = new Date();
  const y = today.getFullYear();
  // JavaScript months are 0-based.
  const m = today.getMonth() + 1;
  const d = today.getDate();
  const h = today.getHours();
  const mi = today.getMinutes();
  const s = today.getSeconds();
  return y + "_" + m + "_" + d + "-" + h + "_" + mi + "_" + s;
}

export const generateName = (user: string) => {
  return `${
    user.toLocaleLowerCase().split(" ")[0]
  }_${getFormattedTime()}_quote.jpg`;
};
