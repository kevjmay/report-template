import React from 'react';
import ReactDOM from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg p-6 shadow-lg w-11/12 md:w-3/4 lg:w-3/4 overflow-y-auto max-h-screen relative"
        style={{ maxHeight: '90vh' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Modal;
