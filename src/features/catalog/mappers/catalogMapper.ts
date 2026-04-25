/**
 * Mapper layer: transforms API shapes into UI shapes.
 *
 * Mappers are pure functions so they are trivial to unit-test. Put every
 * "get field X from the response" decision here — UI components should never
 * touch raw GraphQL data.
 */

import type {
  GetCountriesQuery,
  GetCountryQuery,
} from "@/gql/graphql";
import type { CatalogDetail, CatalogListItem } from "../schemas/catalog.types";

type CountryListApi = GetCountriesQuery["countries"][number];
type CountryDetailApi = NonNullable<GetCountryQuery["country"]>;

export const mapCountryToListItem = (
  country: CountryListApi,
): CatalogListItem => ({
  code: country.code,
  name: country.name,
  flag: country.emoji,
  nativeName: country.native,
  continent: country.continent.name,
});

export const mapCountriesToListItems = (
  countries: readonly CountryListApi[],
): CatalogListItem[] => countries.map(mapCountryToListItem);

export const mapCountryToDetail = (
  country: CountryDetailApi,
): CatalogDetail => ({
  code: country.code,
  name: country.name,
  flag: country.emoji,
  nativeName: country.native,
  capital: country.capital ?? null,
  currency: country.currency ?? null,
  phoneCode: country.phone,
  continent: {
    code: country.continent.code,
    name: country.continent.name,
  },
  languages: country.languages.map((lang) => ({
    code: lang.code,
    name: lang.name,
    nativeName: lang.native,
  })),
  states: country.states.map((state) => ({
    code: state.code ?? null,
    name: state.name,
  })),
});
