// import React from 'react';
import style from '../styling/Modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={`${style.modalOverlay}`} onClick={onClose}>
      <div className={`${style.modalContent}`} onClick={(e) => e.stopPropagation()}>
        <button className={`${style.closeButton}`} onClick={onClose}>X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;