import { Task } from "./types";

const CACHE_KEY = "my-todo-app-cache";

export const getCache = () =>
  JSON.parse(localStorage.getItem(CACHE_KEY) || "[]") as Task[];

export const setCache = (task: Task[]) =>
  localStorage.setItem(CACHE_KEY, JSON.stringify(task));
