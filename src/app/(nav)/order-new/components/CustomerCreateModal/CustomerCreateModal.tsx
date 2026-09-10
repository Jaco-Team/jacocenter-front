import { useState } from 'react';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { Modal } from '@/shared/ui/Modal/Modal';
import { customerApi } from '@/entities/customer/api/customerApi';
import type { CustomerCreateInput, CustomerCreateResult } from '@/entities/customer/model/types';
import './CustomerCreateModal.styles.css';

type Props = {
  phone: string;
  isOpen: boolean;
  onClose: () => void;
  onCreated: (result: CustomerCreateResult) => void;
};

export const CustomerCreateModal = ({ phone, isOpen, onClose, onCreated }: Props) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setName(''); setSurname(''); setGender(''); setBirthDate(''); setError(null); setSaving(false);
  };

  const close = () => { if (!saving) { reset(); onClose(); } };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedName = name.trim();
    if (!normalizedName) { setError('Укажите имя клиента'); return; }
    setSaving(true); setError(null);
    const input: CustomerCreateInput = { phone, name: normalizedName };
    if (surname.trim()) input.surname = surname.trim();
    if (gender.trim()) input.gender = gender.trim();
    if (birthDate) input.birthDate = birthDate;
    try {
      const result = await customerApi.create(input);
      reset(); onCreated(result);
    } catch (reason) {
      setSaving(false);
      setError(reason instanceof Error ? reason.message : 'Не удалось сохранить клиента');
    }
  };

  return (
    <Modal title="Добавить клиента" isOpen={isOpen} onClose={close}>
      <form className="customer-create-modal" onSubmit={submit}>
        <p className="customer-create-modal__phone">Телефон: {phone}</p>
        <Input label="Имя" value={name} onChange={(event) => setName(event.target.value)} required autoFocus disabled={saving} error={error ?? undefined} />
        <Input label="Фамилия" value={surname} onChange={(event) => setSurname(event.target.value)} disabled={saving} />
        <Input label="Пол" value={gender} onChange={(event) => setGender(event.target.value)} disabled={saving} />
        <Input label="Дата рождения" type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} disabled={saving} />
        {error && <div className="customer-create-modal__error" role="alert">{error}</div>}
        <div className="customer-create-modal__actions">
          <Button type="button" variant="base" theme="secondary" onClick={close} disabled={saving}>Отмена</Button>
          <Button type="submit" variant="base" theme="primary" disabled={saving}>{saving ? 'Сохраняем…' : 'Сохранить'}</Button>
        </div>
      </form>
    </Modal>
  );
};
