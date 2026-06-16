import React, { useEffect } from 'react'
import { createPortal } from 'react-dom';
import { ModalProps } from './Modal.types';
import './Modal.style.css';
import Image from 'next/image';
import { Text } from '../Typography/Typography';

export const Modal = ({ title, isAccent=false, isOpen, onClose, children}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div role='dialog' aria-modal='true' aria-labelledby='modal-title' className="modal-container" onClick={(e) => e.stopPropagation()}>
        <header className={`modal-header ${isAccent ? 'modal-header-accent' : 'modal-header-default'}`}>
          <div className="modal-header-title" id='modal-title'>
            {typeof title === 'string' ? <Text>{title}</Text> : title}
          </div>
          <button
            type='button'
            onClick={onClose}
            aria-label="Закрыть модальное окно"
            className="modal-header-close"
          >
            <Image
              src={isAccent ? "/icons/button-close-accent.svg" : "/icons/button-close.svg"}
              alt=""
              width={14}
              height={14}
            />
          </button>
        </header>

        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
