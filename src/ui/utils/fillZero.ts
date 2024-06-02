export default function fillZero(num: number, len: number) {
  return num.toString().padStart(len, '0');
}
