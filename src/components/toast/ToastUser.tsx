import { useState } from "react";
import { Toast } from "./Toast";

export const ToastUser = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className="">
      <button onClick={() => setOpen(true)}>Click Me!</button>
      <Toast
        open={open}
        handleClose={handleClose}
        autoHideDuration={4000}
        message="Hola! Coma Estas!"
        type="warn"
      />
    </div>
  );
};
