import { template } from '../../../shared/utils/content';

const content = {
  heading: 'Compose',
  subtext: 'Every field component, composed. Submits to a local mock with optimistic updates + server-error mapping.',

  nameLabel: 'Name',
  namePlaceholder: 'Short, descriptive title',
  descriptionLabel: 'Description',
  descriptionPlaceholder: "What's this about?",
  contactEmailLabel: 'Contact email',
  emailCheckingHint: 'Checking availability…',
  emailHelperHint: "Try an email containing 'taken' to trigger async validation.",
  categoryLabel: 'Category',
  priorityLabel: 'Priority',
  dueDateLabel: 'Due date',
  isPublicLabel: 'Make it public',
  acceptTermsLabel: 'I accept the flota demo terms',
  acceptTermsError: 'You must accept the terms.',
  emailTakenError: 'That email address is already in use.',

  submitLabel: 'Submit',
  submittingLabel: 'Submitting…',

  submittedTitle: template<'count'>('Submitted items ({count})'),
  emptyState: 'Nothing here yet. Optimistic items appear instantly; a failed server call rolls them back.',
  publicBadge: ' · public',
  removeAction: 'remove',

  categoryGeneral: 'General',
  categoryBug: 'Bug report',
  categoryFeature: 'Feature request',
  categoryFeedback: 'Feedback',

  priorityLow: 'Low',
  priorityMedium: 'Medium',
  priorityHigh: 'High',
} as const satisfies Record<string, unknown>;

export default content;
