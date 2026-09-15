export type ProfileFormValues = {
  fullName: string;
  shortName: string;
};

export type ProfileFormErrors = Partial<Record<keyof ProfileFormValues, string>>;

export function normalizeProfileValues(values: ProfileFormValues): ProfileFormValues {
  return {
    fullName: values.fullName.trim(),
    shortName: values.shortName.trim(),
  };
}

export function validateProfileValues(values: ProfileFormValues): ProfileFormErrors {
  const normalized = normalizeProfileValues(values);
  const errors: ProfileFormErrors = {};

  if (!normalized.fullName) {
    errors.fullName = 'Укажите полное имя';
  } else if (normalized.fullName.length > 120) {
    errors.fullName = 'Полное имя не должно превышать 120 символов';
  }

  if (normalized.shortName.length > 120) {
    errors.shortName = 'Короткое имя не должно превышать 120 символов';
  }

  return errors;
}
