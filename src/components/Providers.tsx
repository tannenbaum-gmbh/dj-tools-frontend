'use client';

import React from 'react';
import { AlertProvider } from '../context/AlertContext';
import { WishlistProvider } from '../context/WishlistContext';
import { AlertToast } from './AlertToast';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertProvider>
      <WishlistProvider>
        {children}
        <AlertToast />
      </WishlistProvider>
    </AlertProvider>
  );
};
