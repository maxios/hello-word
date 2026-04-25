import {
  mapCountriesToListItems,
  mapCountryToDetail,
  mapCountryToListItem,
} from "../mappers/catalogMapper";

describe("catalogMapper", () => {
  const apiCountry = {
    code: "CA",
    name: "Canada",
    emoji: "🇨🇦",
    native: "Canada",
    capital: "Ottawa",
    currency: "CAD",
    phone: "1",
    continent: { code: "NA", name: "North America" },
  } as const;

  describe("mapCountryToListItem", () => {
    it("projects the list shape", () => {
      const item = mapCountryToListItem(apiCountry);
      expect(item).toEqual({
        code: "CA",
        name: "Canada",
        flag: "🇨🇦",
        nativeName: "Canada",
        continent: "North America",
      });
    });
  });

  describe("mapCountriesToListItems", () => {
    it("maps an array", () => {
      const items = mapCountriesToListItems([apiCountry]);
      expect(items).toHaveLength(1);
      expect(items[0].code).toBe("CA");
    });

    it("returns an empty array when given an empty array", () => {
      expect(mapCountriesToListItems([])).toEqual([]);
    });
  });

  describe("mapCountryToDetail", () => {
    it("fills nullable fields with null", () => {
      const detail = mapCountryToDetail({
        ...apiCountry,
        capital: null,
        currency: null,
        languages: [],
        states: [],
      });
      expect(detail.capital).toBeNull();
      expect(detail.currency).toBeNull();
      expect(detail.languages).toEqual([]);
      expect(detail.states).toEqual([]);
    });

    it("maps languages and states through", () => {
      const detail = mapCountryToDetail({
        ...apiCountry,
        languages: [{ code: "en", name: "English", native: "English" }],
        states: [
          { code: "ON", name: "Ontario" },
          { code: null, name: "Yukon" },
        ],
      });
      expect(detail.languages).toEqual([
        { code: "en", name: "English", nativeName: "English" },
      ]);
      expect(detail.states).toEqual([
        { code: "ON", name: "Ontario" },
        { code: null, name: "Yukon" },
      ]);
    });
  });
});
