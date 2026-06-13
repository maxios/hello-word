import { template } from '../../../shared/utils/content';

const content = {
  heading: 'Catalog',
  loadError: 'Could not load the catalog.',
  retry: 'Retry',
  itemSummary: template<'count'>(`{count} items · loaded from Countries GraphQL`),
} as const satisfies Record<string, unknown>;

export default content;
