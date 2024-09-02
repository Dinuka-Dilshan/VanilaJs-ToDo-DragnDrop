import {
  doneContainer,
  pendingContainer,
  toDoContainer,
} from "./screenContiners.js";
import { StateChange } from "./State.js";
import type { Task } from "./types.js";

type OnDoubleClick = (task: Task) => void;

const dragStartHandler = (e: DragEvent) => {
  const target = e.target as HTMLParagraphElement;
  const dataToTransfer = {
    id: Number(target.getAttribute("data-id")),
    type: target.getAttribute("data-type") as Task["type"],
    content: target.innerText,
  };
  e.dataTransfer?.setData("text/plain", JSON.stringify(dataToTransfer));
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
};

const createTaskNode = (task: Task, onDoubleClick: OnDoubleClick) => {
  const p = document.createElement("p");
  p.innerText = task.content;
  p.id = task.id.toString();
  p.setAttribute("data-id", task.id.toString());
  p.setAttribute("data-type", task.type.toString());
  p.draggable = true;
  p.addEventListener("dragstart", dragStartHandler);
  p.addEventListener("dblclick", () => {
    onDoubleClick(task);
  });
  return p;
};

const initRenderer = (list: Task[], onDoubleClick: OnDoubleClick) => {
  list.forEach((task) => {
    const containerElement = document.getElementById(
      task.type
    ) as HTMLDivElement;
    if (containerElement?.childElementCount === 0) {
      const title = document.createElement("p");
      title.innerText = task.type;
      containerElement.appendChild(title);
    }

    containerElement.appendChild(createTaskNode(task, onDoubleClick));
  });
};

const reRenderer = (
  task: Task,
  changeState: StateChange,
  oldTask: Task,
  onDoubleClick: OnDoubleClick
) => {
  const container =
    task.type === "Done"
      ? doneContainer
      : task.type === "Pending"
      ? pendingContainer
      : toDoContainer;

  if (changeState === "Delete") {
    container.removeChild(
      document.getElementById(task.id.toString()) as HTMLParagraphElement
    );
    return;
  }

  if (changeState === "Add") {
    container.appendChild(createTaskNode(task, onDoubleClick));
    return;
  }

  if (changeState === "Update") {
    const oldContainer =
      oldTask.type === "Done"
        ? doneContainer
        : oldTask.type === "Pending"
        ? pendingContainer
        : toDoContainer;
    oldContainer.removeChild(
      document.getElementById(oldTask.id.toString()) as HTMLParagraphElement
    );
    container.appendChild(createTaskNode(task, onDoubleClick));
  }
};

export const renderer = () => ({
  initRenderer,
  reRenderer,
});
