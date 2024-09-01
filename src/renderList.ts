import {
  doneContainer,
  pendingContainer,
  toDoContainer,
} from "./screenContiners.js";
import { deleteTask, type Task, type TaskType } from "./state.js";

export type DropData = {
  id: number;
  type: TaskType;
  content: string;
};

let RENDER_COUNT = 0;

export const removeOldNode = (type: TaskType, id: number) => {
  const container =
    type === "Done"
      ? doneContainer
      : type === "Pending"
      ? pendingContainer
      : toDoContainer;
  const itemToDelete = document.getElementById(id.toString());

  if (itemToDelete?.parentNode) {
    container.removeChild(itemToDelete);
  }
};

const addNewNode = (task: Task) => {
  const container =
    task.type === "Done"
      ? doneContainer
      : task.type === "Pending"
      ? pendingContainer
      : toDoContainer;

  container.appendChild(createBrandNewTaskNode(task));
};

const dragStartHandler = (e: DragEvent) => {
  const target = e.target as HTMLParagraphElement;
  const dataToTransfer: DropData = {
    id: Number(target.getAttribute("data-id")),
    type: target.getAttribute("data-type") as TaskType,
    content: target.innerText,
  };
  e.dataTransfer?.setData("text/plain", JSON.stringify(dataToTransfer));
  if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
};

const createBrandNewTaskNode = (task: Task) => {
  const p = document.createElement("p");
  p.innerText = task.content;
  p.id = task.id.toString();
  p.setAttribute("data-id", task.id.toString());
  p.setAttribute("data-type", task.type.toString());
  p.setAttribute("data-last-updated", task.lastUpdated.toString());
  p.draggable = true;
  p.addEventListener("dragstart", dragStartHandler);
  p.addEventListener("dblclick", () => {
    deleteTask(task);
  });
  return p;
};

const initialRender = (list: Task[]) => {
  list.forEach((task) => {
    const containerElement = document.getElementById(
      task.type
    ) as HTMLDivElement;
    if (containerElement?.childElementCount === 0) {
      const title = document.createElement("p");
      title.innerText = task.type;
      containerElement.appendChild(title);
    }

    containerElement.appendChild(createBrandNewTaskNode(task));
  });
};

export default (list: Task[], updatedItem?: Task, previousType?: TaskType) => {
  if (RENDER_COUNT === 0) {
    initialRender(list);
    RENDER_COUNT++;
    return;
  }

  if (!updatedItem) {
    return;
  }

  if (previousType) {
    removeOldNode(previousType, updatedItem.id);
  }

  addNewNode(updatedItem);
};
