import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import classes from './Toast.module.css';

interface ToastProps {
  open: boolean;
  handleClose: () => void;
  message: string;
  autoHideDuration: number; // ms
  type?: "success" | "error" | "warn" | "info";
}

export const Toast = ({ message, handleClose, open, autoHideDuration, type }: ToastProps) => {
  const [show, setShow] = useState(open);

  const getToastStyle = () => {
    switch (type) {
      case "success": return { backgroundColor: "green" };
      case "error": return { backgroundColor: "red" };
      case "info": return { backgroundColor: "blue" };
      case "warn": return { backgroundColor: "#ff8800" };
      default: return { backgroundColor: "black" };
    }
  };

  useEffect(() => {
    if (open) {
      setShow(true);

      if (autoHideDuration) {
        setTimeout(() => {
          setShow(false);
          handleClose();
        }, autoHideDuration);
      }
    }
  }, [open, autoHideDuration]);

  return show ? createPortal(
    <div className={classes.toast} style={getToastStyle()}>
      {message}
    </div>,
    document.body
  ) : null;
};
