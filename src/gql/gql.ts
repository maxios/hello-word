/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetMeals($limit: Int, $page: Int) {\n  Meals(limit: $limit, page: $page) {\n    docs {\n      id\n      name\n      calories\n      carbs\n      fat\n      protein\n      cook_time\n      prep_time\n      gluten_free\n      lactose_free\n      nut_free\n      is_quick_meal\n      image {\n        url\n        alt\n        width\n        height\n      }\n      categories {\n        id\n        name\n      }\n      diet_types {\n        id\n        name\n      }\n      createdAt\n      updatedAt\n    }\n    hasNextPage\n    hasPrevPage\n    nextPage\n    page\n    prevPage\n    totalDocs\n    totalPages\n  }\n}\n\nquery GetMeal($id: String!) {\n  Meal(id: $id) {\n    id\n    name\n    calories\n    carbs\n    fat\n    protein\n    cook_time\n    prep_time\n    gluten_free\n    lactose_free\n    nut_free\n    is_quick_meal\n    image {\n      url\n      alt\n      width\n      height\n    }\n    categories {\n      id\n      name\n    }\n    diet_types {\n      id\n      name\n    }\n    ingredients {\n      ... on IngredientBlock {\n        id\n        blockName\n        blockType\n        name\n        amount\n        serving_unit\n      }\n    }\n    method {\n      ... on MealMethodBlock {\n        id\n        blockName\n        blockType\n        step\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}": typeof types.GetMealsDocument,
};
const documents: Documents = {
    "query GetMeals($limit: Int, $page: Int) {\n  Meals(limit: $limit, page: $page) {\n    docs {\n      id\n      name\n      calories\n      carbs\n      fat\n      protein\n      cook_time\n      prep_time\n      gluten_free\n      lactose_free\n      nut_free\n      is_quick_meal\n      image {\n        url\n        alt\n        width\n        height\n      }\n      categories {\n        id\n        name\n      }\n      diet_types {\n        id\n        name\n      }\n      createdAt\n      updatedAt\n    }\n    hasNextPage\n    hasPrevPage\n    nextPage\n    page\n    prevPage\n    totalDocs\n    totalPages\n  }\n}\n\nquery GetMeal($id: String!) {\n  Meal(id: $id) {\n    id\n    name\n    calories\n    carbs\n    fat\n    protein\n    cook_time\n    prep_time\n    gluten_free\n    lactose_free\n    nut_free\n    is_quick_meal\n    image {\n      url\n      alt\n      width\n      height\n    }\n    categories {\n      id\n      name\n    }\n    diet_types {\n      id\n      name\n    }\n    ingredients {\n      ... on IngredientBlock {\n        id\n        blockName\n        blockType\n        name\n        amount\n        serving_unit\n      }\n    }\n    method {\n      ... on MealMethodBlock {\n        id\n        blockName\n        blockType\n        step\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}": types.GetMealsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetMeals($limit: Int, $page: Int) {\n  Meals(limit: $limit, page: $page) {\n    docs {\n      id\n      name\n      calories\n      carbs\n      fat\n      protein\n      cook_time\n      prep_time\n      gluten_free\n      lactose_free\n      nut_free\n      is_quick_meal\n      image {\n        url\n        alt\n        width\n        height\n      }\n      categories {\n        id\n        name\n      }\n      diet_types {\n        id\n        name\n      }\n      createdAt\n      updatedAt\n    }\n    hasNextPage\n    hasPrevPage\n    nextPage\n    page\n    prevPage\n    totalDocs\n    totalPages\n  }\n}\n\nquery GetMeal($id: String!) {\n  Meal(id: $id) {\n    id\n    name\n    calories\n    carbs\n    fat\n    protein\n    cook_time\n    prep_time\n    gluten_free\n    lactose_free\n    nut_free\n    is_quick_meal\n    image {\n      url\n      alt\n      width\n      height\n    }\n    categories {\n      id\n      name\n    }\n    diet_types {\n      id\n      name\n    }\n    ingredients {\n      ... on IngredientBlock {\n        id\n        blockName\n        blockType\n        name\n        amount\n        serving_unit\n      }\n    }\n    method {\n      ... on MealMethodBlock {\n        id\n        blockName\n        blockType\n        step\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}"): (typeof documents)["query GetMeals($limit: Int, $page: Int) {\n  Meals(limit: $limit, page: $page) {\n    docs {\n      id\n      name\n      calories\n      carbs\n      fat\n      protein\n      cook_time\n      prep_time\n      gluten_free\n      lactose_free\n      nut_free\n      is_quick_meal\n      image {\n        url\n        alt\n        width\n        height\n      }\n      categories {\n        id\n        name\n      }\n      diet_types {\n        id\n        name\n      }\n      createdAt\n      updatedAt\n    }\n    hasNextPage\n    hasPrevPage\n    nextPage\n    page\n    prevPage\n    totalDocs\n    totalPages\n  }\n}\n\nquery GetMeal($id: String!) {\n  Meal(id: $id) {\n    id\n    name\n    calories\n    carbs\n    fat\n    protein\n    cook_time\n    prep_time\n    gluten_free\n    lactose_free\n    nut_free\n    is_quick_meal\n    image {\n      url\n      alt\n      width\n      height\n    }\n    categories {\n      id\n      name\n    }\n    diet_types {\n      id\n      name\n    }\n    ingredients {\n      ... on IngredientBlock {\n        id\n        blockName\n        blockType\n        name\n        amount\n        serving_unit\n      }\n    }\n    method {\n      ... on MealMethodBlock {\n        id\n        blockName\n        blockType\n        step\n      }\n    }\n    createdAt\n    updatedAt\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;