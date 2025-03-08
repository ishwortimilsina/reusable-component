import { FC, ReactNode, useEffect } from "react";
import classes from './Modal.module.css';

interface ModalProps {
  open: boolean;
  children: ReactNode;
  closeModal: () => void;
}

export const Modal: FC<ModalProps> = ({ open, children, closeModal }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeModal]);

  if (!open) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={classes.modalContainer} onClick={handleBackdropClick}>
      <div className={classes.modalDialog}>
        <div className={classes.modalHeader}>
          <button className="closeButton" onClick={closeModal}>XX</button>
        </div>
        {children}
      </div>
    </div>
  );
};
