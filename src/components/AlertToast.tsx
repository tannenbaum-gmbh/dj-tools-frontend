'use client';

import React from 'react';
import { useAlert, Alert } from '../context/AlertContext';

const AlertItem = ({ alert, onDismiss }: { alert: Alert; onDismiss: (id: string) => void }) => {
  const bgColor =
    alert.type === 'success'
      ? 'bg-green-500'
      : alert.type === 'error'
      ? 'bg-red-500'
      : alert.type === 'warning'
      ? 'bg-yellow-500'
      : 'bg-blue-500';

  const textColor = alert.type === 'warning' ? 'text-gray-900' : 'text-white';

  return (
    <div
      role={alert.type === 'error' ? 'alert' : 'status'}
      className={`${bgColor} ${textColor} px-6 py-3 rounded shadow-lg mb-2 flex justify-between items-center min-w-[300px] transition-all duration-300`}
    >
      <span>{alert.message}</span>
      <button
        onClick={() => onDismiss(alert.id)}
        className={`ml-4 ${textColor} hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-current rounded`}
        aria-label="Close alert"
      >
        &times;
      </button>
    </div>
  );
};

export const AlertToast = () => {
  const { alerts, removeAlert } = useAlert();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} onDismiss={removeAlert} />
      ))}
    </div>
  );
};
