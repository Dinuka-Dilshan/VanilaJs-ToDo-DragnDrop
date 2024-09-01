import { listenToState, Task } from "./state.js";

export const logger = () => {
  let previousState: Task[] = [];
  let isLoadedFromDb = false;
  listenToState((state) => {
    if (previousState.length === 0 && state.length > 0 && !isLoadedFromDb) {
      console.log("**Loding local DB data**");
      state.forEach((record) =>
        console.log(`${record.id}--[${record.type}]--${record.content}`)
      );
      isLoadedFromDb = true;

      previousState = [...state];
      return;
    }
    if (state.length > previousState.length) {
      //add
      const record = state[state.length - 1];
      console.log("**New Record Added**");
      console.log(`${record.id}--[${record.type}]--${record.content}`);
    }
    if (state.length < previousState.length) {
      //deleted
      const newRecords = state.map((record) => record.id);
      const record = previousState.find(
        (record) => !newRecords.includes(record.id)
      );
      console.log("**Record Deleted**");
      if (record) {
        console.log(`${record.id}--[${record.type}]--${record.content}`);
      }
    }

    if (state.length === previousState.length) {
      //update
      previousState.forEach((previous) => {
        const record = state.find((s) => s.id === previous.id);
        if (!record) {
          return;
        }

        if (record.lastUpdated !== previous.lastUpdated) {
          console.log("**Record Updated**");
          console.log(`${record.id}--[${record.type}]--${record.content}`);
          if (previous.content !== record.content) {
            console.log(`${previous.content}-->${record.content}`);
          }
          if (previous.type !== record.type) {
            console.log(`${previous.type}-->${record.type}`);
          }
        }
      });
    }
    previousState = [...state];
  });
};
