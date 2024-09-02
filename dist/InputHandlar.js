export const onInputChange = (onAddItem) => {
    const input = document.getElementById("add");
    const status = document.getElementById("task-status");
    input === null || input === void 0 ? void 0 : input.addEventListener("keydown", (e) => {
        const target = e.target;
        if (e.key === "Enter" || e.code === "Enter") {
            onAddItem({ content: target.value, type: status.value });
            target.value = "";
        }
    });
};
