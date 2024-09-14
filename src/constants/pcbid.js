export function generatePCBID() {
  const prefix = "01201000000000";
  const hexChars = "0123456789ABCDEF";
  let randomPart = "";

  for (let i = 0; i < 6; i++) {
    randomPart += hexChars[Math.floor(Math.random() * hexChars.length)];
  }

  const potentialPCBid = prefix + randomPart;
  return potentialPCBid;
}
