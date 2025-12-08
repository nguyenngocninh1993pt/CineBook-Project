import React, { useState } from 'react';
import './alert-dialog.css';

export const AlertDialog = ({ triggerText, title, description, onConfirm, onCancel }) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    setOpen(false);
    onConfirm && onConfirm();
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel && onCancel();
  };

  return (
    <>
      <button className="alert-dialog-trigger" onClick={() => setOpen(true)}>
        {triggerText}
      </button>

      {open && (
        <div className="alert-dialog-overlay" onClick={handleCancel}>
          <div className="alert-dialog-content" onClick={e => e.stopPropagation()}>
            <div className="alert-dialog-header">
              <h2 className="alert-dialog-title">{title}</h2>
            </div>
            <div className="alert-dialog-description">{description}</div>
            <div className="alert-dialog-footer">
              <button className="alert-dialog-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="alert-dialog-action" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
