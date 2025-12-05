import React, { useEffect } from 'react';

export default function AlertBeforeDel({
  open = false,
  title = 'Xác nhận',
  message = 'Bạn có chắc muốn xoá mục này?',
  confirmText = 'Xoá',
  cancelText = 'Hủy',
  onConfirm = () => {},
  onCancel = () => {},
}) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && open) onCancel();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="abd-overlay" role="dialog" aria-modal="true" aria-labelledby="alt-title">
      <div className="abd-box">
        <div className="abd-header">
          <strong id="alt-title">{title}</strong>
        </div>
        <div className="abd-body">
          <p style={{ margin: 0 }}>{message}</p>
        </div>
        <div className="abd-footer">
          <button className="abd-btn abd-cancel" onClick={onCancel}>{cancelText}</button>
          <button className="abd-btn abd-confirm" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
