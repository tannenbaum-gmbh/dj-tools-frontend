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
  const { addAlert } = useAlert();
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dj-tools-wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse wishlist', e);
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
        const drop = item.savedPrice - product.currentPrice;
        const percent = Math.round((drop / item.savedPrice) * 100);
        addAlert(`Price drop! ${product.name} is now $${product.currentPrice} (-${percent}%)`, 'success');
      }
    });
  }, [wishlist, addAlert]);

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
