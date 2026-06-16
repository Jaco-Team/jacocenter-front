import { Button } from '@/shared/ui/Button/Button';
import { Modal } from '@/shared/ui/Modal/Modal';
import { Text } from '@/shared/ui/Typography/Typography';

export const ModalAccessDenied = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <Modal
      title={'Ошибка входа'}
      isOpen={isOpen}
      onClose={onClose}
      isAccent
    >
      <div className='w-[392px] h-[120px] flex flex-col gap-6 items-center justify-center'>
        <Text className='whitespace-pre-line text-center !leading-6 text-text-secondary'>
          {`У вас нет доступа.\nОбратитесь к администратору.`}
        </Text>
        <Button
          variant='base'
          theme='primary'
          size='md'
          onClick={onClose}
        >
          <Text variant='body-m-medium-16'>Закрыть</Text>
        </Button>
      </div>
    </Modal>
  );
}