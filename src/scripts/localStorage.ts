export const setLocalStorageItem = <T>(key: string, value: T): void => {
  const serializedValue = typeof value === 'object' 
    ? JSON.stringify(value) 
    : String(value);
  localStorage.setItem(key, serializedValue);
};

export const getLocalStorageItem = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch {
    return item as unknown as T;
  }
};

export const removeLocalStorageItem = (key: string): void => {
  localStorage.removeItem(key);
};
