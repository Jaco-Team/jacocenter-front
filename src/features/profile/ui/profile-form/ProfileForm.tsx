'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { authApi } from '@/entities/auth/api/authApi';
import type { AuthUser } from '@/entities/auth/model/types';
import { useSessionStore } from '@/entities/auth/store/sessionStore/sessionStore';
import { ProfileAvatar } from '@/entities/auth/ui/profile-avatar/ProfileAvatar';
import { ApiError } from '@/shared/api/http';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Text, Title } from '@/shared/ui/Typography/Typography';
import {
  normalizeProfileValues,
  ProfileFormErrors,
  ProfileFormValues,
  validateProfileValues,
} from '../../model/profile-form';
import './ProfileForm.styles.css';

type ProfileFormProps = {
  saveProfile?: typeof authApi.updateProfile;
};

function formatProfileDate(value?: string | null): string {
  if (!value) return 'Не указано';
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('ru-RU');
}

function ProfileInfo({ icon, label, value }: { icon: string; label: string; value?: string | null }) {
  return (
    <div className="profile-form__info-item">
      <Image src={icon} alt="" width={20} height={20} />
      <div>
        <Text variant="label-s-regular-12" className="profile-form__info-label">{label}</Text>
        <Text className="profile-form__info-value">{value || 'Не указано'}</Text>
      </div>
    </div>
  );
}

export function ProfileForm({ saveProfile = authApi.updateProfile }: ProfileFormProps) {
  const user = useSessionStore((state) => state.user);
  const setUser = useSessionStore((state) => state.setUser);

  if (!user) {
    return <Text className="profile-form__state">Загрузка профиля…</Text>;
  }

  return (
    <ProfileFormEditor
      key={user.id}
      user={user}
      setUser={setUser}
      saveProfile={saveProfile}
    />
  );
}

type ProfileFormEditorProps = {
  user: AuthUser;
  setUser: (user: AuthUser) => void;
  saveProfile: typeof authApi.updateProfile;
};

function ProfileFormEditor({ user, setUser, saveProfile }: ProfileFormEditorProps) {
  const [values, setValues] = useState<ProfileFormValues>({
    fullName: user.fullName,
    shortName: user.shortName,
  });
  const [errors, setErrors] = useState<ProfileFormErrors>({});
  const [requestError, setRequestError] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setValues({ fullName: user.fullName, shortName: user.shortName });
    setErrors({});
    setRequestError('');
    setSaved(false);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalized = normalizeProfileValues(values);
    const validationErrors = validateProfileValues(normalized);
    setErrors(validationErrors);
    setRequestError('');
    setSaved(false);
    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      const result = await saveProfile(normalized);
      setUser(result.user);
      setValues({ fullName: result.user.fullName, shortName: result.user.shortName });
      setSaved(true);
    } catch (error) {
      if (error instanceof ApiError) {
        setErrors({
          fullName: error.errors?.full_name?.[0],
          shortName: error.errors?.short_name?.[0],
        });
      }
      setRequestError(error instanceof Error ? error.message : 'Не удалось сохранить профиль');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="profile-form">
      <header className="profile-form__header">
        <ProfileAvatar user={user} size="lg" />
        <div className="profile-form__identity">
          <Title Tag="h1" variant="body-l-medium-20">{user.fullName || user.name}</Title>
          <Text className="profile-form__description">{user.shortName || 'Оператор контакт-центра'}</Text>
          <Text variant="label-s-regular-12" className="profile-form__login">@{user.login}</Text>
        </div>
      </header>

      <div className="profile-form__info">
        <ProfileInfo icon="/icons/clients.svg" label="Имя" value={user.firstName} />
        <ProfileInfo icon="/icons/clients.svg" label="Фамилия" value={user.lastName} />
        <ProfileInfo icon="/icons/clients.svg" label="Отчество" value={user.middleName} />
        <ProfileInfo icon="/icons/calendar.svg" label="Дата рождения" value={formatProfileDate(user.birthday)} />
        <ProfileInfo icon="/icons/calendar.svg" label="Дата регистрации" value={formatProfileDate(user.registeredAt)} />
      </div>

      <form className="profile-form__fields" onSubmit={submit}>
        <Title variant="heading-l-regular-20">Редактирование профиля</Title>
        <Input
          label="Логин"
          value={user.login}
          style={{maxWidth: '450px', display: 'flex', flexDirection: 'column'}}
          onChange={() => undefined}
          disabled
        />
        <Input
          label="Полное имя"
          value={values.fullName}
          onChange={(event) => setValues((current) => ({ ...current, fullName: event.target.value }))}
          error={errors.fullName}
          maxLength={120}
          style={{maxWidth: '450px', display: 'flex', flexDirection: 'column'}}
          autoComplete="name"
        />
        <Input
          label="Короткое имя"
          value={values.shortName}
          onChange={(event) => setValues((current) => ({ ...current, shortName: event.target.value }))}
          error={errors.shortName}
          style={{maxWidth: '450px', display: 'flex', flexDirection: 'column'}}
          helperText={saved ? 'Данные сохранены' : undefined}
          maxLength={120}
        />

        {requestError ? <Text className="profile-form__error" role="alert">{requestError}</Text> : null}

        <div className="profile-form__actions">
          <Button variant="base" theme="primary" size="md" type="submit" disabled={saving}>
            {saving ? 'Сохраняем…' : 'Сохранить'}
          </Button>
          <Button variant="base" theme="secondary" size="md" type="button" onClick={reset} disabled={saving}>
            Отменить
          </Button>
        </div>
      </form>
    </section>
  );
}
