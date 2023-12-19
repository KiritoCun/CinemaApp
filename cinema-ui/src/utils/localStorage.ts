export function saveToLocalStorage(key: string, value: any): void {

  localStorage.setItem(key, JSON.stringify(value));

}

export function getFromLocalStorage<T>(key: string): T | null {

  const value = localStorage.getItem(key);

  return value ? JSON.parse(value) as T : null;

}

export function removeFromLocalStorage(key: string): void {

  localStorage.removeItem(key);

}
