import { logger } from "./log.js";
import { DropData } from "./renderList.js";
import {
  doneContainer,
  pendingContainer,
  toDoContainer,
} from "./screenContiners.js";
import { createState, TaskType, updateTask } from "./state.js";

const bindInputListeners = () => {
  const input = document.getElementById("add");
  const status = document.getElementById("task-status") as HTMLSelectElement;
  input?.addEventListener("keydown", (e) => {
    const target = e.target as HTMLInputElement;
    if (e.key === "Enter" || e.code === "Enter") {
      updateTask({
        id: Date.now(),
        content: target.value,
        lastUpdated: Date.now(),
        type: status.value as TaskType,
      });
      target.value = "";
    }
  });
};

const bindDragDropHandlers = () => {
  const dropHandler = (e: DragEvent) => {
    e.preventDefault();
    const { id, content } = JSON.parse(
      e.dataTransfer?.getData("text/plain") || ""
    ) as DropData;
    if (!e.target?.id) return;
    updateTask({
      id,
      content,
      lastUpdated: Date.now(),
      type: e.target?.id,
    });
  };

  const dragoverHandler = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
  };

  [toDoContainer, pendingContainer, doneContainer].forEach((container) => {
    container.addEventListener("dragover", dragoverHandler);
    container.addEventListener("drop", dropHandler);
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      container.classList.add("hovered");
    });
    container.addEventListener("dragleave", (e) => {
      container.classList.remove("hovered");
    });
    container.addEventListener("drop", (e) => {
      container.classList.remove("hovered");
    });
  });
};

export const boostrap = (options?: { logger?: boolean }) => {
  if (options?.logger) {
    logger();
  }
  createState();
  bindDragDropHandlers();
  bindInputListeners();
};
