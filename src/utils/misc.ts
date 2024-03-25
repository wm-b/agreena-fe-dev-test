export const firstCharToUpperCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const debounce = (fn: Function, delay: number) => {
  let timer: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
