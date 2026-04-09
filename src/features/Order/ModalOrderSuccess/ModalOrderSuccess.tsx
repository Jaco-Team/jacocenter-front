import './ModalOrderSuccess.styles.css';
import { Modal } from '@/shared/ui/Modal/Modal';
import { IModalOrderSuccessProps } from './ModalOrderSuccess.types';
import Image from 'next/image';
import { Text } from '@/shared/ui/Typography/Typography';
import { Button } from '@/shared/ui/Button/Button';

export const ModalOrderSuccess = ({
  isOpen,
  onClose,
}: IModalOrderSuccessProps) => {
  return (
    <Modal
      title={'Подтверждение заказа'}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='content'>
        <div className='info'>
          <Image
            src='/icons/checkmark-success.svg'
            alt='Успех'
            width={24}
            height={24}
          />
          <Text variant='heading-l-regular-20'>
            Заказ успешно оформлен!
          </Text>
        </div>
        <Button
          variant='base'
          theme='primary'
          size='md'
          onClick={onClose}
        >
          <Text variant='body-m-medium-16'>Хорошо</Text>
        </Button>
      </div>
    </Modal>
  );
};