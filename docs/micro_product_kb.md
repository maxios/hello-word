# Micro-Product Development Strategy Knowledge Base

## Overview

This document outlines a systematic approach for AI agents to assist in software development through a micro-product methodology. The strategy involves reverse-engineering existing applications to establish architectural patterns, then replicating those patterns to build new features efficiently.

## Core Philosophy

**Micro-Product Definition**: A complete, self-contained feature that includes all necessary layers - UI/UX, business logic, data management, testing, documentation, and integration patterns. Think of it as a "vertical slice" that demonstrates the full application architecture in miniature.

**AI-Assisted Scaling**: Once one micro-product is perfectly implemented, AI agents can replicate the established patterns to build additional features with consistent quality and architecture.

## Phase 1: Product Analysis & Selection

### Step 1.1: Choose Target Application

**Criteria for Selection:**

- **Open Source Preferred**: Full codebase access enables complete analysis
- **Modern Tech Stack**: Recent frameworks and tools that align with current best practices
- **Production Quality**: Real-world applications with proven patterns
- **Appropriate Complexity**: Not too simple (todo apps) or too complex (enterprise systems)

**Recommended Targets:**

- E-commerce platforms (Shopify-like)
- Social media applications (Twitter-like)
- Productivity tools (Notion-like)
- Developer tools (GitHub-like)

### Step 1.2: Stack Analysis Using Claude Code

**Analysis Checklist:**

```bash
# Directory structure analysis
find . -type f -name "*.json" | head -20
find . -type d -maxdepth 3 | head -30

# Package.json examination
cat package.json | jq '.dependencies, .devDependencies'

# Framework identification
ls -la | grep -E "(next|react|vue|angular|svelte)"

# Build system analysis
ls -la | grep -E "(vite|webpack|rollup|esbuild)"
```

**Documentation Requirements:**

- Framework and version
- State management solution
- Testing framework and patterns
- Build and deployment tools
- Code organization conventions
- Naming patterns
- Import/export strategies

## Phase 2: Feature Identification & Isolation

### Step 2.1: Feature Selection Criteria

**Ideal Micro-Product Features:**

- **Bounded Scope**: Clear input/output boundaries
- **Representative Patterns**: Uses common architectural patterns
- **Moderate Complexity**: Not trivial, but not overwhelming
- **Standalone Value**: Provides meaningful user value independently

**Examples by Application Type:**

- **E-commerce**: Product search and filtering
- **Social Media**: User profile management
- **Productivity**: Document creation and editing
- **Developer Tools**: Repository browsing

### Step 2.2: Feature Boundary Analysis

**Questions to Answer:**

- What are the entry and exit points?
- What external dependencies exist?
- What shared state is required?
- What APIs or services are consumed?
- What events are emitted or consumed?

## Phase 3: Micro-Product Implementation

### Step 3.1: Completeness Checklist

Create a standardized checklist for every micro-product:

**Frontend Components:**

- [ ] Main component implementation
- [ ] Subcomponents and utilities
- [ ] Styling (CSS/styled-components/Tailwind)
- [ ] Responsive design considerations
- [ ] Accessibility features (ARIA, keyboard navigation)
- [ ] Loading and error states
- [ ] Empty states and edge cases

**State Management:**

- [ ] Local component state
- [ ] Global state integration
- [ ] Async state handling
- [ ] Cache management
- [ ] Optimistic updates

**Data Layer:**

- [ ] API integration
- [ ] Request/response typing
- [ ] Error handling
- [ ] Retry logic
- [ ] Data validation
- [ ] Serialization/deserialization

**Business Logic:**

- [ ] Core feature logic
- [ ] Validation rules
- [ ] Business constraints
- [ ] Side effects handling

**Testing:**

- [ ] Unit tests for utilities and hooks
- [ ] Component tests
- [ ] Integration tests
- [ ] End-to-end test scenarios
- [ ] Error boundary tests
- [ ] Performance tests

**Documentation:**

- [ ] Feature overview
- [ ] API documentation
- [ ] Component documentation
- [ ] Usage examples
- [ ] Architecture decisions

### Step 3.2: Implementation Standards

**File Organization Pattern:**

```
feature-name/
├── components/
│   ├── FeatureName.tsx
│   ├── FeatureName.test.tsx
│   ├── FeatureName.stories.tsx
│   └── subcomponents/
├── hooks/
│   ├── useFeatureName.ts
│   └── useFeatureName.test.ts
├── services/
│   ├── featureNameApi.ts
│   └── featureNameApi.test.ts
├── types/
│   └── featureName.types.ts
├── utils/
│   ├── featureNameUtils.ts
│   └── featureNameUtils.test.ts
├── __tests__/
│   └── FeatureName.integration.test.tsx
└── README.md
```

or

