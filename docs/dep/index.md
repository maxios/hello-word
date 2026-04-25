---
dep:
  type: reference
  audience: [new-dev, ui-dev, integrator, release-eng]
  owner: "@dep-core"
  created: 2026-03-22
  last_verified: 2026-04-22T18:11:06.096Z
  confidence: high
  depends_on: [.docspec]
  tags: [navigation, root, index]
  links: []
---

# flota — Documentation Root

> Opinionated Expo + Yoga GraphQL starter that doubles as a living reference for the stack: NativeWind, Expo Router, graphql-request + codegen, React Cosmos, and a UI-as-API micro-product architecture.

---

## By Audience

### New feature developer

**Entry point**: [entry-new-feature-developer.md](explanation/entry-new-feature-developer.md)

- [Why Micro-Product Methodology](explanation/micro-product-methodology.md)
- [Why UI-as-API Layering](explanation/ui-as-api-layering.md)
- [Entry Point — New Feature Developer](explanation/entry-new-feature-developer.md)
- [How To — Write A Mapper For A UI Schema](how-to/write-a-mapper-for-a-ui-schema.md)
- [How To — Add A New UI Component](how-to/add-a-new-ui-component.md)
- [How To — Wire A GraphQL Operation Into A Feature](how-to/wire-graphql-operation-into-a-feature.md)
- [How To — Add A Cosmos Fixture For A Feature Component](how-to/add-a-cosmos-fixture-for-a-feature-component.md)
- [How To — Write A Cosmos Playground Fixture](how-to/write-a-cosmos-playground-fixture.md)
- [How To — Add A GraphQL Operation And Regenerate Types](how-to/add-a-graphql-operation-and-regenerate-types.md)
- [Tutorial — Wire Query → Mapper → Service → Hook End-To-End](tutorials/wire-query-mapper-collection-hook-end-to-end.md)
- [Tutorial — Scaffold Your First Feature](tutorials/scaffold-your-first-feature.md)
- [DR-001: Migrate Styling From Tamagui To NativeWind](decision-records/dr-001-tamagui-to-nativewind.md)
- [DR-003: Use Yoga GraphQL Via `graphql-request` (Not Apollo or urql)](decision-records/dr-003-yoga-graphql-request-over-apollo.md)
- [Collection / Service Interface Reference](reference/collection-service-interface.md)
- [Feature Directory Structure](reference/feature-directory-structure.md)
- [Design Tokens Reference](reference/design-tokens.md)

### UI / component developer

**Entry point**: [entry-ui-component-developer.md](explanation/entry-ui-component-developer.md)

- [Why Micro-Product Methodology](explanation/micro-product-methodology.md)
- [Entry Point — UI / Component Developer](explanation/entry-ui-component-developer.md)
- [Why UI-as-API Layering](explanation/ui-as-api-layering.md)
- [How To — Add A New UI Component](how-to/add-a-new-ui-component.md)
- [How To — Add A Cosmos Fixture For A Feature Component](how-to/add-a-cosmos-fixture-for-a-feature-component.md)
- [How To — Write A Cosmos Playground Fixture](how-to/write-a-cosmos-playground-fixture.md)
- [DR-001: Migrate Styling From Tamagui To NativeWind](decision-records/dr-001-tamagui-to-nativewind.md)
- [Feature Directory Structure](reference/feature-directory-structure.md)
- [Design Tokens Reference](reference/design-tokens.md)

### API / data integrator

**Entry point**: [entry-api-integrator.md](explanation/entry-api-integrator.md)

- [Entry Point — API / Data Integrator](explanation/entry-api-integrator.md)
- [Why Micro-Product Methodology](explanation/micro-product-methodology.md)
- [Why UI-as-API Layering](explanation/ui-as-api-layering.md)
- [How To — Write A Mapper For A UI Schema](how-to/write-a-mapper-for-a-ui-schema.md)
- [How To — Wire A GraphQL Operation Into A Feature](how-to/wire-graphql-operation-into-a-feature.md)
- [How To — Add A GraphQL Operation And Regenerate Types](how-to/add-a-graphql-operation-and-regenerate-types.md)
- [Tutorial — Wire Query → Mapper → Service → Hook End-To-End](tutorials/wire-query-mapper-collection-hook-end-to-end.md)
- [DR-003: Use Yoga GraphQL Via `graphql-request` (Not Apollo or urql)](decision-records/dr-003-yoga-graphql-request-over-apollo.md)
- [Collection / Service Interface Reference](reference/collection-service-interface.md)
- [Feature Directory Structure](reference/feature-directory-structure.md)

### Release engineer

**Entry point**: [entry-release-engineer.md](explanation/entry-release-engineer.md)

- [Why Micro-Product Methodology](explanation/micro-product-methodology.md)
- [Entry Point — Release Engineer](explanation/entry-release-engineer.md)
- [How To — Cut A Production Native Build And Submit To Stores](how-to/cut-a-production-native-build.md)
- [How To — Ship A Staging OTA Update](how-to/ship-a-staging-ota-update.md)
- [DR-002: Current EAS Profile And Channel Split](decision-records/dr-002-eas-profile-channel-split.md)
- [EAS Profiles Reference](reference/eas-profiles.md)

---

## By Type

### Explanation

- [Entry Point — API / Data Integrator](explanation/entry-api-integrator.md)
- [Why Micro-Product Methodology](explanation/micro-product-methodology.md)
- [Entry Point — UI / Component Developer](explanation/entry-ui-component-developer.md)
- [Why UI-as-API Layering](explanation/ui-as-api-layering.md)
- [Entry Point — New Feature Developer](explanation/entry-new-feature-developer.md)
- [Entry Point — Release Engineer](explanation/entry-release-engineer.md)

### How To

- [How To — Cut A Production Native Build And Submit To Stores](how-to/cut-a-production-native-build.md)
- [How To — Write A Mapper For A UI Schema](how-to/write-a-mapper-for-a-ui-schema.md)
- [How To — Add A New UI Component](how-to/add-a-new-ui-component.md)
- [How To — Wire A GraphQL Operation Into A Feature](how-to/wire-graphql-operation-into-a-feature.md)
- [How To — Add A Cosmos Fixture For A Feature Component](how-to/add-a-cosmos-fixture-for-a-feature-component.md)
- [How To — Write A Cosmos Playground Fixture](how-to/write-a-cosmos-playground-fixture.md)
- [How To — Add A GraphQL Operation And Regenerate Types](how-to/add-a-graphql-operation-and-regenerate-types.md)
- [How To — Ship A Staging OTA Update](how-to/ship-a-staging-ota-update.md)

### Tutorial

- [Tutorial — Wire Query → Mapper → Service → Hook End-To-End](tutorials/wire-query-mapper-collection-hook-end-to-end.md)
- [Tutorial — Scaffold Your First Feature](tutorials/scaffold-your-first-feature.md)

### Decision Record

- [DR-002: Current EAS Profile And Channel Split](decision-records/dr-002-eas-profile-channel-split.md)
- [DR-001: Migrate Styling From Tamagui To NativeWind](decision-records/dr-001-tamagui-to-nativewind.md)
- [DR-003: Use Yoga GraphQL Via `graphql-request` (Not Apollo or urql)](decision-records/dr-003-yoga-graphql-request-over-apollo.md)

### Reference

- [Collection / Service Interface Reference](reference/collection-service-interface.md)
- [Feature Directory Structure](reference/feature-directory-structure.md)
- [Design Tokens Reference](reference/design-tokens.md)
- [EAS Profiles Reference](reference/eas-profiles.md)
