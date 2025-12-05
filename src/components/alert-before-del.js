// ...existing code...
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
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="alt-title">
      <div style={boxStyle}>
        <div style={headerStyle}>
          <strong id="alt-title">{title}</strong>
        </div>
        <div style={bodyStyle}>
          <p style={{ margin: 0 }}>{message}</p>
        </div>
        <div style={footerStyle}>
          <button style={cancelBtn} onClick={onCancel}>{cancelText}</button>
          <button style={confirmBtn} onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}

/* Styles */
const overlayStyle = {
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: 20,
};

const boxStyle = {
  width: '100%',
  maxWidth: 420,
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
  overflow: 'hidden',
};

const headerStyle = {
  padding: '16px 20px',
  borderBottom: '1px solid #eee',
  background: '#fafafa',
};

const bodyStyle = {
  padding: '20px',
  color: '#333',
};

const footerStyle = {
  padding: '12px 16px',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
  borderTop: '1px solid #eee',
  background: '#fff',
};

const baseBtn = {
  padding: '8px 12px',
  borderRadius: 6,
  border: 'none',
  cursor: 'pointer',
  fontWeight: 600,
};

const cancelBtn = {
  ...baseBtn,
  background: '#f0f0f0',
  color: '#333',
};

const confirmBtn = {
  ...baseBtn,
  background: '#d9534f',
  color: '#fff',
};
// ...existing code...