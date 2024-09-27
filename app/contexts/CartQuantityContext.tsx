'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface QuantityContextType {
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuantityContext = createContext<QuantityContextType | undefined>(undefined);

export const QuantityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [itemCount, setItemCount] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  return (
    <QuantityContext.Provider value={{ itemCount, setItemCount, isAnimating, setIsAnimating }}>
      {children}
    </QuantityContext.Provider>
  );
};

export const useQuantity = () => {
  const context = useContext(QuantityContext);
  if (context === undefined) {
    throw new Error('useQuantity must be used within a QuantityProvider');
  }
  return context;
};