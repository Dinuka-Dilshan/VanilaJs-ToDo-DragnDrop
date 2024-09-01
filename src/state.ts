import renderList, { removeOldNode } from "./renderList.js";
export type TaskType = "To Do" | "Pending" | "Done";

export type Task = {
  id: number;
  content: string;
  type: TaskType;
  lastUpdated: number;
};

const DATA_KEY = "my-todo-app-by-dinuka-data";

let taskList: Task[] = [];
const listneres: ((state: Task[]) => void)[] = [];

export const listenToState = (fn: (state: Task[]) => void) =>
  listneres.push(fn);

const saveToLocalDB = () =>
  localStorage.setItem(DATA_KEY, JSON.stringify(taskList));

export const createState = () => {
  const savedData = localStorage.getItem(DATA_KEY);
  if (savedData) {
    taskList = JSON.parse(savedData);
  }
  renderList(taskList);
  listneres.forEach((listner) => listner(taskList));
};

export const deleteTask = (task: Task) => {
  taskList = taskList.filter((t) => t.id !== task.id);
  removeOldNode(task.type, task.id);
  saveToLocalDB();
  listneres.forEach((listner) => listner(taskList));
};

export const updateTask = (task: Task) => {
  const existingTaskRecord = taskList.find((t) => t.id === task.id);
  const previousType = existingTaskRecord?.type;
  if (existingTaskRecord) {
    existingTaskRecord.type = task.type;
    existingTaskRecord.content = task.content;
    existingTaskRecord.lastUpdated = Date.now();
  } else {
    taskList.push(task);
  }
  renderList(taskList, existingTaskRecord || task, previousType);
  saveToLocalDB();
  listneres.forEach((listner) => listner(taskList));
};