```
app/_layout.tsx <--- Expo app routes
src/
├── shared/
│   ├── services/
│   │   ├── api/
│   │   │   ├── httpClient.ts
│   │   │   ├── authService.ts
│   │   │   └── baseService.ts
│   │   ├── storage/
│   │   └── validation/
│   ├── components/
│   │   ├── ui/
│   │   └── layout/
│   ├── hooks/
│   ├── utils/
│   ├── types/
│   └── constants/
├── features/
│   ├── feature-a/
│   ├── feature-b/
│   └── feature-c/
└── app/
    ├── store/
    ├── providers/
    └── config/
```

**Naming Conventions:**

- Use consistent naming patterns across all files
- Follow the existing project conventions
- Use descriptive, self-documenting names
- Maintain consistency in verb tenses and terminology

## Phase 4: Validation & Testing

### Step 4.1: Feature Validation

**Manual Testing Checklist:**

- [ ] Happy path functionality
- [ ] Error scenarios
- [ ] Edge cases
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility compliance
- [ ] Performance benchmarks

**Automated Testing Requirements:**

- [ ] All tests pass
- [ ] Code coverage meets threshold (recommend 80%+)
- [ ] No console errors or warnings
- [ ] Performance metrics within acceptable ranges
- [ ] Security scans pass

### Step 4.2: Integration Verification

- [ ] Feature integrates cleanly with existing application
- [ ] No breaking changes to existing functionality
- [ ] Shared dependencies work correctly
- [ ] Global state remains consistent
- [ ] Navigation and routing work properly

## Phase 5: Prompt Generation & Documentation

### Step 5.1: Pattern Documentation

**Architecture Decision Records (ADRs):**
Document key decisions made during implementation:

- State management approach and rationale
- Component composition patterns
- API integration strategies
- Testing strategies
- Performance optimization techniques
- Error handling patterns

**Code Pattern Documentation:**

- File structure templates
- Component templates
- Hook templates
- Service templates
- Test templates

### Step 5.2: AI Replication Prompts

**Master Prompt Template:**

```
# Micro-Product Replication Request

## Reference Implementation
Feature: [Original Feature Name]
Location: [File paths to reference implementation]

## New Feature Requirements
Feature: [New Feature Name]
Description: [Detailed feature description]
Acceptance Criteria: [List of requirements]

## Replication Instructions
1. Follow the exact file structure pattern from the reference implementation
2. Maintain the same architectural patterns:
   - [State management approach]
   - [Component composition style]
   - [API integration pattern]
   - [Testing strategy]
3. Adapt the following elements for the new feature:
   - [Specific adaptations needed]
4. Ensure complete implementation including:
   - [Reference completeness checklist]

## Quality Gates
- All tests must pass
- Code coverage must meet [X]% threshold
- Performance benchmarks must be within [X]ms
- No accessibility violations
- Follows established naming conventions

## Dependencies
- [List any new dependencies needed]
- [List any shared utilities to reuse]
```

### Step 5.3: Continuous Improvement Process

**After Each Replication:**

- Review generated code quality
- Update patterns based on learnings
- Refine prompts for better outcomes
- Update documentation and templates
- Expand the pattern library

## Success Metrics

**Quality Indicators:**

- Time reduction for new feature development
- Consistency across micro-products
- Test coverage maintenance
- Performance consistency
- Code review efficiency

**Scaling Indicators:**

- Number of features successfully replicated
- Reduction in bugs and rework
- Team velocity improvements
- Documentation quality and completeness

## Common Pitfalls & Solutions

**Over-Engineering First Micro-Product:**

- Start simple, add complexity gradually
- Focus on representative patterns, not comprehensive features

**Insufficient Documentation:**

- Document decisions, not just code
- Include context and rationale
- Update documentation as patterns evolve

**Rigid Pattern Following:**

- Allow for reasonable adaptations
- Update base patterns when better approaches emerge
- Balance consistency with innovation

**Testing Neglect:**

- Make testing part of the definition of "complete"
- Include tests in replication prompts
- Maintain test quality standards

## Next Steps

1. **Select Target Application**: Choose an existing application for analysis
2. **Conduct Stack Analysis**: Use Claude Code to understand the architecture
3. **Identify Shared Services**: Map out common patterns and shared concerns
4. **Setup Shared Foundation**: Implement base shared services and components
5. **Identify First Feature**: Select an appropriate micro-product candidate
6. **Implement Complete Feature**: Build the reference implementation using shared services
7. **Document Patterns**: Create comprehensive documentation including shared service usage
8. **Test Replication**: Generate prompts and test with AI agents
9. **Iterate and Improve**: Refine based on results and extract new shared services as needed

---

_This knowledge base should be updated regularly based on implementation experience, emerging best practices, and the evolution of shared services._
