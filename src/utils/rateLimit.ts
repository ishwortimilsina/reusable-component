export const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 0) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }
};
