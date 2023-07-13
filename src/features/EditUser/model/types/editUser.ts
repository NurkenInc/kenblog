import { FormField } from '@/shared/libs/types/form/types';

export type EditUserFields = FormField<'name' | 'description' | 'linkedInUrl' | 'githubUrl' | 'telegramUrl'>[];