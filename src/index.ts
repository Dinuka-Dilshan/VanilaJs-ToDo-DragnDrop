import { onDropChange } from "./DaragnDropHandlar.js";
import { onInputChange } from "./InputHandlar.js";
import { getCache, setCache } from "./LocalCache.js";
import { renderer } from "./Renderer.js";
import State from "./State.js";
import { Task } from "./types.js";

const { add, data, listen, update, remove } = State<Task>(getCache());
const { initRenderer, reRenderer } = renderer();

initRenderer(data, remove);

listen((state, affectedItem, stateChangeType, affectedItemPreviousState) => {
  reRenderer(affectedItem, stateChangeType, affectedItemPreviousState, remove); //screen update
  setCache(state); //cache update
});

onDropChange((droppedItem) => {
  update(droppedItem);
});

onInputChange((data) => add({ ...data, id: Date.now() }));
