import { doneContainer, pendingContainer, toDoContainer, } from "./screenContiners.js";
const dragStartHandler = (e) => {
    var _a;
    const target = e.target;
    const dataToTransfer = {
        id: Number(target.getAttribute("data-id")),
        type: target.getAttribute("data-type"),
        content: target.innerText,
    };
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData("text/plain", JSON.stringify(dataToTransfer));
    if (e.dataTransfer)
        e.dataTransfer.dropEffect = "move";
};
const createTaskNode = (task, onDoubleClick) => {
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
const initRenderer = (list, onDoubleClick) => {
    list.forEach((task) => {
        const containerElement = document.getElementById(task.type);
        if ((containerElement === null || containerElement === void 0 ? void 0 : containerElement.childElementCount) === 0) {
            const title = document.createElement("p");
            title.innerText = task.type;
            containerElement.appendChild(title);
        }
        containerElement.appendChild(createTaskNode(task, onDoubleClick));
    });
};
const reRenderer = (task, changeState, oldTask, onDoubleClick) => {
    const container = task.type === "Done"
        ? doneContainer
        : task.type === "Pending"
            ? pendingContainer
            : toDoContainer;
    if (changeState === "Delete") {
        container.removeChild(document.getElementById(task.id.toString()));
        return;
    }
    if (changeState === "Add") {
        container.appendChild(createTaskNode(task, onDoubleClick));
        return;
    }
    if (changeState === "Update") {
        const oldContainer = oldTask.type === "Done"
            ? doneContainer
            : oldTask.type === "Pending"
                ? pendingContainer
                : toDoContainer;
        oldContainer.removeChild(document.getElementById(oldTask.id.toString()));
        container.appendChild(createTaskNode(task, onDoubleClick));
    }
};
export const renderer = () => ({
    initRenderer,
    reRenderer,
});
