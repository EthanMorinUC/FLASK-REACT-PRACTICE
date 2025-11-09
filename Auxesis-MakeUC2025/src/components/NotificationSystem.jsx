import React, { useState, useEffect } from 'react';

const NOTIFICATION_DURATION = 3000; // 3 seconds

export default function NotificationSystem({ message, type = 'success', onClose }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, 300);
    }, NOTIFICATION_DURATION);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const bgColor = {
    success: 'bg-gradient-to-r from-green-600 to-emerald-600',
    error: 'bg-gradient-to-r from-red-600 to-rose-600',
    info: 'bg-gradient-to-r from-blue-600 to-indigo-600',
  }[type];

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 
        transform transition-all duration-300 ease-out
        ${isLeaving ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
      `}
    >
      <div className={`
        ${bgColor}
        text-white px-6 py-3 rounded-xl shadow-2xl
        border border-white/20 backdrop-blur-sm
        flex items-center gap-3
      `}>
        <span className="text-xl">
          {type === 'success' && '🎮'}
          {type === 'error' && '💔'}
          {type === 'info' && '💡'}
        </span>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}