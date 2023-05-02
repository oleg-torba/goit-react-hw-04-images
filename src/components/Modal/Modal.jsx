import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import ModalCss from './ModalCss.module.css';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ children, onClose }) {
  useEffect(() => {
    const handleEscape = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <>
      <div
        className={ModalCss.Modal__backdrop}
        onClick={handleBackdropClick}
      ></div>
      <div className={ModalCss.Modal__content}>{children}</div>
    </>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};
