const CACHE_KEY = "my-todo-app-cache";
export const getCache = () => JSON.parse(localStorage.getItem(CACHE_KEY) || "[]");
export const setCache = (task) => localStorage.setItem(CACHE_KEY, JSON.stringify(task));
