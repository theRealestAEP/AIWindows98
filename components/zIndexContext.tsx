'use client';
// contexts/zIndexContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ZIndexContextValue {
  bringToFront: () => number;
  resetZIndex: () => void;
}

const ZIndexContext = createContext<ZIndexContextValue | null>(null);

export const ZIndexProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [highestZIndex, setHighestZIndex] = useState(0);

  const bringToFront = (): number => {
    setHighestZIndex(z => z + 1);
    return highestZIndex + 1;
  };

  const resetZIndex = (): void => {
    setHighestZIndex(0);
  };

  return (
    <ZIndexContext.Provider value={{ bringToFront, resetZIndex }}>
      {children}
    </ZIndexContext.Provider>
  );
};

export const useZIndex = (): ZIndexContextValue => {
  const context = useContext(ZIndexContext);
//   console.log(context)
  if (!context) {
    throw new Error('useZIndex must be used within a ZIndexProvider');
  }
  return context;
};