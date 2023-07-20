export const formatMilliseconds = (milliseconds: number): string => {
  let minutes: number = Math.floor((milliseconds % 3600000) / 60000)
  let seconds: number = Math.floor((milliseconds % 60000) / 1000)
  let ms: number = Math.floor(milliseconds % 1000)

  const padZero = (num: number): string | number => (num < 10 ? '0' + num : num)

  return `${padZero(minutes)}:${padZero(seconds)}:${padZero(ms)}`
}