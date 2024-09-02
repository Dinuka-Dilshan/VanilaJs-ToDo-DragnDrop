import { doneContainer, pendingContainer, toDoContainer, } from "./screenContiners.js";
export const onDropChange = (onDrop) => {
    const dropHandler = (e) => {
        var _a;
        const target = e.target;
        e.preventDefault();
        const { id, content } = JSON.parse(((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData("text/plain")) || "");
        if (!(target === null || target === void 0 ? void 0 : target.id))
            return;
        onDrop({
            id,
            content,
            type: target.id,
        });
    };
    const dragoverHandler = (e) => {
        e.preventDefault();
        if (e.dataTransfer)
            e.dataTransfer.dropEffect = "move";
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
