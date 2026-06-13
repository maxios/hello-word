import { template } from '../../../shared/utils/content';

const content = {
  loadError: 'Could not load this item.',
  retry: 'Retry',
  back: '← Back',
  capitalLabel: 'Capital',
  currencyLabel: 'Currency',
  phoneCodeLabel: 'Phone code',
  continentLabel: 'Continent',
  languagesTitle: 'Languages',
  statesTitle: template<'count'>('States · {count}'),
  emptyValue: '—',
} as const satisfies Record<string, unknown>;

export default content;
