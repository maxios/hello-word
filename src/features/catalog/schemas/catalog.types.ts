/**
 * UI schemas for the catalog feature.
 *
 * These types are the contract the UI renders against. They intentionally do
 * NOT mirror the GraphQL shape one-to-one — the mapper layer sits in between
 * so that the UI stays stable if the API changes.
 */

export interface ContinentSummary {
  code: string;
  name: string;
}

export interface LanguageSummary {
  code: string;
  name: string;
  nativeName: string;
}

/**
 * Shape consumed by the list screen. Keep this minimal — just what renders.
 */
export interface CatalogListItem {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
  continent: string;
}

/**
 * Shape consumed by the detail screen. Includes richer fields that the list
 * doesn't need — the mapper pulls these from the detail GraphQL query.
 */
export interface CatalogDetail {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
  capital: string | null;
  currency: string | null;
  phoneCode: string;
  continent: ContinentSummary;
  languages: LanguageSummary[];
  states: { code: string | null; name: string }[];
}
