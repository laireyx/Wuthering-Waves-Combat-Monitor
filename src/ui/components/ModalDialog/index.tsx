import { useCallback, useEffect, useRef } from 'react';

import { modalDialogStyle } from './index.css';

type ModalDialogProps = React.PropsWithChildren<{
  isOpened: boolean;
  onClose?: () => void;
}>;

export default function ModalDialog({
  isOpened,
  onClose,
  children,
}: ModalDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeOnBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        dialogRef.current?.close();
        onClose?.();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpened) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpened]);

  return (
    <dialog
      ref={dialogRef}
      className={modalDialogStyle}
      onClick={closeOnBackdrop}
    >
      {children}
    </dialog>
  );
}
