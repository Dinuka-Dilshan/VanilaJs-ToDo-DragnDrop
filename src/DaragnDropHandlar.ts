import {
  doneContainer,
  pendingContainer,
  toDoContainer,
} from "./screenContiners.js";
import { Task } from "./types";

export const onDropChange = (onDrop: (droppedItem: Task) => void) => {
  const dropHandler = (e: DragEvent) => {
    const target = e.target as HTMLDivElement | null;
    e.preventDefault();
    const { id, content } = JSON.parse(
      e.dataTransfer?.getData("text/plain") || ""
    );
    if (!target?.id) return;
    onDrop({
      id,
      content,
      type: target.id as Task["type"],
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
