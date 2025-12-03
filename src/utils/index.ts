export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const generateId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 10);

export const toSlug = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
