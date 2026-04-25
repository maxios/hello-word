import { useSyncExternalStore } from "react";
import type { ComposedItem } from "../schemas/compose.types";

type Listener = () => void;

const state = {
  items: [] as ComposedItem[],
};
const listeners = new Set<Listener>();
const emit = () => listeners.forEach((l) => l());

export const composeCollection = {
  insertOptimistic(item: ComposedItem) {
    state.items = [item, ...state.items];
    emit();
  },
  replace(tempId: string, real: ComposedItem) {
    state.items = state.items.map((it) => (it.id === tempId ? real : it));
    emit();
  },
  remove(id: string) {
    state.items = state.items.filter((it) => it.id !== id);
    emit();
  },
  getAll(): ComposedItem[] {
    return state.items;
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export const useComposedItems = (): ComposedItem[] =>
  useSyncExternalStore(
    composeCollection.subscribe,
    composeCollection.getAll,
    composeCollection.getAll,
  );
