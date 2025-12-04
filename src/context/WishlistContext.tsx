'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useAlert } from './AlertContext';
import { MOCK_PRODUCTS, Product } from '../lib/mockData';

export interface WishlistItem {
  productId: string;
  savedPrice: number;
  addedAt: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  checkPriceDrops: () => void;
  simulatePriceDrop: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [lastNotified, setLastNotified] = useState<Record<string, number>>({});
  const { addAlert } = useAlert();
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dj-tools-wishlist');
    const savedNotified = localStorage.getItem('dj-tools-last-notified');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
    if (savedNotified) {
      try {
        setLastNotified(JSON.parse(savedNotified));
      } catch (e) {
        console.error('Failed to parse lastNotified', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('dj-tools-wishlist', JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  // Save lastNotified to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('dj-tools-last-notified', JSON.stringify(lastNotified));
    }
  }, [lastNotified, isLoaded]);

  const addToWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item.productId === product.id)) return prev;
      return [
        ...prev,
        {
          productId: product.id,
          savedPrice: product.currentPrice,
          addedAt: new Date().toISOString(),
        },
      ];
    });
    addAlert(`Added ${product.name} to wishlist`, 'success');
  }, [addAlert]);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.productId !== productId));
    addAlert('Removed from wishlist', 'info');
  }, [addAlert]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  }, [wishlist]);

  const checkPriceDrops = useCallback(() => {
    // In a real app, this would fetch fresh data from an API
    wishlist.forEach((item) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      if (product && product.currentPrice < item.savedPrice) {
        // Check if we already notified for this price or lower
        const lastPrice = lastNotified[item.productId];
        if (lastPrice && lastPrice <= product.currentPrice) {
          return;
        }

        const drop = item.savedPrice - product.currentPrice;
        const percent = Math.round((drop / item.savedPrice) * 100);
        addAlert(`Price drop! ${product.name} is now $${product.currentPrice} (-${percent}%)`, 'success');

        setLastNotified((prev) => ({
          ...prev,
          [item.productId]: product.currentPrice,
        }));
      }
    });
  }, [wishlist, addAlert, lastNotified]);

  // Check for price drops periodically and on load
  useEffect(() => {
    if (isLoaded && wishlist.length > 0) {
      checkPriceDrops();

      const interval = setInterval(() => {
        checkPriceDrops();
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isLoaded, wishlist, checkPriceDrops]);

  const simulatePriceDrop = useCallback(() => {
    if (wishlist.length === 0) {
      addAlert('Add items to wishlist to simulate price drops', 'warning');
      return;
    }
    const randomItem = wishlist[Math.floor(Math.random() * wishlist.length)];
    const product = MOCK_PRODUCTS.find((p) => p.id === randomItem.productId);
    if (product) {
      // Simulate a 20% drop
      const newPrice = Number((product.currentPrice * 0.8).toFixed(2));
      addAlert(`(SIMULATION) Price drop! ${product.name} is down to $${newPrice}!`, 'success');
    }
  }, [wishlist, addAlert]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        checkPriceDrops,
        simulatePriceDrop,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
