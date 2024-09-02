const State = (initialState) => {
    let data = initialState || [];
    let listners = [];
    const update = (item) => {
        let isUpdated = false;
        let previousItemState;
        data = data.map((d) => {
            if (d.id === item.id) {
                previousItemState = Object.assign({}, d);
                isUpdated = true;
                return Object.assign({}, item);
            }
            return d;
        });
        if (isUpdated) {
            listners.forEach((listner) => listner(data, item, "Update", previousItemState));
        }
    };
    const add = (item) => {
        data = [...data, Object.assign({}, item)];
        listners.forEach((listner) => listner(data, item, "Add", item));
    };
    const remove = (item) => {
        let isUpdated = false;
        let previousItemState;
        data = data.filter((d) => {
            if (Number(d.id) !== Number(item.id)) {
                return true;
            }
            isUpdated = true;
            previousItemState = Object.assign({}, d);
            return false;
        });
        if (isUpdated) {
            listners.forEach((listner) => listner(data, item, "Delete", previousItemState));
        }
    };
    const listen = (listner) => (listners = [...listners, listner]);
    const ignore = (listner) => (listners = listners.filter((l) => l !== listner));
    return { data, update, add, remove, listen, ignore };
};
export default State;
