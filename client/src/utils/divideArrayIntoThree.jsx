export default function divideArrayIntoThree(arr) {
  const n = arr.length;
  const chunkSize = Math.floor(n / 3);
  const remainder = n % 3;

  const chunk1 = arr.slice(0, chunkSize + (remainder >= 1 ? 1 : 0));
  const chunk2 = arr.slice(chunk1.length, chunk1.length + chunkSize + (remainder >= 2 ? 1 : 0));
  const chunk3 = arr.slice(chunk1.length + chunk2.length);

  return [chunk1, chunk2, chunk3];
}