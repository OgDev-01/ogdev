import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function humanizeNumber(num: number) {
  if (num < 1000) {
    return num;
  }
  const si = ["K", "M", "G", "T", "P", "H"];
  const exp = Math.floor(Math.log(num) / Math.log(1000));
  const result = (num / Math.pow(1000, exp)).toFixed(1);
  return result + si[exp - 1];
}
