export type StateChange = "Delete" | "Add" | "Update";

type Listner<K> = (
  state: K[],
  affectedItem: K,
  stateChangeType: StateChange,
  affectedItemPreviousState: K
) => void;

const State = <T extends { id: number }>(initialState?: T[]) => {
  let data: T[] = initialState || [];
  let listners: Listner<T>[] = [];

  const update = (item: T) => {
    let isUpdated = false;
    let previousItemState: T;
    data = data.map((d) => {
      if (d.id === item.id) {
        previousItemState = { ...d };
        isUpdated = true;
        return { ...item };
      }
      return d;
    });

    if (isUpdated) {
      listners.forEach((listner) =>
        listner(data, item, "Update", previousItemState)
      );
    }
  };

  const add = (item: T) => {
    data = [...data, { ...item }];
    listners.forEach((listner) => listner(data, item, "Add", item));
  };

  const remove = (item: T) => {
    let isUpdated = false;
    let previousItemState: T;
    data = data.filter((d) => {
      if (Number(d.id) !== Number(item.id)) {
        return true;
      }
      isUpdated = true;
      previousItemState = { ...d };
      return false;
    });
    if (isUpdated) {
      listners.forEach((listner) =>
        listner(data, item, "Delete", previousItemState)
      );
    }
  };

  const listen = (listner: Listner<T>) => (listners = [...listners, listner]);
  const ignore = (listner: Listner<T>) =>
    (listners = listners.filter((l) => l !== listner));

  return { data, update, add, remove, listen, ignore };
};

export default State;
