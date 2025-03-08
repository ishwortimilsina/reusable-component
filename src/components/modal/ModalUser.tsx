import { useState } from 'react';
import classes from './Modal.module.css';
import { Modal } from './Modal';

export const ModalUser = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.modalUser}>
      <button
        className={classes.modalBaseButton}
        onClick={() => setOpen(true)}
      >Open Modal</button>
      <Modal
        open={open}
        closeModal={() => setOpen(false)}
      >
        <div>
          <h4>Text in a modal</h4>
          <p>
            Duis mollis, est non commodo luctus, nisi erat
            porttitor ligula.
          </p>
        </div>
      </Modal>
    </div>
  )
};
