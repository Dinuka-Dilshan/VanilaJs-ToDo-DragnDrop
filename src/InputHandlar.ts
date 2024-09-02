import { Task } from "./types";

export const onInputChange = (onAddItem: (task: Omit<Task, "id">) => void) => {
  const input = document.getElementById("add");
  const status = document.getElementById("task-status") as HTMLSelectElement;
  input?.addEventListener("keydown", (e) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter" || e.code === "Enter") {
      onAddItem({ content: target.value, type: status.value as Task["type"] });
      target.value = "";
    }
  });
};
