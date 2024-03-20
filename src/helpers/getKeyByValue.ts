/* eslint-disable @typescript-eslint/no-explicit-any */
export function getKeyByValue(object: any, value: any) {
  return Object.keys(object).find((key) => object[key] === value)
}
