/**
 * Collections layer: a thin in-memory normalised store that lives alongside
 * react-query's cache.
 *
 * Why have this on top of react-query? Two reasons:
 *   1. When you have many screens referencing the same entity (e.g. a list
 *      and a detail both talking about Canada), you want one canonical copy.
 *   2. When mutations happen, you can update the collection once and every
 *      subscriber re-renders with the new data.
 *
 * This example uses a tiny zustand-free pub/sub implementation so nothing new
 * needs to be installed. For production, swap in zustand, valtio, or Normy.
 */

import { useSyncExternalStore } from "react";
import type { CatalogDetail, CatalogListItem } from "../schemas/catalog.types";

type Listener = () => void;

interface CountryCollectionState {
  list: Record<string, CatalogListItem>;
  detail: Record<string, CatalogDetail>;
  orderedCodes: string[];
}

const state: CountryCollectionState = {
  list: {},
  detail: {},
  orderedCodes: [],
};

const listeners = new Set<Listener>();

// Cached snapshots for useSyncExternalStore (must return stable references)
let cachedList: CatalogListItem[] = [];
let cachedDetail: Record<string, CatalogDetail | null> = {};

const rebuildCache = () => {
  cachedList = state.orderedCodes
    .map((code) => state.list[code])
    .filter((item): item is CatalogListItem => Boolean(item));
  cachedDetail = { ...state.detail };
};

const emit = () => {
  rebuildCache();
  listeners.forEach((l) => l());
};

export const countryCollection = {
  upsertList(items: CatalogListItem[]) {
    state.orderedCodes = items.map((i) => i.code);
    for (const item of items) {
      state.list[item.code] = item;
    }
    emit();
  },
  upsertDetail(detail: CatalogDetail) {
    state.detail[detail.code] = detail;
    // Keep list and detail consistent: sync the summary fields too.
    state.list[detail.code] = {
      code: detail.code,
      name: detail.name,
      flag: detail.flag,
      nativeName: detail.nativeName,
      continent: detail.continent.name,
    };
    emit();
  },
  getList(): CatalogListItem[] {
    return cachedList;
  },
  getDetail(code: string): CatalogDetail | null {
    return cachedDetail[code] ?? null;
  },
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export const useCountryList = (): CatalogListItem[] =>
  useSyncExternalStore(
    countryCollection.subscribe,
    countryCollection.getList,
    countryCollection.getList,
  );

export const useCountryDetail = (code: string): CatalogDetail | null => {
  return useSyncExternalStore(
    countryCollection.subscribe,
    () => countryCollection.getDetail(code),
    () => countryCollection.getDetail(code),
  );
};
